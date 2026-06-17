const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the paused music'),
  category: 'music',
  permissions: [],
  async execute(interaction) {
    try {
      const player = useMainPlayer();
      const queue = player.nodes.get(interaction.guild);

      if (!queue) {
        return interaction.reply({
          content: '❌ No queue is currently active!',
          ephemeral: true
        });
      }

      if (queue.isPlaying()) {
        return interaction.reply({
          content: '❌ Music is already playing!',
          ephemeral: true
        });
      }

      queue.node.resume();

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('▶️ Music Resumed')
        .setDescription('The music has been resumed.')
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