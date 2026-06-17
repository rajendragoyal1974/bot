const logger = require('../utils/logger');

module.exports = {
  name: 'ready',
  once: true,
  execute(client) {
    logger.info('Bot is ready', { user: client.user?.tag });
  },
};
