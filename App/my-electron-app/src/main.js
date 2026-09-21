import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { spawn } from 'node:child_process';
import started from 'electron-squirrel-startup';

if (started) {
  app.quit();
}

let mainWindow = null;
let goProcess = null;
let pythonProcess = null;

let lastCaret = null;
let lastCompletion = '';

const GO_BINARY = path.join(__dirname, '../../bin/YOUR_GO_BINARY.exe');
const PYTHON_BINARY = path.join(__dirname, '../../bin/YOUR_PYTHON_BINARY.exe');

function sendToRenderer(message) {
  if (!mainWindow || mainWindow.isDestroyed()) {
    return;
  }

  mainWindow.webContents.send('backend-event', message);
}

function handleBackendLine(line) {
  line = line.trim();

  if (!line) {
    return;
  }

  let message;

  try {
    message = JSON.parse(line);
  } catch {
    return;
  }

  if (!message || typeof message.type !== 'string') {
    return;
  }

  switch (message.type) {
    case 'caret':
      if (
        typeof message.x !== 'number' ||
        typeof message.y !== 'number'
      ) {
        return;
      }

      lastCaret = {
        x: message.x,
        y: message.y,
      };

      mainWindow.setPosition(
        Math.round(message.x),
        Math.round(message.y),
      );

      if (lastCompletion) {
        mainWindow.showInactive();
      }

      sendToRenderer(message);
      break;

    case 'completion':
      if (typeof message.text !== 'string') {
        return;
      }

      lastCompletion = message.text;

      sendToRenderer(message);

      if (!lastCompletion) {
        mainWindow.hide();
        return;
      }

      if (lastCaret) {
        mainWindow.setPosition(
          Math.round(lastCaret.x),
          Math.round(lastCaret.y),
        );
      }

      mainWindow.showInactive();
      break;

    case 'hide':
      lastCompletion = '';
      mainWindow.hide();
      sendToRenderer(message);
      break;
  }
}

function attachJsonLines(child) {
  let buffer = '';

  child.stdout.on('data', (data) => {
    buffer += data.toString();

    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      handleBackendLine(line);
    }
  });

  child.stdout.on('end', () => {
    if (buffer.trim()) {
      handleBackendLine(buffer);
    }
  });

  child.stderr.on('data', (data) => {
    console.error(data.toString().trim());
  });
}

function startBackendProcesses() {
  if (goProcess || pythonProcess) {
    return;
  }

  goProcess = spawn(GO_BINARY, [], {
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  attachJsonLines(goProcess);

  goProcess.on('error', (error) => {
    console.error('Failed to start Go:', error);
  });

  goProcess.on('exit', (code) => {
    console.log(`Go exited with code ${code}`);
    goProcess = null;
  });

  pythonProcess = spawn(PYTHON_BINARY, [], {
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });

  attachJsonLines(pythonProcess);

  pythonProcess.on('error', (error) => {
    console.error('Failed to start Python:', error);
  });

  pythonProcess.on('exit', (code) => {
    console.log(`Python exited with code ${code}`);
    pythonProcess = null;
  });
}

function stopBackendProcesses() {
  if (goProcess) {
    goProcess.kill();
    goProcess = null;
  }

  if (pythonProcess) {
    pythonProcess.kill();
    pythonProcess = null;
  }
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 55,

    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    show: false,

    // The settings button is visual-only for now.
    backgroundColor: '#00000000',

    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(
        __dirname,
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
      ),
    );
  }

  mainWindow.webContents.once('did-finish-load', () => {
    startBackendProcesses();
  });

  // Remove this once you stop debugging.
  mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('before-quit', () => {
  stopBackendProcesses();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('settings', () => {
  // Placeholder for later.
  console.log('Settings clicked');
});