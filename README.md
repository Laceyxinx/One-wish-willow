# One Wish Willow

> Your wish will come true. The outcome may not be what you meant.

One Wish Willow is an unofficial, fan-made AI wish experience inspired by the mysterious prop in Curry Barker’s horror film *Obsession*.

In the film, Bear breaks a One Wish Willow and wishes for Nikki to love him more than anyone. The wish comes true—but Nikki’s love becomes an uncontrollable obsession, setting off a chain of tragedy. This project brings that unsettling premise into an interactive website: make a wish, break the willow, and discover how getting exactly what you asked for can still go terribly wrong.

[Live demo](https://one-wish-willow-lyart.vercel.app/) · [PRD](./docs/PRD.md) · [Case study](./docs/PRODUCT_CASE_STUDY.md) · [Roadmap](./docs/ROADMAP.md)

## Product concept

The product was created in response to the attention surrounding *Obsession* and its standout prop, the One Wish Willow. Rather than merely reproducing the prop visually, the website lets film audiences participate in its defining rule:

> The willow grants the wish. It does not guarantee that the result will be desirable.

The AI therefore does not reject, misunderstand, or simply sabotage a wish. It fulfills the stated desire, then reveals the consequence hidden inside the wording, scale, or method of fulfillment.

## Experience flow

1. Open the One Wish Willow box.
2. Enter the one wish you most want granted.
3. Hold the willow until it breaks.
4. Wait while the willow interprets the wish.
5. Receive a fulfilled outcome with an unforeseen cost.

The interaction mirrors the film’s tension: desire comes first, commitment becomes irreversible, and the true meaning of the wish is understood only after it has been granted.

## Product highlights

- **Film-inspired participation:** converts audience interest in a recognizable story prop into a playable digital experience.
- **Consequence-driven AI:** grants the wish literally while deriving the twist from the user’s own wording or assumptions.
- **DeepSeek generation:** uses `deepseek-v4-flash` behind a serverless API route.
- **Ritualized interaction:** unboxing, wishing, long-press breaking, waiting, and revealing create a complete dramatic arc.
- **Multilingual output:** responds in the language of the wish, including Chinese-first handling for primarily Chinese mixed-language input.
- **Reliable reveal:** curated fallback outcomes preserve the ending when the model service fails.
- **Accessible controls:** supports touch, pointer, and keyboard input, reduced-motion preferences, responsive layouts, and optional sound.
- **Regional deployment:** `main` runs on Vercel for global access; the `腾讯云` branch supports mainland China users.
- **Protected credentials:** the model API key remains in server-side environment variables.

## How the AI interprets a wish

The generation policy follows four steps:

1. Identify the exact outcome the user requested.
2. Grant that outcome rather than refusing it.
3. Find an overlooked assumption, missing boundary, or extreme interpretation.
4. Reveal a direct consequence that makes the user realize: “That is technically what I asked for.”

The twist should be relevant and understandable—not a random disaster. For example, Bear’s wish succeeds because Nikki does love him beyond everyone else; the horror comes from what “beyond everyone else” means when taken to its extreme.

## Architecture

```text
Interactive single-page experience
              |
              v
        POST /api/wish
              |
              v
     Serverless AI request
              |
              v
Wish granted + unforeseen consequence
              |
              +-- API failure -> curated fallback ending
```

## Deployment

| Audience | Branch | Platform | Role |
|---|---|---|---|
| Global | `main` | Vercel | Primary production experience and serverless API |
| Mainland China | `腾讯云` | Tencent Cloud | Region-specific deployment for domestic access |

## Validation metrics

As of the supplied usage snapshot, the MVP has generated **326 API requests and processed 262,855 tokens**. These are model-usage figures rather than unique-user or conversion metrics.

An early playtest exposed a prompt-quality problem: some outcomes felt unrelated to the One Wish Willow rule, causing testers to stop after one attempt. The prompt was revised to enforce literal fulfillment, causal consequences, language matching, and tighter examples. More accurate outcomes were followed by visibly faster API-request growth, although a precise uplift cannot be calculated without dated pre/post data.

The next validation metrics are:

- Start-to-result completion rate
- Wish submission and willow-break completion rates
- AI success rate and fallback activation rate
- p50/p95 time to reveal
- Language-match and wish-relevance scores
- Replay/share intent
- Availability and latency by deployment region

## Disclaimer

This is an unofficial fan-made project created for educational and portfolio purposes. It is not affiliated with, endorsed by, or sponsored by the filmmakers, rights holders, distributors, or official One Wish Willow merchandise. *Obsession*, its characters, and related marks belong to their respective owners.
