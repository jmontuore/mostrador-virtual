module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Método no permitido.' });
    return;
  }
  const { password } = req.body || {};
  const ok = !!process.env.EDIT_PASSWORD && password === process.env.EDIT_PASSWORD;
  res.status(ok ? 200 : 401).json({ ok });
};
