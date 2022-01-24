export const runCommand = (
  command: string,
  ipcRenderer: any,
  enter = false
) => {
  if (enter) {
    ipcRenderer.send('terminal.keystroke', `${command}${`\n`}`)
  } else {
    ipcRenderer.send('terminal.keystroke', `${command}`)
  }
}
