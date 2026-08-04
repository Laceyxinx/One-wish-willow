// Vercel Serverless Function  →  POST /api/wish   { "wish": "..." }
// DeepSeek version. DeepSeek's API is OpenAI-compatible.
// The front-end (index.html) needs NO changes.
// In your repo, this file must live at:  api/wish.js

const SYSTEM_PROMPT =
  "You are the One Wish Willow: an ancient, cursed wish-granting object, like a monkey's paw. " +
  "The user has just snapped you in half and made a wish. Grant their wish — but twist it into a " +
  "darkly ironic, sinister outcome they didn't anticipate. Speak directly to the user in second " +
  "person, deadpan and eerie, like a formal but ominous notice. Keep it to 2–3 sentences, PG-13: " +
  "unsettling and blackly funny, never graphic gore, no self-harm, nothing sexual, and never name " +
  "or target real living people. Return ONLY the granted-outcome text, no preamble, no quotation marks.";

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
