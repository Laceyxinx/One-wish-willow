# One Wish Willow — Product Case Study

## Overview

One Wish Willow is an unofficial fan-made AI experience inspired by the wish-granting prop in the film *Obsession*. The project responds to the film’s popularity and audience fascination with the prop by turning its central narrative mechanism into something fans can personally experience: the wish comes true, but the result may not be the future they imagined.

## STAR

### Situation

Following the release and rapid rise of *Obsession*, the One Wish Willow became one of the film’s most discussed symbols. In the story, Bear wishes for Nikki to love him more than anyone. His words are fulfilled, but Nikki’s love becomes pathological and causes a series of tragedies. The prop captured a powerful audience question: **If you had one wish, could you phrase it safely enough to avoid the consequence?**

Existing audience participation largely stopped at watching, discussing, or collecting the prop. There was an opportunity to translate the film’s core tension into an interactive, personalized digital experience while the topic had cultural momentum.

### Task

I set out to build a lightweight but complete product that would:

- let film audiences experience the One Wish Willow premise themselves;
- preserve the story rule that the wish genuinely comes true;
- generate a consequence directly connected to the wish instead of random horror;
- create suspense and irreversibility around a single AI response;
- support Chinese and English audiences;
- remain demonstrable across global and mainland China hosting environments.

### Action

#### 1. Converted film attention into a clear product proposition

I defined the product around one promise: **“Your wish will be granted; the result may not be what you meant.”** This keeps the experience faithful to the film’s emotional logic and gives users an immediate reason to participate.

#### 2. Recreated the One Wish Willow ritual digitally

I structured the journey as open box → enter wish → hold to break → wait → reveal. The long-press action replaces a generic submit button with a moment of commitment. Progressive bending, cracking, audio, and release feedback make the decision feel irreversible.

#### 3. Productized the narrative rule as an AI policy

I integrated DeepSeek `deepseek-v4-flash` and designed the prompt behavior to first fulfill the wish literally, then expose an assumption or boundary the user ignored. The consequence must come from the wording or method of fulfillment. This distinguishes a meaningful One Wish Willow response from generic scary text.

#### 4. Used playtest feedback to iterate the prompt

The first production prompt was written primarily in English for the initial overseas deployment. Chinese playtesters encountered unnatural phrasing, overly long outcomes, incorrect language choices for mixed-language wishes, and consequences that were too dark for casual friend-to-friend prompts. Some tried the product once and did not continue. I treated this as a localization and product-quality issue rather than only a model issue: I added Chinese-specific rules for semantic language selection, an approximately 100-character limit, literal fulfillment before consequences, and lighter handling for casual entertainment scenarios. After output relevance improved, the rate of API-request growth visibly increased.

#### 5. Added multilingual and contextual behavior

The AI answers in the same language as the user and handles mainly Chinese mixed-language wishes as Chinese. The intended tone is concise, direct, understandable, unsettling, and sometimes darkly funny.

#### 6. Protected the reveal from technical failure

Model access is routed through a serverless endpoint so credentials are not exposed in the browser. Curated fallback endings ensure that once the willow is broken, the user always receives an outcome and the story never ends on a technical error.

#### 7. Planned regional delivery

The `main` branch is deployed through Vercel for global users, while the `腾讯云` branch provides a separate deployment path for mainland China. This treats accessibility as part of product delivery rather than an afterthought.

### Result

I delivered a publicly accessible MVP and completed a feedback-driven iteration loop from production behavior to prompt revision. As of the supplied usage snapshot, the product recorded **326 API requests and 262,855 processed tokens**. Following the prompt update, API requests were observed to grow faster as the generated outcomes became more accurate.

These figures measure model usage, not unique users, retention, or conversion. Because daily request data and pre/post time windows are not yet available, I do not claim a numerical growth rate. The next measurement step is to connect prompt-version dates with daily requests, unique sessions, completion, output ratings, and replay intent.

## Core product insight

The site should not punish every wish randomly. Its value comes from making the user recognize that the undesirable outcome was already latent in their request. Bear received the love he asked for; he simply failed to define the limits of that love. That moment of recognition is the product’s primary quality standard.

## Key decisions

| Decision | Product rationale | Trade-off |
|---|---|---|
| Build around a current film prop | Gives the interaction immediate cultural context | Requires clear unofficial/fan-made positioning |
| One wish per journey | Preserves scarcity and tension | Replay must not weaken the core fiction |
| Long-press to break | Creates commitment and physical metaphor | Requires accessibility and discoverability support |
| Literal fulfillment policy | Keeps outcomes faithful and logically satisfying | Requires systematic prompt evaluation |
| Curated fallbacks | Guarantees a complete reveal | Fallbacks are less personalized |
| Vercel + Tencent Cloud branches | Supports two access environments | Creates synchronization and drift risk |

## What I would validate next

1. Do film viewers immediately recognize and understand the One Wish Willow setup?
2. Do users perceive the result as “technically correct” rather than random?
3. Which wishes produce weak or repetitive outcomes?
4. Does the long-press interaction increase tension without causing abandonment?
5. Do users want to replay, compare results, or share a spoiler-safe result card?
6. Are latency and completion materially different between the two deployments?

## Portfolio summary

Identified a product opportunity from the popularity of *Obsession* and transformed its One Wish Willow prop into an interactive AI experience. Defined the film-faithful consequence logic, designed a ritualized five-stage journey, implemented multilingual generation and model-failure fallbacks, and delivered separate Vercel and Tencent Cloud deployment paths for global and mainland China access.
