const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');
const fs = require('fs');

const isDev = !app.isPackaged || process.env.NODE_ENV === 'development';

let mainWindow = null;

function createApplicationMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac
      ? [{
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        }]
      : []),
    {
      label: 'File',
      submenu: [
        {
          label: 'Restart RETROSPEED',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (mainWindow) {
              if (isDev) {
                mainWindow.loadURL('http://localhost:3000');
              } else {
                mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
              }
            }
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close' } : { role: 'quit', label: 'Exit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'zoom' },
        ...(isMac
          ? [
              { type: 'separator' },
              { role: 'front' },
              { type: 'separator' },
              { role: 'window' }
            ]
          : [{ role: 'close' }])
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'Documentation & Support',
          click: async () => {
            await shell.openExternal('https://github.com/prasadsince1999/RETROSPEED');
          }
        },
        {
          label: 'About RETROSPEED',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'About RETROSPEED',
              message: 'RETROSPEED — Race Your Fingers',
              detail: `Version: ${app.getVersion()}\nRace Your Fingers • Retro Arcade Touch Typing Velocity Studio.\nEngine: Electron ${process.versions.electron}`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  const iconPath = path.join(__dirname, '../public/favicon.svg');
  const hasIcon = fs.existsSync(iconPath);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: 'RETROSPEED — Race Your Fingers',
    titleBarStyle: 'default',
    icon: hasIcon ? iconPath : undefined,
    backgroundColor: '#B9D2E8',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      devTools: isDev
    }
  });

  createApplicationMenu();

  // Gracefully show window when ready to avoid white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Ensure shortcut chords (Ctrl+W, Ctrl+T, Alt+Tab) reach typing session without closing window
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12' || input.key === 'F11') return;
    if ((input.control || input.meta) && input.key.toLowerCase() === 'r') return;
    // Don't close app on Ctrl+W / Ctrl+Q during typing lessons
    if (input.control && ['w', 't'].includes(input.key.toLowerCase())) {
      // Event passes to renderer
    }
  });

  // Handle external navigation securely - open links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    try {
      const parsedUrl = new URL(navigationUrl);
      if (isDev && parsedUrl.origin === 'http://localhost:3000') {
        return;
      }
      if (parsedUrl.protocol === 'file:') {
        return;
      }
    } catch {
      // Fallback
    }
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });

  // Offline fallback handling
  mainWindow.webContents.on('did-fail-load', (_event, errorCode, errorDescription, validatedURL) => {
    console.warn(`Page failed to load: ${errorCode} - ${errorDescription} (${validatedURL})`);
    if (isDev && validatedURL && validatedURL.includes('localhost:3000')) {
      setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.loadURL('http://localhost:3000').catch(() => {});
        }
      }, 1000);
    } else if (!isDev) {
      mainWindow.loadFile(path.join(__dirname, '../dist/index.html')).catch((err) => {
        console.error('Failed to load production fallback:', err);
      });
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000').catch((err) => {
      console.log('Dev server not yet ready, waiting for connection: ', err.message);
    });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Single instance lock
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
