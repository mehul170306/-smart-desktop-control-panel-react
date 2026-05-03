const { exec } = require('child_process');

/**
 * Executes a shell command and returns a promise.
 */
const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, error);
        reject(error);
        return;
      }
      resolve(stdout || stderr);
    });
  });
};

const commands = {
  // App Launchers
  'open_chrome': () => runCommand('start chrome'),
  'open_vscode': () => runCommand('code .'),
  'open_notepad': () => runCommand('start notepad'),
  'open_spotify': () => runCommand('start spotify'),
  'open_calculator': () => runCommand('start calc'),
  
  // System Controls
  'lock_pc': () => runCommand('rundll32.exe user32.dll,LockWorkStation'),
  'shutdown_pc': () => runCommand('shutdown /s /t 60'), // Shutdown in 60s
  'restart_pc': () => runCommand('shutdown /r /t 60'), // Restart in 60s
  'abort_shutdown': () => runCommand('shutdown /a'),
  
  // Custom
  'open_url': (url) => runCommand(`start ${url}`),
  'run_custom': (cmd) => runCommand(cmd)
};

module.exports = {
  executeTask: async (taskId, params) => {
    if (commands[taskId]) {
      console.log(`Executing task: ${taskId}`);
      return await commands[taskId](params);
    } else {
      throw new Error(`Task ${taskId} not found`);
    }
  }
};
