module.exports = {
  name: 'queue',
  description: 'Show the current music queue.',
  module: 'music',
  async execute(interaction) {
    await interaction.reply('📜 Queue is currently empty.');
  },
};
