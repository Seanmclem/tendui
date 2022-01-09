import { app, BrowserWindow, ipcMain } from 'electron'
import type { BrowserWindowConstructorOptions } from 'electron'
import contextMenu from 'electron-context-menu'
import windowStateKeeper from 'electron-window-state'
import { getTwConfig, getTwConfigPath } from '@twstyled/util'

const os = require('os')
const pty = require('node-pty')

const shell = os.platform() === 'win32' ? 'powershell.exe' : 'zsh'

const resolvedTailwindConfig = getTwConfig(getTwConfigPath())

const isDevelopment = !app.isPackaged

function createWindow() {
  const windowOptions: BrowserWindowConstructorOptions = {
    minWidth: 800,
    minHeight: 600,
    backgroundColor: resolvedTailwindConfig.theme.colors.primary[800],
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    trafficLightPosition: {
      x: 20,
      y: 32
    },
    webPreferences: {
      contextIsolation: false,
      devTools: isDevelopment,
      spellcheck: false,
      nodeIntegration: true
    },
    show: false
  }

  contextMenu({
    showSearchWithGoogle: false,
    showCopyImage: false,
    prepend: (defaultActions, params, browserWindow) => [
      {
        label: 'its like magic 💥'
      }
    ]
  })

  const windowState = windowStateKeeper({
    defaultWidth: windowOptions.minWidth,
    defaultHeight: windowOptions.minHeight
  })

  const browserWindow = new BrowserWindow({
    ...windowOptions,
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height
  })

  windowState.manage(browserWindow)

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
    browserWindow.focus()
  })

  const ptyProcess = pty.spawn(shell, [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30,
    cwd: process.env.HOME,
    env: process.env
  })

  ptyProcess.on('data', function (data) {
    browserWindow.webContents.send('terminal.incomingData', data)
    console.log('Data sent')
  })
  ipcMain.on('terminal.keystroke', (event, key) => {
    ptyProcess.write(key)
  })

  const port = process.env.PORT || 3000

  if (isDevelopment) {
    void browserWindow.loadURL(`http://localhost:${port}`)
  } else {
    void browserWindow.loadFile('./index.html')
  }
}

void app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
