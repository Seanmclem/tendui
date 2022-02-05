import { runCommand } from '../utils/commander-utils'

export const createCommand = (ipcRenderer: any) => {
  runCommand('yarn create vite', ipcRenderer, true)
  // runCommand('npm init vite@latest', ipcRenderer, true)

  // ^^ Need to test handling npm?
  // NOPE that, just force yarn. Install the global dependency if missing
}
