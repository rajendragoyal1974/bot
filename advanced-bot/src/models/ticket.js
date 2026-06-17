class Ticket {
  constructor({ ticketId, guildId, creatorId, status = 'open', assignedTo = null }) {
    this.ticketId = ticketId;
    this.guildId = guildId;
    this.creatorId = creatorId;
    this.status = status;
    this.assignedTo = assignedTo;
  }
}

module.exports = Ticket;
