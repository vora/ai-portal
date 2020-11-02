module.exports = (app) => {
  app.get('/api/status', async (req, res) => {
    res.json({ ok: true });
  });
};
