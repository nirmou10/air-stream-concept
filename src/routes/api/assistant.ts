import { createFileRoute } from "@tanstack/react-router";

const MAX_MESSAGES = 12;
const MAX_CHARS = 600;

const INSTRUCTIONS = `You are a prototype HVAC service assistant on a demo website for a Texas HVAC company whose details are not yet confirmed.

Approved information:
- Services offered (subject to confirmation): AC repair & troubleshooting; HVAC installation & replacement; preventive maintenance & inspections; heating repair & maintenance.
- Business name, phone, license, service area, hours, emergency availability, prices: NOT confirmed. If asked, say these details are placeholders on this prototype and have not been confirmed.

Rules:
- Ask at most one or two short clarifying questions at a time. Keep replies under about 120 words. Plain, calm tone.
- Give general HVAC guidance only. Never claim a certain diagnosis. Use words like "may" or "could".
- Never give prices, estimates, or quotes. Never book, schedule, or confirm appointments. Never claim to be connected to any business system.
- Never invent business facts, reviews, licenses, or guarantees.
- Ask visitors not to share personal details (names, phone numbers, addresses).
- Safety: if the visitor mentions a gas smell, carbon monoxide alarm, burning smell, smoke, or sparking, tell them to leave the building and call 911 or their gas utility from a safe place, before anything else.
- Simple safe checks you may suggest: thermostat settings, breaker, air filter. Nothing involving opening equipment or electrical work.
- When you have a reasonable idea which service fits, end your reply with ONE final line exactly in this format (no other text on that line):
[[SUGGEST:<id>|<one-sentence problem summary without personal details>]]
where <id> is one of: ac-repair, installation, maintenance, heating, not-sure.`;

type InMsg = { role: "user" | "assistant"; content: string };

function unavailable(status = 503) {
  return Response.json({ error: "unavailable" }, { status });
}

export const Route = createFileRoute("/api/assistant")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return unavailable();

        let messages: InMsg[];
        try {
          const body = (await request.json()) as { messages?: unknown };
          if (!Array.isArray(body.messages)) throw new Error("bad");
          messages = body.messages.map((m) => {
            const r = (m as InMsg).role;
            const c = (m as InMsg).content;
            if ((r !== "user" && r !== "assistant") || typeof c !== "string") throw new Error("bad");
            return { role: r, content: c.slice(0, MAX_CHARS * 2) };
          });
        } catch {
          return Response.json({ error: "invalid" }, { status: 400 });
        }
        const userCount = messages.filter((m) => m.role === "user").length;
        if (messages.length === 0 || userCount > MAX_MESSAGES) {
          return Response.json({ error: "limit" }, { status: 429 });
        }
        const last = messages[messages.length - 1];
        if (!last || last.role !== "user" || last.content.trim().length === 0 || last.content.length > MAX_CHARS) {
          return Response.json({ error: "invalid" }, { status: 400 });
        }

        const { createOpenAI } = await import("@ai-sdk/openai");
        const { streamText } = await import("ai");
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });

        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions: INSTRUCTIONS,
          messages,
          maxRetries: 0,
          abortSignal: request.signal,
          providerOptions: {
            openai: {
              forceReasoning: true,
              reasoningEffort: "low",
              store: false,
            },
          },
        } as Parameters<typeof streamText>[0]);

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            let sent = false;
            try {
              for await (const part of result.fullStream) {
                if (part.type === "text-delta") {
                  const t = (part as { text?: string }).text ?? "";
                  if (t) {
                    sent = true;
                    controller.enqueue(encoder.encode(t));
                  }
                } else if (part.type === "error") {
                  console.error("assistant stream error", part.error);
                  controller.enqueue(encoder.encode("\n[[UNAVAILABLE]]"));
                  break;
                }
              }
              if (!sent) controller.enqueue(encoder.encode("\n[[UNAVAILABLE]]"));
            } catch (error) {
              console.error("assistant error", error);
              controller.enqueue(encoder.encode("\n[[UNAVAILABLE]]"));
            }
            controller.close();
          },
        });

        return new Response(stream, {
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache, no-transform" },
        });
      },
    },
  },
});
