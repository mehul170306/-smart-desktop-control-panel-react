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
  executeTask: async (taskId, value) => {
    // If the value looks like a URL, open it
    if (value && (value.startsWith('http://') || value.startsWith('https://'))) {
      console.log(`Opening URL: ${value}`);
      return await runCommand(`start ${value}`);
    }

    // If it's a specific known command with custom logic
    if (commands[taskId]) {
      console.log(`Executing pre-defined task: ${taskId}`);
      return await commands[taskId](value);
    } 
    
    // Otherwise, try to run the value directly as a shell command
    if (value) {
      console.log(`Executing custom shell command: ${value}`);
      return await runCommand(value);
    }

    throw new Error(`Task ${taskId} with value ${value} could not be executed`);
  }
};
