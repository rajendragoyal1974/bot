class CommandError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = 'CommandError';
    this.status = status;
  }
}

module.exports = { CommandError };
