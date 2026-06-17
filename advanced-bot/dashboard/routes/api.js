const router = require('express').Router();

const tiers = ['free', 'silver', 'gold'];

router.get('/settings', (req, res) => {
  res.json({
    prefix: '!',
    premiumTier: 'free',
    modules: { music: true, admin: true, tickets: true, premium: true },
  });
});

router.post('/settings', (req, res) => {
  const { prefix, premiumTier } = req.body;
  if (prefix && typeof prefix !== 'string') {
    return res.status(400).json({ error: 'prefix must be a string' });
  }

  if (premiumTier && !tiers.includes(premiumTier)) {
    return res.status(400).json({ error: `premiumTier must be one of: ${tiers.join(', ')}` });
  }

  return res.json({ ok: true, saved: { prefix: prefix || '!', premiumTier: premiumTier || 'free' } });
});

module.exports = router;
