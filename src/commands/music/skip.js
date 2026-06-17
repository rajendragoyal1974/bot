const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current track'),
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

      const previousTrack = queue.currentTrack;
      const success = queue.node.skip();

      if (!success) {
        return interaction.reply('❌ Failed to skip the track!');
      }

      const embed = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle('⏭️ Track Skipped')
        .setDescription(`**${previousTrack?.title}** has been skipped.`)
        .addFields({
          name: 'Now Playing',
          value: queue.currentTrack?.title || 'Queue ended',
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