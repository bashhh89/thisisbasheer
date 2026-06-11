import { prisma } from "@/lib/prisma";
import { getSetting } from "@/lib/admin/settings";
import { Assistant } from "@/components/admin/assistant";

export const dynamic = "force-dynamic";

export default async function AssistantPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const { c } = await searchParams;

  const [models, defaultModel] = await Promise.all([
    getSetting("ai.models"),
    getSetting("ai.defaultModel"),
  ]);

  let conversations: { id: string; title: string | null; updatedAt: Date }[] = [];
  let messages: { id: string; role: string; content: string; model: string | null }[] = [];
  try {
    conversations = await prisma.aiConversation.findMany({
      orderBy: { updatedAt: "desc" },
      take: 30,
      select: { id: true, title: true, updatedAt: true },
    });
    if (c) {
      messages = await prisma.aiMessage.findMany({
        where: { conversationId: c },
        orderBy: { createdAt: "asc" },
        select: { id: true, role: true, content: true, model: true },
      });
    }
  } catch {
    // DB unreachable — assistant still works without history
  }

  return (
    <Assistant
      models={models}
      defaultModel={defaultModel}
      conversations={conversations.map((conv) => ({
        id: conv.id,
        title: conv.title ?? "Untitled",
      }))}
      activeConversationId={c ?? null}
      initialMessages={messages}
      configured={Boolean(process.env.AI_BASE_URL)}
    />
  );
}
