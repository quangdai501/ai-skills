#!/usr/bin/env node

const { install, uninstall, list } = require('../lib/installer');
const { success, info, warn, error } = require('../lib/logger');
const { getSkillsTargetDir } = require('../lib/paths');

const USAGE = `
ai-toolkit - Manage Claude Code custom skills

Usage:
  ai-toolkit install     Copy skills to ~/.claude/skills/
  ai-toolkit uninstall   Remove package skills from ~/.claude/skills/
  ai-toolkit list        List available skills in this package
  ai-toolkit --help      Show this help message

After installing, type "/" in Claude Code CLI to see your new commands.
`.trim();

function run() {
  const command = process.argv[2];

  if (!command || command === '--help' || command === '-h') {
    console.log(USAGE);
    return;
  }

  switch (command) {
    case 'install': {
      try {
        const installed = install();
        if (installed.length === 0) {
          warn('No skills found in package.');
          return;
        }
        success(`Installed ${installed.length} skill(s) to ${getSkillsTargetDir()}:`);
        for (const name of installed) {
          info(`  - /${name}`);
        }
        info('\nOpen Claude Code and type "/" to use them.');
      } catch (err) {
        if (err.code === 'EACCES') {
          error(`Permission denied writing to ${getSkillsTargetDir()}`);
          info('Try running with sudo or fix directory permissions.');
        } else {
          error(`Install failed: ${err.message}`);
        }
        process.exit(1);
      }
      break;
    }

    case 'uninstall': {
      try {
        const removed = uninstall();
        if (removed.length === 0) {
          info('No package skills found to remove.');
          return;
        }
        success(`Removed ${removed.length} skill(s):`);
        for (const name of removed) {
          info(`  - ${name}`);
        }
      } catch (err) {
        if (err.code === 'EACCES') {
          error(`Permission denied accessing ${getSkillsTargetDir()}`);
        } else {
          error(`Uninstall failed: ${err.message}`);
        }
        process.exit(1);
      }
      break;
    }

    case 'list': {
      const skills = list();
      if (skills.length === 0) {
        info('No skills found in package.');
        return;
      }
      console.log(`\nAvailable skills (${skills.length}):\n`);
      for (const skill of skills) {
        console.log(`  /${skill.name}`);
        if (skill.description) {
          console.log(`    ${skill.description}`);
        }
        console.log();
      }
      break;
    }

    default:
      error(`Unknown command: ${command}`);
      console.log(USAGE);
      process.exit(1);
  }
}

run();
