module.exports = {
  name: 'priority-support',
  description: 'Request priority support routing (premium).',
  module: 'premium',
  premiumOnly: true,
  async execute(interaction) {
    await interaction.reply('🚀 Priority support request submitted.');
  },
};
