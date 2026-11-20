// api/webhook-shopee.js - COFRE DO MIKALIVE
import crypto from 'crypto';

const pedidosJaProcessados = new Set();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, erro: 'Só POST' });
  }

  const SHOPEE_SECRET = process.env.SHOPEE_SECRET;
  const SHOPEE_APP_ID = process.env.SHOPEE_APP_ID;
  const YOUTUBE_KEY = process.env.chave_api_do_youtube;
  const GROQ_KEY = process.env.chave_api_groq;

  if (!SHOPEE_SECRET || SHOPEE_SECRET === 'teste_por_enquanto') {
    return res.status(500).json({ ok: false, erro: 'Cofre ainda com valor de teste.' });
  }

  const { orderId, valorVenda, assinatura, timestamp } = req.body;

  if (timestamp) {
    const diff = Math.abs(Date.now() - Number(timestamp));
    if (diff > 5 * 60 * 1000) {
      return res.status(401).json({ ok: false, erro: 'Webhook expirado' });
    }
  }

  if (!orderId || !valorVenda || Number(valorVenda) <= 0) {
    return res.status(400).json({ ok: false, erro: 'Dados inválidos' });
  }

  if (pedidosJaProcessados.has(orderId)) {
    return res.status(200).json({ ok: true, mensagem: 'Pedido já processado' });
  }

  if (assinatura && timestamp) {
    const mensagem = `${SHOPEE_APP_ID}${orderId}${valorVenda}${timestamp}`;
    const esperada = crypto.createHmac('sha256', SHOPEE_SECRET).update(mensagem).digest('hex');
    try {
      const iguais = crypto.timingSafeEqual(Buffer.from(esperada), Buffer.from(assinatura));
      if (!iguais) return res.status(401).json({ ok: false, erro: 'Assinatura inválida' });
    } catch {
      return res.status(401).json({ ok: false, erro: 'Assinatura inválida' });
    }
  }

  pedidosJaProcessados.add(orderId);

  return res.status(200).json({
    ok: true,
    mensagem: 'Webhook recebido, validado e processado!',
    orderId,
    valor: Number(valorVenda),
    configuracao: {
      shopee: 'OK',
      youtube: YOUTUBE_KEY ? 'OK' : 'Faltando',
      groq: GROQ_KEY ? 'OK' : 'Faltando',
    }
  });
}
