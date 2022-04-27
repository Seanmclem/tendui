import React from 'react';

// const { ipcRenderer } = window.require('electron');
import { Terminal } from 'xterm';
import { useEffect, useRef, useState } from 'react';
import 'xterm/css/xterm.css';
import styled from 'styled-components';
import { StandardContainer } from '../../components/common/styled-generic';

const term = new Terminal({
  // theme: {
  //   background: '#e9ae0e'
  // }
}); // might need to handle multiple instances per component, one day

interface HomePageProps {
  style: any;
}

export const HomePage: React.FC<HomePageProps> = ({ style }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [showTerminal, setShowTerminal] = useState(true);

  const [projectRootPath, setProjectRootPath] = useState<string>('');
  const [directoryContents, setDirectoryContents] = useState<string[]>([]);

  useEffect(() => {
    if (!isMounted) {
      // needed?
      setIsMounted(true);
      const terminalDOM = document.getElementById('terminal');
      console.log('hit dis');

      if (terminalDOM) {
        term.open(terminalDOM);
      }
    }
  }, []);

  useEffect(() => {
    if (window.Main) {
      window.Main.on('getFolderResponse', ({ selectedFolderPath, contents }) => {
        if (selectedFolderPath && contents?.length && Array.isArray(contents)) {
          setProjectRootPath(selectedFolderPath);
          setDirectoryContents(contents);
        }
      });
    }
  }, []);

  //
  const sendGoGetFolder = () => {
    // native-1
    console.log('ONE !');
    window.Main.goGetFolder("Hello I'm GETTING FolDEr???!");
  };

  return (
    <Container style={{ display: style.display }}>
      <Heading>Home Page</Heading>

      <InnerContainer>
        {projectRootPath ? (
          <ul>
            <li>Project folder: {projectRootPath || 'NONE'}</li>
            <li>Has Package.json {directoryContents.includes('package.json').toString()}</li>
          </ul>
        ) : (
          <label>
            Project folder: NONE <button onClick={sendGoGetFolder}>Open project folder</button>
          </label>
        )}

        {directoryContents?.length ? (
          <details>
            <summary>Project-folder contents</summary>
            {directoryContents.map((dirfile) => (
              <p key={dirfile}>{dirfile}</p>
            ))}
          </details>
        ) : null}

        {/* <div
        id="terminal"
        style={{
          display: showTerminal ? 'initial' : 'none'
        }}
      ></div> */}
        {/* ^^Do something special with this */}
      </InnerContainer>
    </Container>
  );
};

const Container = styled.div`
  /* background-color: white;
  height: 100%; */
`;

const InnerContainer = styled(StandardContainer)`
  background-color: lightblue;
  height: 100%;
`;

const Heading = styled.h1`
  font-size: 2rem;

  color: white;
`;
