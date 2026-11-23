export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ erro: "Método não permitido. Use POST." });
  }
  const GROQ_KEY = process.env.GROQ_API_KEY || process.env.groq_api_key;
  if (!GROQ_KEY) return res.status(500).json({ erro: "A chave da Groq não está configurada nas variáveis de ambiente da Vercel." });
  const pergunta = typeof req.body?.pergunta === "string" ? req.body.pergunta.trim() : "";
  if (!pergunta) return res.status(400).json({ erro: "Escreva o que deseja gerar antes de chamar a IA." });
  if (pergunta.length > 12000) return res.status(413).json({ erro: "O pedido é muito longo. Reduza o texto e tente novamente." });
  try {
    const resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Authorization": `Bearer ${GROQ_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: "Você é a Mika IA, assistente de criação de roteiros originais para vídeos. Responda em português do Brasil, com texto claro, prático e adequado à plataforma solicitada. Não invente experiências pessoais do usuário; use apenas as informações fornecidas." },
          { role: "user", content: pergunta }
        ],
        temperature: 0.7,
        max_tokens: 1800
      })
    });
    const dados = await resposta.json().catch(() => ({}));
    if (!resposta.ok) {
      const mensagem = dados.error?.message || "A Groq recusou a solicitação.";
      return res.status(resposta.status === 429 ? 429 : 502).json({
        erro: resposta.status === 429 ? "Limite de uso da IA atingido. Aguarde um pouco e tente novamente." : "Falha na comunicação com a IA: " + mensagem
      });
    }
    const texto = dados.choices?.[0]?.message?.content?.trim();
    if (!texto) return res.status(502).json({ erro: "A IA respondeu, mas não enviou um roteiro. Tente novamente." });
    return res.status(200).json({ resposta: texto });
  } catch (erro) {
    console.error("Erro na API Mika IA:", erro);
    return res.status(500).json({ erro: "Não foi possível conectar à IA agora. Verifique a conexão e tente novamente." });
  }
}