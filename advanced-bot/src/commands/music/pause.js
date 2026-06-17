module.exports = {
  name: 'pause',
  description: 'Pause music playback.',
  module: 'music',
  async execute(interaction) {
    await interaction.reply('⏸️ Playback paused.');
  },
};
