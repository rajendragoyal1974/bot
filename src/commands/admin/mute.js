const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a user')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to mute')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('duration')
        .setDescription('Duration (e.g., 1h, 30m, 1d)')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('Reason for the mute')
        .setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .setDMPermission(false),
  category: 'admin',
  permissions: ['ModerateMembers'],
  async execute(interaction) {
    try {
      const user = interaction.options.getUser('user');
      const duration = interaction.options.getString('duration');
      const reason = interaction.options.getString('reason') || 'No reason provided';
      const member = await interaction.guild.members.fetch(user.id).catch(() => null);

      if (!member) {
        return interaction.reply({
          content: '❌ User not found in this server!',
          ephemeral: true
        });
      }

      const durationMs = parseDuration(duration);
      if (!durationMs) {
        return interaction.reply({
          content: '❌ Invalid duration format! Use: 1h, 30m, 1d, etc.',
          ephemeral: true
        });
      }

      await member.timeout(durationMs, reason);

      const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('🔇 User Muted')
        .setDescription(`${user.tag} has been muted.`)
        .addFields(
          { name: 'Duration', value: duration, inline: true },
          { name: 'Reason', value: reason, inline: false },
          { name: 'Moderator', value: interaction.user.tag, inline: true }
        )
        .setThumbnail(user.displayAvatarURL())
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred while muting the user!');
    }
  }
};

function parseDuration(duration) {
  const match = duration.match(/(\d+)([smhd])/);
  if (!match) return null;

  const value = parseInt(match[1]);
  const unit = match[2];

  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000
  };

  return value * multipliers[unit];
}