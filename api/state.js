const { kv } = require('@vercel/kv');

const STATE_KEY = 'mostrador_state';

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await kv.get(STATE_KEY);
    res.status(200).json({ ok: true, data: data || null });
    return;
  }

  if (req.method === 'POST') {
    const { password, payload } = req.body || {};
    if (!process.env.EDIT_PASSWORD || password !== process.env.EDIT_PASSWORD) {
      res.status(401).json({ ok: false, error: 'Clave incorrecta.' });
      return;
    }
    if (!payload || !payload.state) {
      res.status(400).json({ ok: false, error: 'Datos inválidos.' });
      return;
    }
    await kv.set(STATE_KEY, payload);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ ok: false, error: 'Método no permitido.' });
};
