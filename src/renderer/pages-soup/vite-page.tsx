const { ipcRenderer } = window.require('electron')
import { Terminal } from 'xterm'
import { useEffect, useState } from 'react'
import 'xterm/css/xterm.css'
import styled from 'styled-components'
import { runCommand } from '../utils/commander-utils'
import { createCommand } from '../commanders/vite-commander'

//

// move out ^

const term = new Terminal() // might need to handle multiple instances per component, one day

interface VitePageProps {}

export const VitePage: React.FC<VitePageProps> = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)

  useEffect(() => {
    // console.log({ ipcRenderer })

    if (!isMounted) {
      setIsMounted(true)
      if (document.getElementById('terminal')) {
        term.open(document.getElementById('terminal'))

        ipcRenderer.on('terminal.incomingData', (event, data: string) => {
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
    <Container>
      <Heading>Vite Page</Heading>
      <ButtonContainer style={{}}>
        <button onClick={() => runCommand('clear', ipcRenderer, true)}>
          clear
        </button>
        <button onClick={() => runCommand('ls', ipcRenderer, true)}>
          Do LS
        </button>

        <button onClick={() => runCommand('pwd', ipcRenderer, true)}>
          PWD
        </button>

        <button onClick={() => runCommand('nano ~/.zshrc', ipcRenderer, true)}>
          Edit zsh
        </button>
        <button onClick={() => runCommand('\b', ipcRenderer)}>backspace</button>

        <button onClick={() => runCommand('\x1b\x5b\x41', ipcRenderer)}>
          Up Arrow
        </button>
        <button onClick={() => runCommand('\x1b\x5b\x44', ipcRenderer)}>
          Left Arrow
        </button>
        <button onClick={() => runCommand('\x1b\x5b\x43', ipcRenderer)}>
          Right Arrow
        </button>

        <button onClick={() => runCommand('\x1b\x5b\x42', ipcRenderer)}>
          Down Arrow
        </button>

        <button onClick={() => runCommand('\x20', ipcRenderer)}>space</button>

        <button onClick={() => runCommand('\r', ipcRenderer)}>Enter</button>

        <button onClick={() => runCommand('\x1b', ipcRenderer)}>ESC</button>

        <button onClick={() => runCommand('\x18', ipcRenderer)}>
          command x?
          {/* Need one with Ctyl+C too */}
        </button>

        <button onClick={() => createCommand(ipcRenderer)}>creat Vite</button>

        <button onClick={() => setShowTerminal(!showTerminal)}>
          Toggle Termnal
        </button>
      </ButtonContainer>
      <div
        id="terminal"
        style={{
          display: showTerminal ? 'initial' : 'none'
        }}
      ></div>
      {/* ^^Do something special with this */}
    </Container>
  )
}

const Container = styled.div``

const ButtonContainer = styled.div`
  background-color: gray;
  display: flex;
  flex-wrap: wrap;
  button {
    background-color: orange;
    margin: 3px;
    padding: 3px;
  }
`

const Heading = styled.h1`
  font-size: 2rem;
  color: lightgray;
`
