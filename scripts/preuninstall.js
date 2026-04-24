const { uninstall } = require('../lib/installer');
const { success, info, error } = require('../lib/logger');

try {
  const removed = uninstall();
  if (removed.length > 0) {
    success(`Removed ${removed.length} Claude Code skill(s):`);
    for (const name of removed) {
      info(`  - ${name}`);
    }
  }
} catch (err) {
  // Non-fatal — don't block npm uninstall
}
