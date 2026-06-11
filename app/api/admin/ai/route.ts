import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/admin/auth";
import { streamChat, type ChatMessage } from "@/lib/admin/ai";
import { getSetting } from "@/lib/admin/settings";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

const BodySchema = z.object({
  conversationId: z.string().nullable(),
  model: z.string().min(1).max(120),
  message: z.string().min(1).max(16000),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = BodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  const { conversationId, model, message } = parsed.data;

  // Load or create the conversation
  const conversation = conversationId
    ? await prisma.aiConversation.findUnique({
        where: { id: conversationId },
        include: { messages: { orderBy: { createdAt: "asc" }, take: 40 } },
      })
    : await prisma.aiConversation
        .create({
          data: { title: message.slice(0, 80) },
        })
        .then((c) => ({ ...c, messages: [] as { role: string; content: string }[] }));

  if (!conversation) {
    return NextResponse.json({ error: "Conversation not found" }, { status: 404 });
  }

  await prisma.aiMessage.create({
    data: { conversationId: conversation.id, role: "user", content: message },
  });

  const systemPrompt = await getSetting("ai.systemPrompt");
  const history: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...conversation.messages.map((m) => ({
      role: m.role as ChatMessage["role"],
      content: m.content,
    })),
    { role: "user", content: message },
  ];

  let upstream: ReadableStream<Uint8Array>;
  try {
    upstream = await streamChat(model, history, request.signal);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "AI provider error";
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  // Tee the stream: send to client, accumulate for persistence
  const decoder = new TextDecoder();
  let full = "";
  const persisting = upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        full += decoder.decode(chunk, { stream: true });
        controller.enqueue(chunk);
      },
      async flush() {
        if (full.trim()) {
          await prisma.aiMessage
            .create({
              data: {
                conversationId: conversation.id,
                role: "assistant",
                content: full,
                model,
              },
            })
            .catch(() => {});
          await prisma.aiConversation
            .update({
              where: { id: conversation.id },
              data: { updatedAt: new Date() },
            })
            .catch(() => {});
        }
      },
    })
  );

  return new Response(persisting, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Conversation-Id": conversation.id,
      "Cache-Control": "no-store",
    },
  });
}
