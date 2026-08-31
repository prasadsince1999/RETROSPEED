const { contextBridge } = require('electron');

// Expose protected methods and system info to the renderer process safely
contextBridge.exposeInMainWorld('electronAPI', {
  appVersion: process.env.npm_package_version || '1.0.0',
  platform: process.platform,
  arch: process.arch,
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  isElectron: true,
  getSystemInfo: () => ({
    platform: process.platform,
    arch: process.arch,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    nodeVersion: process.versions.node,
  }),
});
