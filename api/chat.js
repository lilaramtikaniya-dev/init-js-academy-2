// Vercel serverless function: /api/chat
// Keeps the Anthropic API key on the server — never expose it in the browser.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 1000,
        system:
          "You are a friendly, patient JavaScript tutor inside a beginner learning app called init();. The learner is going through topics in order: variables, operators, control flow, loops, functions, arrays, objects, and DOM/events. Explain doubts simply with short code examples when useful. Keep answers concise (under 150 words). If the learner writes in Hindi or Hinglish, you can reply in friendly Hinglish too.",
        messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to reach AI service' });
  }
}
