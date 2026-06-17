const logger = require('../utils/logger');
const { CommandError } = require('../utils/errors');
const { assertMemberPermissions, assertPremium } = require('../utils/permissions');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, context) {
    if (!interaction.isChatInputCommand()) return;

    const command = context.commands.get(interaction.commandName);
    if (!command) return;

    try {
      assertMemberPermissions(interaction, command.permissions || []);
      assertPremium(context.subscriptionResolver(interaction), command.premiumOnly);
      await command.execute(interaction, context);
    } catch (error) {
      const message = error instanceof CommandError ? error.message : 'Unexpected command error. Please try again.';
      const reply = { content: `❌ ${message}`, ephemeral: true };

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp(reply);
      } else {
        await interaction.reply(reply);
      }

      logger.error('Command execution failed', {
        command: interaction.commandName,
        error: error.message,
        stack: error.stack,
      });
    }
  },
};
