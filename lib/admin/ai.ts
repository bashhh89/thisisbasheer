/**
 * Provider-agnostic chat layer. Talks to any OpenAI-compatible
 * chat-completions endpoint (Ollama cloud/web, LiteLLM, vLLM, etc.).
 * Swapping providers or models is configuration, not code:
 *   AI_BASE_URL  — e.g. https://ollama.com/api  or  https://<host>/v1
 *   AI_API_KEY   — bearer token if the endpoint needs one
 * Model list and default live in SiteSetting (editable in the cockpit).
 */

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function baseUrl(): string {
  const url = process.env.AI_BASE_URL;
  if (!url) throw new Error("AI_BASE_URL is not configured");
  return url.replace(/\/+$/, "");
}

export async function streamChat(
  model: string,
  messages: ChatMessage[],
  signal?: AbortSignal
): Promise<ReadableStream<Uint8Array>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (process.env.AI_API_KEY) {
    headers.Authorization = `Bearer ${process.env.AI_API_KEY}`;
  }

  const res = await fetch(`${baseUrl()}/chat/completions`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, messages, stream: true }),
    signal,
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`AI provider error ${res.status}: ${detail.slice(0, 300)}`);
  }

  // Re-emit just the text deltas as plain text chunks.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  return res.body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const json = JSON.parse(payload);
            const delta: string | undefined =
              json.choices?.[0]?.delta?.content ?? json.message?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          } catch {
            // partial JSON — wait for more data
          }
        }
      },
    })
  );
}
