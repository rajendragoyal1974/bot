module.exports = {
  name: 'resume',
  description: 'Resume paused music playback.',
  module: 'music',
  async execute(interaction) {
    await interaction.reply('▶️ Playback resumed.');
  },
};
