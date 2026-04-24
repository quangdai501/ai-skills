const path = require('path');
const os = require('os');

function getSkillsTargetDir() {
  return path.join(os.homedir(), '.claude', 'skills');
}

module.exports = { getSkillsTargetDir };
