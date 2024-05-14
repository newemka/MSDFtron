// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
const { ipcRenderer, contextBridge } = require('electron');
const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs/promises');

const WINDOW_API = {
    getMessage: () => ipcRenderer.invoke("")
}

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

/* contextBridge.exposeInMainWorld('charsetter', {
    char: async (selectedFile) => {
        let dafile = `${selectedFile}`;
        try {
            const filePath = path.join(__dirname, dafile);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return fileContent; // Sending the file content as a string
        } catch (error) {
            console.error('Error reading file:', error);
            return ''; // Return empty string if there's an error
        }
    }
}); */
contextBridge.exposeInMainWorld('charsetter', {
    char: async (selectedFile) => {
        let dafile = selectedFile ? selectedFile : 'eascii.txt'; // Use 'default.txt' if selectedFile is undefined
        try {
            const filePath = path.join(__dirname, 'charsets', dafile);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return fileContent;
        } catch (error) {
            console.error('Error reading file:', error);
            return ''; // Return empty string if there's an error
        }
    }
});


// for feedback 
const indexBridge = {
    somethinghappened: (callback) => ipcRenderer.on("somethinghappened", (callback))
}

contextBridge.exposeInMainWorld('indexBridge', indexBridge);