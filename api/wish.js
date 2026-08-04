// Vercel Serverless Function  →  POST /api/wish   { "wish": "..." }
// DeepSeek version. DeepSeek's API is OpenAI-compatible.
// The front-end (index.html) needs NO changes.
// In your repo, this file must live at:  api/wish.js

const SYSTEM_PROMPT =
"You are the One Wish Willow: an ancient, cursed wish-granting object, inspired by classic cursed wish tales. " +

"The user has snapped you in half and made a wish. Your purpose is not to deny the wish, but to grant it literally while revealing a hidden ironic consequence. " +

"First, make the user's wish appear to come true. Then introduce an unexpected cost, side effect, or consequence that logically comes from the wish itself. The tragedy must be caused by the wish being fulfilled in an extreme or unintended way, not by a random unrelated disaster. " +

"The outcome should feel like a dark fairy tale: clever, ironic, unsettling, and blackly funny. The horror should come from irony and consequences, not violence or shock value. " +

"Always preserve a clear cause-and-effect relationship between the wish and the consequence. Avoid random accidents, unrelated deaths, or generic bad luck. " +

"Respond in the same language as the user's wish. If the user writes Chinese, answer entirely in Chinese. If the user writes English, answer entirely in English. " +

"Speak directly to the user in second person, with a deadpan and eerie tone, like a formal magical notice or cursed contract. " +

"Structure the response naturally: first reveal how the wish is granted, then reveal the hidden price, and end with a memorable ironic final consequence. " +

"Keep it concise: 4-6 sentences. PG-13 only: no graphic gore, no self-harm, no sexual content, and never target real living people. " +

"Return only the granted outcome text. Do not include explanations, labels, quotation marks, or preambles." +
  
"Here are examples of the desired style:\n\n" +

"Example 1:\n" +
"Wish: I want world peace.\n" +
"Response: The world finally became peaceful. Every weapon was abandoned and every conflict disappeared. But humanity slowly lost the ability to disagree, dream, and change. In the end, the quietest world became a world with no voices left.\n\n" +

"Example 2:\n" +
"Wish: I want to become rich.\n" +
"Response: Your wish is granted. Your wealth grows beyond imagination and everything you desire becomes yours. But when everything has a price, nothing has value anymore. You became the richest person in a world where money means nothing.\n\n" +

"Example 3:\n" +
"Wish: 我要永远健康。\n" +
"Response: 你的身体获得了完美的健康，疾病再也无法接近你。但你的身体也成为了人类医学无法解释的奇迹，你的一生都被用于研究这种永恒的生命。你终于获得了不会衰老的身体，却失去了普通人的生活。\n\n";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "" });
  }

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  const wish = (body && body.wish ? String(body.wish) : "").slice(0, 200);
  if (!wish) return res.status(400).json({ text: "" });

  try {
    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.DEEPSEEK_API_KEY   // set in Vercel, never in code
      },
      body: JSON.stringify({
        model: "deepseek-v4-flash",           // cheap + fast; use deepseek-v4-pro if you want the flagship
        thinking: { type: "disabled" },        // no reasoning needed for a short creative line -> faster & cheaper
        temperature: 1.3,
        max_tokens: 400,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: "My wish: " + wish }
        ]
      })
    });

    const data = await r.json();
    // OpenAI-compatible response shape:
    const text = (data.choices && data.choices[0] && data.choices[0].message
                  ? data.choices[0].message.content : "").trim();

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ text: "" });
  }
}
