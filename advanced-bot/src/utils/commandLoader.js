const fs = require('node:fs');
const path = require('node:path');

function loadCommands(commandsRoot) {
  const commands = new Map();

  for (const moduleName of fs.readdirSync(commandsRoot)) {
    const moduleDir = path.join(commandsRoot, moduleName);
    if (!fs.statSync(moduleDir).isDirectory()) continue;

    for (const fileName of fs.readdirSync(moduleDir)) {
      if (!fileName.endsWith('.js')) continue;
      const command = require(path.join(moduleDir, fileName));
      commands.set(command.name, command);
    }
  }

  return commands;
}

module.exports = { loadCommands };
