module.exports = {
  name: 'skip',
  description: 'Skip the currently playing track.',
  module: 'music',
  async execute(interaction) {
    await interaction.reply('⏭️ Skipped the current track.');
  },
};
