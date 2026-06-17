# Advanced Bot (Independent Scaffold)

This folder contains a standalone Discord bot scaffold and dashboard, intentionally isolated from the existing repository code.

## Structure

- `src/` - bot runtime, commands, events, models, utilities, config
- `dashboard/` - web dashboard (OAuth2 routes, settings API, static assets, views)

## Included Modules

### 1) Music Module
Commands scaffolded:
- `play`, `skip`, `pause`, `resume`, `queue`, `volume`, `equalizer`

### 2) Admin Module
Commands scaffolded with permission checks:
- `ban`, `kick`, `mute`, `warn`, `purge`

### 3) Ticket Module
Commands scaffolded:
- `ticket-create`, `ticket-close`, `ticket-manage`

### 4) Premium Module
Commands scaffolded:
- `custom-prefix`, `priority-support`, `premium-volume`, `premium-equalizer`

### 5) Dashboard
- Express dashboard server with `helmet`, sessions, route separation
- Discord OAuth2 login redirect + callback scaffold
- Settings API with input validation and premium tier management

## Setup

1. Copy env template:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start bot:
   ```bash
   npm start
   ```
4. Start dashboard:
   ```bash
   npm run dashboard
   ```

## Production Notes

- Add persistent storage for models in `src/models/`.
- Implement full OAuth2 token exchange/user validation in `dashboard/routes/oauth.js` before enabling authenticated sessions.
- Register slash command options/schemas before deployment.
- Set `SESSION_SECRET` in `.env`; dashboard startup now requires it.
- Basic dashboard route rate limiting is included; extend it and add API-specific request auditing for production scale.
