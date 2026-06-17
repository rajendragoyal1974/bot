module.exports = {
  name: 'play',
  description: 'Play a track or playlist in the current voice channel.',
  module: 'music',
  async execute(interaction) {
    const query = interaction.options.getString('query', true);
    await interaction.reply(`🎵 Queued: **${query}**`);
  },
};
