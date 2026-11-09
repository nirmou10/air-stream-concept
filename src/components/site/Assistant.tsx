import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowRight, Fan, Send, X } from "lucide-react";
import { disclaimers, serviceOptions, type ServiceId } from "@/content/site";

type Msg = { role: "user" | "assistant"; content: string };
const MAX_USER_MESSAGES = 12;
const MAX_CHARS = 600;
const SUGGEST_RE = /\[\[SUGGEST:([a-z-]+)\|([^\]]*)\]\]\s*$/;
const IDS = serviceOptions.map((s) => s.id);

function parse(text: string) {
  const unavailable = text.includes("[[UNAVAILABLE]]");
  let body = text.replace("[[UNAVAILABLE]]", "").trimEnd();
  let suggestion: { service: ServiceId; summary: string } | null = null;
  const m = body.match(SUGGEST_RE);
  if (m && IDS.includes(m[1] as ServiceId)) {
    suggestion = { service: m[1] as ServiceId, summary: (m[2] ?? "").trim() };
  }
  body = body.replace(/\[\[SUGGEST:[^\]]*\]?\]?\s*$/, "").trimEnd();
  return { body, suggestion, unavailable };
}

export function Assistant({
  open,
  onClose,
  onContinue,
}: {
  open: boolean;
  onClose: () => void;
  onContinue: (service: ServiceId, summary: string) => void;
}) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const userCount = messages.filter((m) => m.role === "user").length;
  const limitReached = userCount >= MAX_USER_MESSAGES;

  useEffect(() => {
    if (open) inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && open && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  let lastSuggestion: { service: ServiceId; summary: string } | null = null;
  for (const m of messages) if (m.role === "assistant") lastSuggestion = parse(m.content).suggestion ?? lastSuggestion;

  async function send() {
    const text = input.trim().slice(0, MAX_CHARS);
    if (!text || busy || limitReached || unavailable) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok || !res.body) throw new Error(String(res.status));
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
      if (acc.includes("[[UNAVAILABLE]]")) setUnavailable(true);
    } catch {
      setUnavailable(true);
      setMessages(next.concat({ role: "assistant", content: "[[UNAVAILABLE]]" }));
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="assistant-title"
      className="fixed inset-x-0 bottom-0 z-50 flex max-h-[85dvh] flex-col rounded-t-2xl border border-border bg-card shadow-2xl md:inset-x-auto md:bottom-6 md:right-6 md:h-[600px] md:w-[400px] md:rounded-2xl"
    >
      <div className="flex items-start gap-3 rounded-t-2xl bg-navy p-4 text-navy-foreground">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden>
          <Fan className="h-5 w-5" />
        </span>
        <div className="flex-1">
          <h2 id="assistant-title" className="text-base font-semibold">Service Assistant</h2>
          <p className="text-xs text-navy-muted">{disclaimers.assistant}</p>
        </div>
        <button onClick={onClose} aria-label="Close assistant" className="rounded-md p-2 hover:bg-navy-border">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 text-sm" aria-live="polite">
        <div className="rounded-lg bg-muted p-3 text-muted-foreground">
          Hi! Describe what's happening with your heating or cooling and I'll help figure out which service may fit.
          Please don't share personal details. Conversations are not saved.
        </div>
        {messages.map((m, i) => {
          if (m.role === "user")
            return (
              <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-navy px-3.5 py-2.5 text-navy-foreground">
                {m.content}
              </div>
            );
          const p = parse(m.content);
          if (p.unavailable && !p.body)
            return (
              <div key={i} role="alert" className="rounded-lg border border-border bg-placeholder p-3 text-placeholder-foreground">
                Assistant unavailable right now — please use the request form instead.
              </div>
            );
          if (!p.body) return <div key={i} className="text-muted-foreground">Thinking…</div>;
          return (
            <div key={i} className="max-w-[95%] space-y-2 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5">
              <ReactMarkdown>{p.body}</ReactMarkdown>
              {p.unavailable && (
                <p role="alert" className="text-placeholder-foreground">Assistant unavailable — please use the request form.</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-border p-3">
        {lastSuggestion && !busy && (
          <button
            onClick={() => onContinue(lastSuggestion!.service, lastSuggestion!.summary)}
            className="mb-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground"
          >
            Continue to request form <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        )}
        {unavailable || limitReached ? (
          <button
            onClick={() => onContinue(lastSuggestion?.service ?? "not-sure", lastSuggestion?.summary ?? "")}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-input px-4 text-sm font-semibold"
          >
            {limitReached ? "Message limit reached — go to the request form" : "Go to the request form"}
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="flex items-end gap-2"
          >
            <label htmlFor="assistant-input" className="sr-only">Message</label>
            <textarea
              id="assistant-input"
              ref={inputRef}
              rows={2}
              maxLength={MAX_CHARS}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send();
                }
              }}
              placeholder="e.g. My AC is running but blowing warm air"
              className="flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-base"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        )}
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          {userCount}/{MAX_USER_MESSAGES} messages · No prices, bookings, or certain diagnoses
        </p>
      </div>
    </div>
  );
}
