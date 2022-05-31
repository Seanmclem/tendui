// Native
import { join } from 'path';
import * as fs from 'fs/promises';

import contextMenu from 'electron-context-menu';

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, dialog } from 'electron';
import isDev from 'electron-is-dev';
// import { CreateFilePayload } from '../src/constants-types/generic-types';

const height = 600;
const width = 800;

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    frame: false,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  contextMenu({
    showSearchWithGoogle: false,
    showCopyImage: false,
    prepend: () => [
      {
        label: 'its like magic 💥'
      }
    ]
  });

  const port = process.env.PORT || 3000;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  // window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});

ipcMain.on('getFile', async (event: IpcMainEvent, payload?: string) => {
  // native-3

  // console.log({ message });

  // join(__dirname, '../package.json')

  const bufferIdk = await fs.readFile(`${payload}/package.json`);
  const textOutput = bufferIdk.toString();
  console.log({ textOutput });
  event.sender.send('getFile', textOutput);
  // return textOutput;
});
// try elecctron fs dialogs https://www.electronjs.org/docs/latest/api/dialog

ipcMain.on('goGetFolderOpenDialg', async (event: IpcMainEvent, payload?: string) => {
  let selectedFolderPath: string = '';
  console.log('goGetFolderOpenDialg -> MAIN', payload);
  if (payload) {
    // do like, pass the code a path, or if no path -popdialog to pick one
    selectedFolderPath = payload;
  } else {
    const result = await dialog.showOpenDialog({
      properties: ['openDirectory', 'multiSelections']
    });

    selectedFolderPath = result.filePaths[0];
  }

  const dirs = await fs.readdir(selectedFolderPath);

  event.sender.send('getFolderResponse', { contents: dirs, selectedFolderPath });
});

ipcMain.on('goGetSpecificFolder', async (event: IpcMainEvent, selectedFolderPath?: string) => {
  if (!selectedFolderPath) {
    return false;
  }
  const dirs = await fs.readdir(selectedFolderPath);

  event.sender.send('goGetSpecificFolder_Response', { contents: dirs, selectedFolderPath });
});

ipcMain.on('saveFile', async (event: IpcMainEvent, payload: any) => {
  const { path, contents } = payload;
  await fs.writeFile(path, contents.toString());
  // need try-catch, errors, handling
  event.sender.send('saveFileResponse', 'success!');
});
