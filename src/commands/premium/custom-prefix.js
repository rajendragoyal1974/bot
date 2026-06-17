const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setprefix')
    .setDescription('Set custom command prefix (Premium only)')
    .addStringOption(option =>
      option
        .setName('prefix')
        .setDescription('New prefix (1-3 characters)')
        .setRequired(true)
        .setMaxLength(3)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false),
  category: 'premium',
  permissions: ['ManageGuild'],
  isPremium: true,
  async execute(interaction) {
    try {
      const newPrefix = interaction.options.getString('prefix');

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('✅ Prefix Updated')
        .setDescription(`Server prefix has been changed!`)
        .addFields(
          { name: 'Old Prefix', value: '!', inline: true },
          { name: 'New Prefix', value: newPrefix, inline: true },
          { name: 'Example', value: `${newPrefix}play hello`, inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};