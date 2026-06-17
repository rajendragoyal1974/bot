const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Kick a member and log moderation action.',
  module: 'admin',
  permissions: [PermissionFlagsBits.KickMembers],
  async execute(interaction) {
    const user = interaction.options.getUser('user', true);
    const reason = interaction.options.getString('reason') || 'No reason provided';
    await interaction.reply(`👢 Kicked **${user.tag}**. Reason: ${reason}`);
  },
};
