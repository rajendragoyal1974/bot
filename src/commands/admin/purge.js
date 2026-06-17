const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Delete messages from the channel')
    .addNumberOption(option =>
      option
        .setName('amount')
        .setDescription('Number of messages to delete (max 100)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .setDMPermission(false),
  category: 'admin',
  permissions: ['ManageMessages'],
  async execute(interaction) {
    try {
      const amount = interaction.options.getNumber('amount');

      const deleted = await interaction.channel.bulkDelete(amount);

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('🗑️ Messages Purged')
        .setDescription(`${deleted.size} messages have been deleted.`)
        .addFields(
          { name: 'Moderator', value: interaction.user.tag, inline: true },
          { name: 'Channel', value: interaction.channel.toString(), inline: true }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};