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
- All site copy and placeholder business data live in `src/content/site.ts`; components read from it so translations can be added later.
- The service request form is client-only (zod in the browser); it must never send or store data until a real business backend is approved.
- The AI assistant runs through the server route `src/routes/api/assistant.ts` (Lovable AI Gateway, no storage); any failure returns the `[[UNAVAILABLE]]` marker so the site keeps working without AI.
