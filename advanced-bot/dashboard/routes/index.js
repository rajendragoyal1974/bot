const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(require('node:path').join(__dirname, '../public/html/index.html'));
});

router.get('/dashboard', (req, res) => {
  const user = req.session.user || { username: 'Guest' };
  res.render('dashboard', { user });
});

module.exports = router;
