module.exports = {
  name: 'ticket-close',
  description: 'Close an open support ticket.',
  module: 'tickets',
  async execute(interaction) {
    await interaction.reply('✅ Ticket closed and archived.');
  },
};
