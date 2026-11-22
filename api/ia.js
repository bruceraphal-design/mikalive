export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Só POST' });
  // NOME CORRETO DA SUA VERCEL:
  const GROQ_KEY = process.env.groq_api_key;
  if (!GROQ_KEY) return res.status(500).json({ erro: 'Groq não configurado na Vercel' });

  const { pergunta } = req.body;
  const resposta = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${GROQ_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama-3.3-70b-versatile', messages: [{ role: 'user', content: pergunta }] })
  });
  const dados = await resposta.json();
  return res.status(200).json({ resposta: dados.choices?.[0]?.message?.content || 'Sem resposta' });
}
