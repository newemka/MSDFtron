// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// preload.js
const {ipcRenderer, contextBridge, dialog } = require('electron');
const path = require('node:path');
const generateBMFont = require('msdf-bmfont-xml');
const fs = require('node:fs');
const os = require('node:os');


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
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})


// Define the opt object

 const opt = {
    charset_path: 'charsets/eascii.txt',
    fieldType: 'msdf',
    fontSize: 80, // Initialize with initial value
    textureSize: [512,512], // Initialize with initial value
    distanceRange: 4, // Initialize with initial value
    texturePadding: 4 // Initialize with initial value
}; 

// Expose ipcRenderer to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
    generateMsdf: () => {
        generateBMFont(path.join(__dirname, 'ALLEGRON.TTF'), opt, (error, textures, font) => {
            if (error) {
                console.error('Error generating bitmap font:', error);
                return;
            }

            // Write the texture spritesheet to disk
            textures.forEach((texture) => {
                const filename = texture.filename + '.png';
                fs.writeFileSync(filename, texture.texture);
            });

            // Write the BMFont data to disk
            fs.writeFileSync(font.filename, font.data);

            console.log('Bitmap font generated successfully!');
        });
    }
});







/* 
function getFont() {
    const files = dialog.showOpenDialog(browserWindow,{
        defaultPath: app.getPath('desktop'),
        filters: [
            { name: 'Font files', extensions: ['ttf', 'otf'] }
        ]
    }, (filepaths) =>{
        if(filepaths){
            console.log(filepaths);
        }
    })
  } */
