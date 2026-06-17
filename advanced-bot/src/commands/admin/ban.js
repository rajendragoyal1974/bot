const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Ban a member and log moderation action.',
  module: 'admin',
  permissions: [PermissionFlagsBits.BanMembers],
  async execute(interaction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await interaction.reply(`🔨 Banned **${user.tag}**. Reason: ${reason}`);
  },
};
