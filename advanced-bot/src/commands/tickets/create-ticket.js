module.exports = {
  name: 'ticket-create',
  description: 'Create a support ticket channel.',
  module: 'tickets',
  async execute(interaction) {
    await interaction.reply('🎫 Ticket created. A support member will assist shortly.');
  },
};
