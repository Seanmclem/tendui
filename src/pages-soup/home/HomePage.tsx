import React from 'react';

// const { ipcRenderer } = window.require('electron');
import { Terminal } from 'xterm';
import { useEffect, useRef, useState } from 'react';
import 'xterm/css/xterm.css';
import styled from 'styled-components';
import { StandardContainer } from '../../components/common/styled-generic';
import { CreateProjetDialogForm } from './CreateProjetDialogForm';
import { CONFIG_FILE_NAME } from '../../constants-types/generic-constants';
import { useProjectStore } from '../../stores/project-store';
import { CreateFilePayload } from '../../constants-types/generic-types';

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

  const projectConfig = useProjectStore((x) => x.projectConfig);
  const updateProjectConfig = useProjectStore((x) => x.updateProjectConfig);

  const [projectRootPath, setProjectRootPath] = useState<string>(
    projectConfig?.selectedProject || ''
  );
  const [projectRootName, setProjectRootName] = useState<string>('');
  const [directoryContents, setDirectoryContents] = useState<string[]>([]);
  const [openedCreateConfig_Dialog, setOpenedCreateConfig_Dialog] = useState(false);

  useEffect(() => {
    // localStorage.setItem('data', JSON.stringify({ test: '123' }));
    // const cat = localStorage.getItem('myCat');
    console.log('projectConfig', projectConfig);
    console.log({ projectRootPath });

    if (projectRootPath) {
      window.Main.goGetSpecificFolder(projectRootPath);
    }
  }, [projectConfig]);

  useEffect(() => {
    // mount terminal(s?)
    if (!isMounted) {
      // needed? ^v
      setIsMounted(true);
      const terminalDOM = document.getElementById('terminal');
      console.log('hit dis');

      if (terminalDOM) {
        term.open(terminalDOM);
      }
    }
  }, []);

  useEffect(() => {
    // establish event-listeners for node-callbacks
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

            // up[date state]
            const priorProjects =
              typeof projectConfig?.recentProjects?.length === 'number'
                ? [...projectConfig.recentProjects]
                : [];
            const updatedRecentProjects = [selectedFolderPath, ...priorProjects];
            if (updatedRecentProjects.length > 5) {
              updatedRecentProjects.length = 5;
            }
            updateProjectConfig({
              selectedProject: selectedFolderPath,
              recentProjects: updatedRecentProjects
            });
          }
        }
      );

      window.Main.on('saveFileResponse', (responsePayload: string) => {
        // sendGoGetFolder(); // update, to show if we have it or not
      });

      window.Main.on('goGetSpecificFolder_Response', (responsePayload) => {
        if (responsePayload?.contents && typeof responsePayload.contents?.length === 'number') {
          setDirectoryContents(responsePayload.contents);
        }
      });
    }
  }, []);

  const sendGoGetFolder = () => {
    window.Main.goGetFolderOpenDialg();
  };

  const sendSaveFilePlease = (values: { projectName: string }) => {
    const payload: CreateFilePayload = {
      contents: values,
      path: `${projectRootPath}/${CONFIG_FILE_NAME}`
    };
    window.Main.saveFilePlease(payload);
  };

  return (
    <Container style={{ display: style.display }}>
      <Heading>Home Page</Heading>
      <CreateProjetDialogForm
        showModal={openedCreateConfig_Dialog}
        setShowModal={setOpenedCreateConfig_Dialog}
        projectRootName={projectRootName}
        handleCreateConfigFile={sendSaveFilePlease}
      />
      <InnerContainer>
        {projectRootPath ? (
          <ul>
            <li>
              <button onClick={sendGoGetFolder}>Pick New Project</button>
            </li>
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

        <ul>
          {projectConfig?.recentProjects
            ? projectConfig?.recentProjects
                .filter((x) => x !== projectRootPath)
                .map((recentProject) => <li>{recentProject}</li>)
            : null}
        </ul>

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
