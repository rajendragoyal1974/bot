const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the current music'),
  category: 'music',
  permissions: [],
  async execute(interaction) {
    try {
      const player = useMainPlayer();
      const queue = player.nodes.get(interaction.guild);

      if (!queue || !queue.isPlaying()) {
        return interaction.reply({
          content: '❌ No music is currently playing!',
          ephemeral: true
        });
      }

      queue.node.pause();

      const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('⏸️ Music Paused')
        .setDescription('The music has been paused.')
        .addFields({
          name: 'Current Track',
          value: queue.currentTrack?.title || 'None',
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