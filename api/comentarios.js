export default async function handler(req, res) {
  // NOMES CORRETOS DA SUA VERCEL:
  const INSTA_TOKEN = process.env.chave_api_do_instagram;
  const YOUTUBE_KEY = process.env.youtube_api_key;
  if (!INSTA_TOKEN && !YOUTUBE_KEY) return res.status(500).json({ erro: 'Nenhuma chave configurada' });
  // Por enquanto retorna vazio até você conectar a conta oficial
  // Não expõe a chave nunca
  return res.status(200).json({ comentarios: [] });
}
