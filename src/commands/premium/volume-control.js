const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Control music volume (Premium only)')
    .addNumberOption(option =>
      option
        .setName('level')
        .setDescription('Volume level (0-200)')
        .setMinValue(0)
        .setMaxValue(200)
        .setRequired(true)
    ),
  category: 'premium',
  permissions: [],
  isPremium: true,
  async execute(interaction) {
    try {
      const player = useMainPlayer();
      const queue = player.nodes.get(interaction.guild);

      if (!queue) {
        return interaction.reply({
          content: '❌ No music is currently playing!',
          ephemeral: true
        });
      }

      const volume = interaction.options.getNumber('level');
      queue.node.setVolume(volume);

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('🔊 Volume Control')
        .setDescription(`Volume set to ${volume}%`)
        .addFields({
          name: 'Status',
          value: `${getVolumeBar(volume)} ${volume}%`,
          inline: false
        })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};

function getVolumeBar(volume) {
  const filled = Math.round(volume / 10);
  const empty = 20 - filled;
  return '█'.repeat(filled) + '░'.repeat(empty);
}