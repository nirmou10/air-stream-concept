<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

## Project rules

- All site copy and business data live in `src/content/site.ts`; components read from it so translations can be added later. Only company-published facts for Air-Stream Air Conditioning and Heating Co. Inc. may appear; the site is an unofficial concept redesign.
- The inquiry form is client-only (zod in the browser); it must never send or store data. It shows a "Demo only, no data is sent" badge.
- There is no AI assistant. Do not reintroduce `/api/assistant`, assistant UI, or AI SDK usage.
- Footer must keep the two disclaimer lines from `disclaimers` in `src/content/site.ts` verbatim.
