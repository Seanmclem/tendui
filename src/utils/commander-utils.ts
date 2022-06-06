export const runCommand = (command: string, enter = false) => {
  const fn = window.Main.sendKeystroke;
  if (enter) {
    fn(`${command}${`\n`}`);
  } else {
    fn(`${command}`);
  }
};

export const removeColor = (stringWithColor: string) =>
  stringWithColor.replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
