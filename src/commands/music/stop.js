const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the music and disconnect the bot'),
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

      queue.delete();

      const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('⏹️ Music Stopped')
        .setDescription('The music has been stopped and the bot has disconnected.')
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.reply('❌ An error occurred!');
    }
  }
};