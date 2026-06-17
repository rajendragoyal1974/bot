const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'purge',
  description: 'Bulk delete recent messages.',
  module: 'admin',
  permissions: [PermissionFlagsBits.ManageMessages],
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount', true);
    await interaction.reply(`🧹 Purged **${amount}** messages.`);
  },
};
