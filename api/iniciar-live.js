export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Só POST' });
  const { plataforma, titulo } = req.body;
  if (!titulo) return res.status(400).json({ erro: 'Falta título' });
  // Validação: só aceita instagram ou youtube
  if (!['instagram','youtube'].includes(plataforma)) return res.status(400).json({ erro: 'Plataforma inválida' });
  return res.status(200).json({ ok: true, mensagem: `Live ${titulo} pronta para ${plataforma}` });
}
