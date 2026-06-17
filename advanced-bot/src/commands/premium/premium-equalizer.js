module.exports = {
  name: 'premium-equalizer',
  description: 'Premium equalizer presets and tuning.',
  module: 'premium',
  premiumOnly: true,
  async execute(interaction) {
    const preset = interaction.options.getString('preset', true);
    await interaction.reply(`💎 Premium EQ preset applied: **${preset}**.`);
  },
};
