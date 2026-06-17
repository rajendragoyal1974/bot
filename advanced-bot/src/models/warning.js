class Warning {
  constructor({ guildId, memberId, moderatorId, reason, createdAt = new Date() }) {
    this.guildId = guildId;
    this.memberId = memberId;
    this.moderatorId = moderatorId;
    this.reason = reason;
    this.createdAt = createdAt;
  }
}

module.exports = Warning;
