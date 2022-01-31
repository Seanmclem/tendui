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

export const removeColor = (stringWithColor: string) =>
  stringWithColor.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  )
