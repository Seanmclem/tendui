import { runCommand } from '../utils/commander-utils'

export const createCommand = (ipcRenderer: any) => {
  runCommand('yarn create vite', ipcRenderer, true)
}
