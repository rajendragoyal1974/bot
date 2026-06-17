const router = require('express').Router();

router.get('/login', (req, res) => {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/auth/callback');

  if (!clientId) {
    return res.status(500).json({ error: 'Missing DISCORD_CLIENT_ID configuration' });
  }

  const url = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=identify+guilds`;
  return res.redirect(url);
});

router.get('/callback', (req, res) => {
  if (!req.query.code) {
    return res.status(400).json({ error: 'Missing OAuth2 authorization code' });
  }

  return res.status(501).json({
    error: 'OAuth2 token exchange not implemented in scaffold. Implement token validation before enabling login.',
  });
});

module.exports = router;
