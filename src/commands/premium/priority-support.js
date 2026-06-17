const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('Create a priority support ticket (Premium only)'),
  category: 'premium',
  permissions: [],
  isPremium: true,
  async execute(interaction) {
    try {
      const embed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle('💎 Priority Support')
        .setDescription('Thank you for being a premium member!')
        .addFields(
          { name: 'Support Status', value: '✅ Priority Support Enabled', inline: false },
          { name: 'Response Time', value: '⚡ < 1 hour', inline: true },
          { name: 'Available', value: '24/7', inline: true },
          { name: 'Support Email', value: 'support@discord-bot.com', inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};