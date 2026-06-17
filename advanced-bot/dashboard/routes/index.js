const router = require('express').Router();
const requestCounters = new Map();

function rateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip;
  const windowMs = 60_000;
  const limit = 60;
  const bucket = requestCounters.get(key) || { count: 0, resetAt: now + windowMs };

  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + windowMs;
  }

  bucket.count += 1;
  requestCounters.set(key, bucket);

  if (bucket.count > limit) {
    return res.status(429).json({ error: 'Too many requests, please try again later.' });
  }

  if (requestCounters.size > 5000) {
    for (const [ip, entry] of requestCounters.entries()) {
      if (now > entry.resetAt) {
        requestCounters.delete(ip);
      }
    }
  }

  return next();
}

router.use(rateLimit);

router.get('/', (req, res) => {
  res.redirect('/public/html/index.html');
});

router.get('/dashboard', (req, res) => {
  const user = req.session.user || { username: 'Guest' };
  res.render('dashboard', { user });
});

module.exports = router;
