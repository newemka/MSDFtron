const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('node:path');
const os = require('os');
const fs = require('fs');
const generateBMFont = require('msdf-bmfont-xml');

const isDev = process.env.NODE_ENV !== 'production';
const isMac = process.platform === 'darwin';



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function handleSetTitle (event, title) {
  const webContents = event.sender
  const win = BrowserWindow.fromWebContents(webContents)
  win.setTitle(title)
}

function handleSubmit (event, submit) {
  const webContents = event.sender
  
}


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({

    width: isDev ? 1000 : 800,
    x : isDev ? 2000 : null,
    y: isDev ? 100 : null,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  //contextIsolation: true, // This enables context isolation
  //sandbox: true, // Enable the sandbox
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  if(isDev){
    mainWindow.webContents.openDevTools();
  }
  

 };

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  ipcMain.on('submit', handleSubmit), //ipc
  ipcMain.on('set-title', handleSetTitle) //ipc
  ipcMain.handle('ping', () => 'pong')
  createWindow();

  //implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

const menu = [
  ...(isMac ? [{
    label: app.name,
  }] : []),
  {
   role: 'fileMenu',
  }
];

//respond to ipcRenderer convert

ipcMain.on('font:convert', (e, options) => {
  //options.dest = path.join(os.homedir(), 'fontconverter');
  console.log(options);
  convertFont(options);
});

//convert font {fontPath, charset_path, fieldType, fontSize, textureSize, distanceRange, texturePadding}
async function convertFont({fontPath, fontSize, distanceRange, texturePadding, textureSize}) {
  try {
     generateBMFont(
      fontPath,
      { fontSize, distanceRange, texturePadding, textureSize }, // Pass fontSize within an object

      (error, textures, font)=> {
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
  }catch (error){
    console.log(error);
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


