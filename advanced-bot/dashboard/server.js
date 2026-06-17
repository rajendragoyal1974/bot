require('dotenv').config({ path: require('node:path').resolve(__dirname, '../.env') });

const path = require('node:path');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');

const app = express();
const port = Number(process.env.DASHBOARD_PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('Missing SESSION_SECRET. Set it in .env before starting the dashboard.');
}

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', secure: isProduction },
  }),
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/oauth'));
app.use('/api', require('./routes/api'));

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message || 'Unexpected dashboard error' });
});

app.listen(port, () => {
  console.log(`Dashboard listening on http://localhost:${port}`);
});
