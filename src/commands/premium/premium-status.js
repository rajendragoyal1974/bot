const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('premium')
    .setDescription('Check your premium status'),
  category: 'premium',
  permissions: [],
  isPremium: false,
  async execute(interaction) {
    try {
      const isPremium = false;
      const tier = 'Standard';
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

      const embed = new EmbedBuilder()
        .setColor(isPremium ? 'Gold' : 'Red')
        .setTitle('💎 Premium Status')
        .setDescription(`Your premium subscription is ${isPremium ? '✅ **ACTIVE**' : '❌ **INACTIVE**'}`)
        .addFields(
          { name: 'Status', value: isPremium ? '✅ Active' : '❌ Not Active', inline: true },
          { name: 'Tier', value: isPremium ? tier : 'Free', inline: true },
          { name: 'Expires', value: isPremium ? expiresAt.toDateString() : 'N/A', inline: true },
          { name: '\nFeatures', value: '🎵 Music\n👮 Admin\n🎫 Tickets\n💎 Premium Commands', inline: false }
        )
        .setTimestamp();

      await interaction.reply({ embeds: [embed], ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};