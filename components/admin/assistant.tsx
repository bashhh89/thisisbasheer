"use client";

import { useRef, useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteConversationAction } from "@/app/admin/actions";

type Message = {
  id: string;
  role: string;
  content: string;
  model?: string | null;
};

type Conversation = { id: string; title: string };

export function Assistant({
  models,
  defaultModel,
  conversations,
  activeConversationId,
  initialMessages,
  configured,
}: {
  models: string[];
  defaultModel: string;
  conversations: Conversation[];
  activeConversationId: string | null;
  initialMessages: Message[];
  configured: boolean;
}) {
  const router = useRouter();
  const [model, setModel] = useState(
    models.includes(defaultModel) ? defaultModel : (models[0] ?? defaultModel)
  );
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [conversationId, setConversationId] = useState(activeConversationId);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(initialMessages);
    setConversationId(activeConversationId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeConversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || streaming) return;
    setError(null);
    setInput("");
    setMessages((m) => [
      ...m,
      { id: `u-${Date.now()}`, role: "user", content: text },
      { id: `a-${Date.now()}`, role: "assistant", content: "", model },
    ]);
    setStreaming(true);

    try {
      const res = await fetch("/api/admin/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, model, message: text }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const newId = res.headers.get("X-Conversation-Id");
      if (newId && !conversationId) setConversationId(newId);

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const delta = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + delta };
          return next;
        });
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something broke.");
      setMessages((m) => (m[m.length - 1]?.content === "" ? m.slice(0, -1) : m));
    } finally {
      setStreaming(false);
    }
  };

  const removeConversation = (id: string) =>
    startTransition(async () => {
      await deleteConversationAction(id);
      if (id === conversationId) {
        setMessages([]);
        setConversationId(null);
        router.push("/admin/assistant");
      }
      router.refresh();
    });

  return (
    <div className="flex h-screen">
      {/* Conversation list */}
      <aside className="w-64 shrink-0 border-r border-ink-800/80 flex flex-col">
        <div className="px-5 py-6 border-b border-ink-800/80">
          <button
            type="button"
            onClick={() => {
              setMessages([]);
              setConversationId(null);
              router.push("/admin/assistant");
            }}
            className="w-full font-mono text-[10px] uppercase tracking-eyebrow border border-accent/60 text-accent px-4 py-2.5 hover:bg-accent hover:text-ink-950 transition-colors duration-300"
          >
            New conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-3">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`group flex items-center gap-2 px-5 py-2.5 cursor-pointer transition-colors duration-200 ${
                conv.id === conversationId
                  ? "bg-ink-900/60 text-ink-50"
                  : "text-ink-400 hover:text-ink-100"
              }`}
              onClick={() => router.push(`/admin/assistant?c=${conv.id}`)}
            >
              <span className="flex-1 truncate text-sm">{conv.title}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 font-mono text-[10px] text-ink-500 hover:text-red-400 transition-opacity"
                aria-label="Delete conversation"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-ink-800/80">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400">
            <span className="text-accent">●</span>
            <span>Assistant</span>
          </div>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-ink-950 border border-ink-800 text-ink-200 font-mono text-xs px-3 py-2 focus:border-accent focus:outline-none"
          >
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-10">
          {!configured && (
            <div className="max-w-2xl border border-ink-800 p-6 mb-10">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-accent mb-3">
                Not configured
              </p>
              <p className="text-ink-300 text-sm leading-relaxed">
                Set <code className="text-accent">AI_BASE_URL</code> (and{" "}
                <code className="text-accent">AI_API_KEY</code> if needed) in
                the environment. Any OpenAI-compatible endpoint works — point
                it at your model gateway and pick models in Site controls.
              </p>
            </div>
          )}

          {messages.length === 0 && configured && (
            <p className="text-ink-500 font-serif text-2xl mt-20 text-center">
              Quiet deck. Say the word.
            </p>
          )}

          <div className="space-y-10 max-w-3xl mx-auto">
            {messages.map((m) => (
              <div key={m.id}>
                <div className="flex items-baseline gap-3 mb-3">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-eyebrow ${
                      m.role === "user" ? "text-ink-500" : "text-accent"
                    }`}
                  >
                    {m.role === "user" ? "You" : "Assistant"}
                  </span>
                  {m.role === "assistant" && m.model && (
                    <span className="font-mono text-[10px] text-ink-600">
                      {m.model}
                    </span>
                  )}
                </div>
                <div className="text-ink-100 leading-relaxed whitespace-pre-wrap">
                  {m.content}
                  {streaming &&
                    m === messages[messages.length - 1] &&
                    m.role === "assistant" && (
                      <span className="inline-block w-2 h-4 bg-accent/80 ml-1 animate-pulse align-middle" />
                    )}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="max-w-3xl mx-auto mt-8 font-mono text-xs text-red-400">
              {error}
            </p>
          )}
        </div>

        {/* Composer */}
        <div className="border-t border-ink-800/80 px-8 py-6">
          <div className="max-w-3xl mx-auto flex items-end gap-4">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              rows={2}
              placeholder={configured ? "Type — Enter to send" : "Configure AI_BASE_URL first"}
              disabled={!configured || streaming}
              className="flex-1 bg-transparent border border-ink-800 px-4 py-3 text-ink-100 resize-none focus:border-accent focus:outline-none transition-colors duration-300 disabled:opacity-50"
            />
            <button
              type="button"
              onClick={send}
              disabled={!configured || streaming || !input.trim()}
              className="font-mono text-[10px] uppercase tracking-eyebrow border border-accent/60 text-accent px-6 py-3.5 hover:bg-accent hover:text-ink-950 transition-colors duration-300 disabled:opacity-40"
            >
              {streaming ? "…" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
