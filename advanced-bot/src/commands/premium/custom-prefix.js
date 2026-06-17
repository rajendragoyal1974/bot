module.exports = {
  name: 'custom-prefix',
  description: 'Set a custom server prefix (premium).',
  module: 'premium',
  premiumOnly: true,
  async execute(interaction) {
    const prefix = interaction.options.getString('prefix', true);
    await interaction.reply(`✨ Prefix updated to **${prefix}**.`);
  },
};
