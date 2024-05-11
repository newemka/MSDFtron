// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
const { ipcRenderer, contextBridge } = require('electron');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs/promises');

contextBridge.exposeInMainWorld('os', {
    homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld('path', {
    join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) => ipcRenderer.on(channel, (event, ...args) => func(...args))
});

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
});

contextBridge.exposeInMainWorld('charsetter', {
    char: async () => {
        try {
            const filePath = path.join(__dirname, '/charsets/eascii.txt');
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return fileContent; // Sending the file content as a string
        } catch (error) {
            console.error('Error reading file:', error);
            return ''; // Return empty string if there's an error
        }
    }
});

