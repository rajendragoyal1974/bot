class GuildSettings {
  constructor({ guildId, prefix = '!', premiumTier = 'free' }) {
    this.guildId = guildId;
    this.prefix = prefix;
    this.premiumTier = premiumTier;
  }
}

module.exports = GuildSettings;
