export const runCommand = (termUid: string, command: string, enter = false) => {
  const fn = window.Main.sendKeystroke;
  if (enter) {
    fn(termUid, `${command}${`\n`}`);
  } else {
    fn(termUid, `${command}`);
  }
};

{
  /* <ButtonContainer style={{}}>
          <button onClick={() => runCommand('clear', ipcRenderer, true)}>clear</button>
          <button onClick={() => runCommand('ls', ipcRenderer, true)}>Do LS</button>

          <button onClick={() => runCommand('pwd', ipcRenderer, true)}>PWD</button>

          <button onClick={() => runCommand('nano ~/.zshrc', ipcRenderer, true)}>Edit zsh</button>
          <button onClick={() => runCommand('\b', ipcRenderer)}>backspace</button>

          <button onClick={() => runCommand('\x1b\x5b\x41', ipcRenderer)}>Up Arrow</button>
          <button onClick={() => runCommand('\x1b\x5b\x44', ipcRenderer)}>Left Arrow</button>
          <button onClick={() => runCommand('\x1b\x5b\x43', ipcRenderer)}>Right Arrow</button>

          <button onClick={() => runCommand('\x1b\x5b\x42', ipcRenderer)}>Down Arrow</button>

          <button onClick={() => runCommand('\x20', ipcRenderer)}>space</button>

          <button onClick={() => runCommand('\r', ipcRenderer)}>Enter</button>

          <button onClick={() => runCommand('\x1b', ipcRenderer)}>ESC</button>

          <button onClick={() => runCommand('\x18', ipcRenderer)}>
            command x?
          </button>

          <button onClick={() => createCommand(ipcRenderer)}>creat Vite</button>

          <button onClick={() => setShowTerminal(!showTerminal)}>Toggle Termnal</button>
        </ButtonContainer> */
}

export const removeColor = (stringWithColor: string) =>
  stringWithColor.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
