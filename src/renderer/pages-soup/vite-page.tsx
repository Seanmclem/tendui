const { ipcRenderer } = window.require('electron')
import { Terminal } from 'xterm'
import { useEffect, useRef, useState } from 'react'
import 'xterm/css/xterm.css'
import styled from 'styled-components'
import { removeColor, runCommand } from '../utils/commander-utils'
import { createCommand } from '../commanders/vite-commander'
import { PageTypePicker } from '../components/PageTypePicker'

//

// move out ^

const term = new Terminal({
  // theme: {
  //   background: '#e9ae0e'
  // }
}) // might need to handle multiple instances per component, one day

interface VitePageProps {}

const manageOutput = (output?: string) => {
  const firstCharacter = output?.charAt(0)
  let result: string | false = false

  switch (firstCharacter) {
    case '?':
      result = 'QUESTION'
      break
    // case '>':
    //   result = 'CHOICES'
    //   break
  }
  console.log(firstCharacter)
  if (output && result === 'QUESTION') {
    const decodedOutput = encodeURI(output)
    const returnChar = '%0A'
    const weirdArrow = '%E2%9D%AF'
    // console.log('decodedOutput', decodedOutput)
    // console.log(`${returnChar}${weirdArrow}`)
    const containsChoices = decodedOutput.includes(`${returnChar}${weirdArrow}`)
    console.log(containsChoices)

    if (containsChoices) {
      result = 'CHOICES'
    }
  }
  // console.log(firstCharacter)

  const currentDialog = {
    dialogType: 'QUESTION', // loading indicators, etc
    currentPromptType: 'CHOICES',
    data: {
      dialogText: "what's the choice",
      currentPromptText: ' 3 choices'
    }
  }

  return result
}

export const VitePage: React.FC<VitePageProps> = () => {
  const lastCommandRef = useRef<string>()
  const [lastOutput, setLastOutput] = useState<string>()

  const [isMounted, setIsMounted] = useState(false)
  const [showTerminal, setShowTerminal] = useState(true)

  // useEffect(() => {
  //   isLastCommand(lastOutput)
  // }, [lastOutput])

  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~hit dis')

    if (!isMounted) {
      // needed?
      setIsMounted(true)
      const terminalDOM = document.getElementById('terminal')
      console.log('hit dis')

      if (terminalDOM) {
        term.open(terminalDOM)

        ipcRenderer.on('terminal.incomingData', (event, data: string) => {
          //console.log('incomingData', removeColor(data))

          setLastOutput(removeColor(data))

          term.write(data)
        })

        // PreExec is output right before command is

        term.onData((e) => {
          console.log('event onData', e)
          ipcRenderer.send('terminal.keystroke', e)
        })
        console.log('hit dat')
        runCommand('export TERM=xterm', ipcRenderer, true)
        //is this right?
        // https://stackoverflow.com/questions/16242025/term-environment-variable-not-set
      }
    }
  }, [])

  const [selectedPageType, setSelectedPageType] = useState('')

  return (
    <Container>
      <Heading>Vite Page</Heading>

      {/* <PageTypePicker setSelectedValue={setSelectedPageType} /> */}

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
      <h3 className="h-3 bg-white">{`Last Promt: ${
        manageOutput(lastOutput) || 'none'
      }`}</h3>
      <div
        id="terminal"
        style={{
          display: showTerminal ? 'initial' : 'none'
          // width: '100px'
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
