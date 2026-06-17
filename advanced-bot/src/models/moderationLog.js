class ModerationLog {
  constructor({ guildId, moderatorId, targetId, action, reason, createdAt = new Date() }) {
    this.guildId = guildId;
    this.moderatorId = moderatorId;
    this.targetId = targetId;
    this.action = action;
    this.reason = reason;
    this.createdAt = createdAt;
  }
}

module.exports = ModerationLog;
