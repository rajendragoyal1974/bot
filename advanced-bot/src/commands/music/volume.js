module.exports = {
  name: 'volume',
  description: 'Set playback volume (premium unlocks extended range).',
  module: 'music',
  premiumOnly: true,
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount', true);
    await interaction.reply(`🔊 Volume set to **${amount}%**`);
  },
};
