# One Wish Willow Roadmap

This roadmap separates demonstrated functionality from future validation. Dates should be assigned only after capacity and priorities are confirmed.

## Now — Stabilize the MVP

- Add an above-the-fold introduction that explains the *Obsession* premise without spoiling more than necessary.
- Add a persistent “unofficial fan-made project” and rights-holder disclaimer.
- Review name, visual packaging, character references, and marketing copy for intellectual-property risk before wider promotion.
- Add explicit API timeout handling and structured error categories.
- Add server-side rate limiting and basic abuse protection.
- Remove any unnecessary direct browser-to-model fallback path.
- Publish privacy and fictional-entertainment notices.
- Create a fixed multilingual prompt evaluation set.
- Add smoke tests for open → wish → snap → result → reset.
- Verify that Vercel and Tencent Cloud branches share the same product behavior.

### Exit criteria

- Core journey works on current mobile and desktop browsers.
- No model credential can be obtained from browser source or network responses.
- A failed model request always produces a safe fallback result.
- Chinese and English evaluation sets meet an agreed language-match threshold.

## Next — Measure product quality

- Segment users by whether they have seen *Obsession* to measure how much prior film knowledge affects comprehension.
- Test whether the positioning “the wish comes true, but not as you intended” is understood before users begin.
- Instrument privacy-conscious stage completion events.
- Track model success rate, fallback rate, and p50/p95 latency.
- Run 5–8 moderated usability sessions focused on the long-press interaction.
- Score generated outcomes for relevance, surprise, clarity, and safety.
- Compare regional performance between Vercel and Tencent Cloud.

### Exit criteria

- A reliable funnel exists from first view to result reveal.
- Top abandonment point and top output-quality failure are identified.
- At least one iteration is backed by observed user behavior.

## Later — Improve retention and sharing

- Generate privacy-safe, clearly unofficial result cards with opt-in sharing.
- Add spoiler-safe sharing copy that invites friends to make their own wish.
- Add themed modes such as career, romance, friendship, and absurdist comedy.
- Add session-only history without requiring an account.
- Offer alternative intensity levels while preserving the core product voice.
- Create a lightweight feedback control for “clever / random / too dark.”

### Guardrails

- Never expose a user’s raw wish publicly by default.
- Do not add social features before moderation and reporting workflows exist.
- Keep replay mechanics from weakening the “one wish” concept.

## Future experiments

- Voice wish input and spatial audio reveal.
- Limited-time collaborative wish experiences.
- Model routing by language and regional latency.
- A/B test immediate versus suspenseful reveal timing.
- Prompt-version evaluation dashboard.
