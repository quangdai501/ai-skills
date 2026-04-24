const useColor = process.stdout.isTTY;

function colorize(code, text) {
  if (!useColor) return text;
  return `\x1b[${code}m${text}\x1b[0m`;
}

function success(msg) {
  console.log(colorize('32', `✔ ${msg}`));
}

function info(msg) {
  console.log(colorize('36', msg));
}

function warn(msg) {
  console.warn(colorize('33', `⚠ ${msg}`));
}

function error(msg) {
  console.error(colorize('31', `✖ ${msg}`));
}

module.exports = { success, info, warn, error };
