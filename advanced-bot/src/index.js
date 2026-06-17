require('dotenv').config();

const path = require('node:path');
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { loadCommands } = require('./utils/commandLoader');
const logger = require('./utils/logger');
const PremiumSubscription = require('./models/premiumSubscription');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Channel],
});

const commandsPath = path.join(__dirname, 'commands');
const commands = loadCommands(commandsPath);
client.commands = new Collection(commands);

const context = {
  commands,
  subscriptionResolver(interaction) {
    return new PremiumSubscription({
      guildId: interaction.guildId,
      active: false,
      tier: 'free',
    });
  },
};

const readyEvent = require('./events/ready');
const interactionCreateEvent = require('./events/interactionCreate');

client.once(readyEvent.name, (...args) => readyEvent.execute(...args));
client.on(interactionCreateEvent.name, (...args) => interactionCreateEvent.execute(...args, context));

process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled promise rejection', { reason: String(reason) });
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error: error.message, stack: error.stack });
  process.exitCode = 1;
});

if (!process.env.DISCORD_TOKEN) {
  logger.error('Missing DISCORD_TOKEN. Copy .env.example to .env and set required values.');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN).catch((error) => {
  logger.error('Failed to login', { error: error.message });
  process.exit(1);
});
