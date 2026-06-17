const { CommandError } = require('./errors');

function assertMemberPermissions(interaction, permissions = []) {
  if (!permissions.length) return;

  const missing = permissions.filter((permission) => !interaction.memberPermissions?.has(permission));
  if (missing.length) {
    throw new CommandError(`Missing required permission(s): ${missing.join(', ')}`, 403);
  }
}

function assertPremium(subscription, required = false) {
  if (required && !subscription?.active) {
    throw new CommandError('This command requires an active premium subscription.', 402);
  }
}

module.exports = { assertMemberPermissions, assertPremium };
