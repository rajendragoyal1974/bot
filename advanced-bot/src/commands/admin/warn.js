const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'warn',
  description: 'Warn a member and store warning record.',
  module: 'admin',
  permissions: [PermissionFlagsBits.ModerateMembers],
  async execute(interaction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason', true);
    await interaction.reply(`⚠️ Warned **${user.tag}**. Reason: ${reason}`);
  },
};
