module.exports = {
  name: 'premium-volume',
  description: 'Advanced premium volume control.',
  module: 'premium',
  premiumOnly: true,
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount', true);
    await interaction.reply(`💎 Premium volume set to **${amount}%**.`);
  },
};
