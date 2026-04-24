const { install } = require('../lib/installer');
const { success, info, warn, error } = require('../lib/logger');

try {
  const installed = install();
  if (installed.length > 0) {
    success(`Installed ${installed.length} Claude Code skill(s):`);
    for (const name of installed) {
      info(`  - /${name}`);
    }
    info('\nOpen Claude Code and type "/" to use them.');
  }
} catch (err) {
  warn(`Could not auto-install skills: ${err.message}`);
  info('Run "ai-toolkit install" manually to complete setup.');
}
