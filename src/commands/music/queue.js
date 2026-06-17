const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('View the current music queue')
    .addNumberOption(option =>
      option
        .setName('page')
        .setDescription('Page number (default: 1)')
        .setRequired(false)
    ),
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

      const page = interaction.options.getNumber('page') || 1;
      const tracks = queue.tracks;
      const tracksPerPage = 10;
      const totalPages = Math.ceil(tracks.length / tracksPerPage);

      if (page > totalPages || page < 1) {
        return interaction.reply({
          content: `❌ Invalid page number! Total pages: ${totalPages}`,
          ephemeral: true
        });
      }

      const startIndex = (page - 1) * tracksPerPage;
      const paginatedTracks = tracks.slice(startIndex, startIndex + tracksPerPage);

      const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('🎵 Music Queue')
        .setDescription(
          paginatedTracks.length
            ? paginatedTracks.map((track, index) => `${startIndex + index + 1}. ${track.title}`).join('\n')
            : 'No tracks in queue'
        )
        .addFields(
          { name: 'Now Playing', value: queue.currentTrack?.title || 'None', inline: true },
          { name: 'Total Tracks', value: tracks.length.toString(), inline: true },
          { name: 'Page', value: `${page}/${totalPages}`, inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.username}` })
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};