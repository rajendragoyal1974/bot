class PremiumSubscription {
  constructor({ guildId, active = false, tier = 'free', expiresAt = null }) {
    this.guildId = guildId;
    this.active = active;
    this.tier = tier;
    this.expiresAt = expiresAt;
  }
}

module.exports = PremiumSubscription;
