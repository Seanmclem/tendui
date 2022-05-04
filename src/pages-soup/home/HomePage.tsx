import React from 'react';

// const { ipcRenderer } = window.require('electron');
import { Terminal } from 'xterm';
import { useEffect, useRef, useState } from 'react';
import 'xterm/css/xterm.css';
import styled from 'styled-components';
import { StandardContainer } from '../../components/common/styled-generic';
import { CreateProjetDialogForm } from './CreateProjetDialogForm';
import { CONFIG_FILE_NAME } from '../../constants-types/generic-constants';
// import { CreateFilePayload } from '../../constants-types/generic-types';

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
  const [projectRootName, setProjectRootName] = useState<string>('');
  const [directoryContents, setDirectoryContents] = useState<string[]>([]);
  const [openedCreateConfig_Dialog, setOpenedCreateConfig_Dialog] = useState(false);

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

    // if (modal?.current) {
    //   modal.current?.showModal();
    // }
  }, []);

  useEffect(() => {
    if (window.Main) {
      window.Main.on(
        'getFolderResponse',
        ({
          selectedFolderPath,
          contents
        }: {
          selectedFolderPath?: string;
          contents?: string[];
        }) => {
          if (selectedFolderPath && contents?.length && Array.isArray(contents)) {
            setProjectRootPath(selectedFolderPath);
            setDirectoryContents(contents);
            setProjectRootName(
              selectedFolderPath.split('/')[selectedFolderPath.split('/').length - 1] || ''
            );
          }
        }
      );

      window.Main.on('saveFileResponse', (responsePayload: string) => {
        console.log(responsePayload);
        sendGoGetFolder(); // update, to show if we have it or not
      });
    }
  }, []);

  //
  const sendGoGetFolder = () => {
    // native-1
    console.log('ONE !');
    window.Main.goGetFolder("Hello I'm GETTING FolDEr???!");
  };

  const handleCreateConfigFile = (values: { projectName: string }) => {
    // here, use this to do the config creation, need ipc etc whatever

    const payload: any = {
      contents: values,
      path: `${projectRootPath}/${CONFIG_FILE_NAME}`
    };
    window.Main.saveFilePlease(payload);
    console.log(payload);
  };

  return (
    <Container style={{ display: style.display }}>
      <Heading>Home Page</Heading>
      <CreateProjetDialogForm
        showModal={openedCreateConfig_Dialog}
        setShowModal={setOpenedCreateConfig_Dialog}
        projectRootName={projectRootName}
        handleCreateConfigFile={handleCreateConfigFile}
      />
      <InnerContainer>
        {projectRootPath ? (
          <ul>
            <li>Project folder: {projectRootPath || 'NONE'}</li>
            <li>Has Package.json?: {directoryContents.includes('package.json').toString()}</li>
          </ul>
        ) : (
          <label>
            Project folder: NONE <button onClick={sendGoGetFolder}>Open project folder</button>
          </label>
        )}

        {projectRootPath ? (
          <ul>
            {directoryContents.includes(CONFIG_FILE_NAME) ? (
              <li>
                Has project config file: {CONFIG_FILE_NAME} {/* Make into link for detail idk */}
              </li>
            ) : (
              <li>
                <button onClick={() => setOpenedCreateConfig_Dialog(true)}>
                  Create Project file
                </button>
              </li>
            )}
          </ul>
        ) : null}

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

  color: black;
`;
