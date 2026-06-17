const router = require('express').Router();

const tiers = ['free', 'silver', 'gold'];

function requireSession(req, res, next) {
  if (!req.session?.user?.id) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  return next();
}

router.use(requireSession);

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
  if (typeof prefix === 'string') {
    const normalizedPrefix = prefix.trim();
    if (!normalizedPrefix || normalizedPrefix.length > 5) {
      return res.status(400).json({ error: 'prefix must be between 1 and 5 characters' });
    }
  }

  if (premiumTier && !tiers.includes(premiumTier)) {
    return res.status(400).json({ error: `premiumTier must be one of: ${tiers.join(', ')}` });
  }

  return res.json({ ok: true, saved: { prefix: prefix || '!', premiumTier: premiumTier || 'free' } });
});

module.exports = router;
