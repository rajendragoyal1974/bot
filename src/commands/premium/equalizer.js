const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('equalizer')
    .setDescription('Adjust audio equalizer (Premium only)')
    .addStringOption(option =>
      option
        .setName('preset')
        .setDescription('Equalizer preset')
        .setRequired(true)
        .addChoices(
          { name: 'Bass Boost', value: 'bass' },
          { name: 'Treble Boost', value: 'treble' },
          { name: 'Normal', value: 'normal' },
          { name: 'Deep', value: 'deep' },
          { name: 'Bright', value: 'bright' }
        )
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

      const preset = interaction.options.getString('preset');

      const presets = {
        bass: { name: '🎸 Bass Boost', description: 'Enhanced bass frequencies' },
        treble: { name: '🎺 Treble Boost', description: 'Enhanced treble frequencies' },
        normal: { name: '🎵 Normal', description: 'Standard equalizer' },
        deep: { name: '🌊 Deep', description: 'Deep and rich sound' },
        bright: { name: '✨ Bright', description: 'Clear and crisp sound' }
      };

      const selected = presets[preset];

      const embed = new EmbedBuilder()
        .setColor('Purple')
        .setTitle('🎚️ Equalizer')
        .setDescription(`Applied ${selected.name}`)
        .addFields({
          name: 'Preset',
          value: selected.description,
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