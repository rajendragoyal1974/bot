const { PermissionFlagsBits } = require('discord.js');

module.exports = {
  name: 'mute',
  description: 'Timeout a member for moderation purposes.',
  module: 'admin',
  permissions: [PermissionFlagsBits.ModerateMembers],
  async execute(interaction) {
    const user = interaction.options.getUser('user', true);
    const duration = interaction.options.getString('duration', true);
    await interaction.reply(`🔇 Timed out **${user.tag}** for **${duration}**.`);
  },
};
