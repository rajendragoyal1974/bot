const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play music from YouTube or Spotify')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('Song name, URL, or playlist')
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option
        .setName('premium')
        .setDescription('Use premium quality (Premium Only)')
        .setRequired(false)
    ),
  category: 'music',
  permissions: [],
  async execute(interaction) {
    try {
      if (!interaction.member.voice.channel) {
        return interaction.reply({
          content: '❌ You need to be in a voice channel to use this command!',
          ephemeral: true
        });
      }

      await interaction.deferReply();

      const player = useMainPlayer();
      const query = interaction.options.getString('query');
      const premium = interaction.options.getBoolean('premium') || false;

      const searchResult = await player.search(query, {
        requestedBy: interaction.user
      });

      if (!searchResult || !searchResult.tracks.length) {
        return interaction.editReply('❌ No tracks found for your query!');
      }

      const queue = player.nodes.create(interaction.guild, {
        metadata: {
          channel: interaction.channel
        }
      });

      if (!queue.connection) {
        queue.connect(interaction.member.voice.channel);
      }

      const isPlaylist = searchResult.playlist;

      if (isPlaylist) {
        await queue.addTrack(searchResult.tracks);
      } else {
        await queue.addTrack(searchResult.tracks[0]);
      }

      if (!queue.isPlaying()) {
        await queue.node.play();
      }

      const embed = new EmbedBuilder()
        .setColor('Green')
        .setTitle('🎵 Music Player')
        .setDescription(`${isPlaylist ? '📻 Playlist' : '🎵 Track'} added to queue!`)
        .addFields(
          { name: 'Queue Length', value: `${queue.tracks.length} tracks`, inline: true },
          { name: 'Now Playing', value: queue.currentTrack ? queue.currentTrack.title : 'None', inline: true },
          { name: 'Premium Quality', value: premium ? '✅ Yes' : '❌ No (Free)', inline: true }
        )
        .setFooter({ text: `Requested by ${interaction.user.username}` })
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply('❌ An error occurred while playing music!');
    }
  }
};