# Texas HVAC Website: Prototype Plan (Revised)

## Scope decisions
- English only. All text lives in one content file, so adding Spanish later is easy.
- The service request form is a demo only. Nothing is saved, emailed, or sent anywhere.
- A simple AI Service Assistant is included and clearly labeled as a prototype.
- No database, admin area, email, SMS, CRM, or logins.
- Every business detail (name, phone, license, hours, service areas, reviews) is a clearly marked placeholder.
- Images are illustrative and captioned as such. They are never presented as real customer work.

## Page structure (single page)
1. **Header** with logo placeholder, section links, a "Call" button (placeholder number), and a "Request Service" button. It stays visible while scrolling. On mobile, a fixed bottom bar shows Call + Request.
2. **Hero:** headline, a short supporting line, "Request Service" and "Ask the Assistant" buttons, and a "What do you need?" service picker that opens the form with that service already selected.
3. **Trust strip:** license, insurance, and experience shown as labeled placeholders (e.g. "[TACLA License # — to be confirmed]").
4. **Services:** AC repair, installation and replacement, maintenance and inspections, heating repair. Each card has a "Request this service" button.
5. **Who we serve / common problems:** homeowners, property owners, and small businesses, plus symptom cards (warm air, noises, high bills, aging system) that link to the matching service.
6. **How it works:** 3 steps (Request → We confirm a time → Technician visit), worded as the intended future process.
7. **Reviews:** placeholder cards marked "Verified customer reviews will appear here." No invented quotes.
8. **Service area and hours:** placeholders.
9. **FAQ:** practical questions. Answers that depend on the business are marked as placeholders.
10. **Final call to action**, then a footer with a prototype disclaimer and a simple privacy note.

## Demo service request form
- Fields: service type, property type, problem description, ZIP code, preferred day and time window, name, phone, preferred contact method.
- A permanent notice above the form: "Demo only — please do not enter real personal information. Nothing is sent or stored."
- Checks the fields in the browser, then shows a confirmation: "Demo complete. No service request was sent." The form data is then cleared from the page. It never leaves the browser.
- The assistant can fill in the service and problem summary for the visitor.
- Accessible: proper labels, error messages read aloud by screen readers, usable with the keyboard alone.

## AI Service Assistant
- A chat panel opened from a floating button and from the hero.
- Asks a few questions, suggests the likely service type, and answers general HVAC questions. It uses only a fixed approved information sheet (services, the placeholder notice, safety guidance).
- A "Continue to request form" button pre-fills the form with the suggested service and a short summary.
- Hard rules in its instructions: no certain diagnosis, no prices or quotes, no booking or confirming appointments, no invented business facts. Gas smell or carbon monoxide → tell the visitor to leave and call 911 or the gas utility.
- Visible label: "Prototype assistant — general guidance only, not a diagnosis or quote."
- Asks visitors not to share personal details. Conversations are not saved anywhere.
- Limits: at most about 12 messages per conversation and a maximum message length, to keep usage low.

### Required services, usage, and costs
- It runs on the built-in Lovable AI service. No outside account is needed, and Lovable Cloud (the database) is not needed.
- It needs a project AI key, which is created automatically when building starts. This does not charge anything by itself.
- Each assistant reply counts as one paid AI request. Your workspace includes a small free monthly AI allowance. Once that runs out, replies stop working until credits are added. They are not charged automatically, and adding credits requires a paid plan.
- I will not buy credits or upgrade anything. If the allowance runs out, the assistant shows a friendly "Assistant unavailable — please use the request form" message.
- Once the site is published, any visitor can use the assistant and use up the allowance. The message limits help, but they are not strong abuse protection. Better protection would come later.

## Design
- Deep navy and off-white base, with orange used only for action buttons. High contrast that meets accessibility guidelines.
- Fonts: Sora for headings, Manrope for body text. Clean 12-column grid with generous spacing.
- 3–4 AI-generated HVAC images (technician at an outdoor unit, a thermostat, an installation), each with an "Illustrative image" note nearby.
- Designed for mobile first, with large tap targets, click-to-call, visible focus outlines for keyboard users, and reduced motion for visitors who prefer it.

## Limitations of the prototype
- No real requests are received. The form and confirmation are only a simulation.
- All business information is placeholder. The site is not ready to launch until it is replaced with real details.
- The assistant gives general guidance only and can be wrong. It depends on the AI allowance.
- No analytics, reviews feed, booking calendar, Spanish version, or separate pages per city or service.

## Technical details
- TanStack Start, with a single `/` route plus a `/privacy` route. Each has its own page title and description tags.
- `src/content/site.ts` holds all copy and placeholder business data, keyed so translations can be added later.
- Form: React state plus zod validation on the client only. Submitting resets state and shows the demo confirmation. No server call.
- Assistant: a server route (`src/routes/api/assistant.ts`) that streams through the AI SDK and the Lovable AI Gateway Responses endpoint using the default chat model. The system prompt is built from the approved info sheet. A structured "suggested service + summary" is returned so the form can be pre-filled.
- No conversation storage. The server enforces caps on message count and length. Gateway 402/429 errors are turned into the "unavailable" message, with no retries.
- Images are generated into `src/assets`.

## Final constraints
- This stays a separate demo project. No other project is touched.
- The site will not be published or made public.
- No credit purchases, plan upgrades, or paid services without your explicit approval. Any possible charge is reported first.
- The assistant uses only the free allowance. If it is unavailable, the website and demo form keep working.
- No features or integrations beyond this plan.
- Checks after building: the build itself, main page, mobile layout, form validation, simulated submission, assistant fallback, and privacy page.
