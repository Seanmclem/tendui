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
      <div>Test terminal</div>
      <div id="terminal"></div>
    </div>
  )
}

export default App
