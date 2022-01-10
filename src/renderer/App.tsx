import type * as React from 'react'
import { motion } from 'framer-motion'

import { Terminal } from 'xterm'
import { useEffect, useState } from 'react'

import 'xterm/css/xterm.css'

const { ipcRenderer } = window.require('electron') // red underline, ok for now - Issue: https://github.com/maxstue/vite-reactts-electron-starter/issues/15

const term = new Terminal()

const containerMotion = {
  initial: 'hidden',
  animate: 'visible',
  variants: {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }
}

const runCommand = (command: string, enter = true) => {
  if (enter) {
    ipcRenderer.send('terminal.keystroke', `${command}${`\n`}`)
  } else {
    ipcRenderer.send('terminal.keystroke', `${command}`)
  }
}

function App() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // console.log({ ipcRenderer })

    if (!isMounted) {
      setIsMounted(true)
      if (document.getElementById('terminal')) {
        term.open(document.getElementById('terminal'))

        ipcRenderer.on('terminal.incomingData', (event, data) => {
          term.write(data)
        })

        term.onData((e) => {
          console.log('hit dat?')
          // console.log({ ipcRenderer })
          ipcRenderer.send('terminal.keystroke', e)
        })
      }
    }
  }, [])

  return (
    <div tw="h-screen w-screen flex flex-col pt-12">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <button onClick={() => runCommand('clear')}>clear</button>
        <button onClick={() => runCommand('ls')}>Do LS</button>

        <button onClick={() => runCommand('pwd')}>PWD</button>

        <button onClick={() => runCommand('nano ~/.zshrc')}>Edit zsh</button>
        <button onClick={() => runCommand('\b', false)}>backspace</button>

        <button onClick={() => runCommand('\x1b\x5b\x41', false)}>
          Up Arrow
        </button>
        <button onClick={() => runCommand('\x1b\x5b\x44', false)}>
          Left Arrow
        </button>
        <button onClick={() => runCommand('\x1b\x5b\x43', false)}>
          Right Arrow
        </button>

        <button onClick={() => runCommand('\x1b\x5b\x42', false)}>
          Down Arrow
        </button>

        <button onClick={() => runCommand('\x20', false)}>space</button>

        <button onClick={() => runCommand('\r', false)}>Enter</button>

        <button onClick={() => runCommand('\x1b', false)}>ESC</button>
      </div>
      <div>Test terminal</div>
      <div id="terminal"></div>
    </div>
  )
}

export default App
