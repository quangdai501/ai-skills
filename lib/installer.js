const fs = require('fs');
const path = require('path');
const { SKILL_PREFIX, PACKAGE_SKILLS_DIR } = require('./constants');
const { getSkillsTargetDir } = require('./paths');

function getPackageSkills() {
  if (!fs.existsSync(PACKAGE_SKILLS_DIR)) {
    return [];
  }
  return fs.readdirSync(PACKAGE_SKILLS_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name);
}

function copyDirContents(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDirContents(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function install() {
  const skills = getPackageSkills();
  if (skills.length === 0) {
    return [];
  }

  const targetDir = getSkillsTargetDir();
  fs.mkdirSync(targetDir, { recursive: true });

  for (const skillName of skills) {
    const src = path.join(PACKAGE_SKILLS_DIR, skillName);
    const dest = path.join(targetDir, skillName);
    copyDirContents(src, dest);
  }

  return skills;
}

function uninstall() {
  const targetDir = getSkillsTargetDir();
  if (!fs.existsSync(targetDir)) {
    return [];
  }

  const entries = fs.readdirSync(targetDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith(SKILL_PREFIX))
    .map(entry => entry.name);

  for (const name of entries) {
    fs.rmSync(path.join(targetDir, name), { recursive: true, force: true });
  }

  return entries;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const block = match[1];
  const result = {};
  for (const line of block.split('\n')) {
    const m = line.match(/^(\w[\w-]*):\s*(.+)$/);
    if (m) {
      result[m[1]] = m[2].trim();
    }
  }
  return result;
}

function list() {
  const skills = getPackageSkills();
  const result = [];

  for (const skillName of skills) {
    const skillFile = path.join(PACKAGE_SKILLS_DIR, skillName, 'SKILL.md');
    let name = skillName;
    let description = '';

    if (fs.existsSync(skillFile)) {
      const content = fs.readFileSync(skillFile, 'utf-8');
      const meta = parseFrontmatter(content);
      if (meta.name) name = meta.name;
      if (meta.description) description = meta.description;
    }

    result.push({ dirName: skillName, name, description });
  }

  return result;
}

module.exports = { install, uninstall, list };
