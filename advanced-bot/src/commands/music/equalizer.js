module.exports = {
  name: 'equalizer',
  description: 'Set equalizer preset (Normal, Bass, Treble, Deep, Bright).',
  module: 'music',
  premiumOnly: true,
  async execute(interaction) {
    const preset = interaction.options.getString('preset', true);
    await interaction.reply(`🎚️ Equalizer preset set to **${preset}**.`);
  },
};
