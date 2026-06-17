const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the kick')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false),
  category: 'admin',
  permissions: ['KickMembers'],
  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user');
      const reason = interaction.options.getString('reason') || 'No reason provided';
      const member = await interaction.guild.members.fetch(user.id).catch(() => null);

      if (!member) {
        return interaction.reply({
          content: '❌ User not found in this server!',
          ephemeral: true
        });
      }

      if (member.id === interaction.user.id) {
        return interaction.reply({
          content: '❌ You cannot kick yourself!',
          ephemeral: true
        });
      }

      if (member.roles.highest.position >= interaction.member.roles.highest.position) {
        return interaction.reply({
          content: '❌ You cannot kick this user (insufficient permissions)!',
          ephemeral: true
        });
      }

      await member.kick(reason);

      const embed = new EmbedBuilder()
        .setColor('Orange')
        .setTitle('👢 User Kicked')
        .setDescription(`${user.tag} has been kicked from the server.`)
        .addFields(
          { name: 'Reason', value: reason, inline: false },
          { name: 'Moderator', value: interaction.user.tag, inline: true },
          { name: 'Timestamp', value: new Date().toLocaleString(), inline: true }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred while kicking the user!');
    }
  }
};