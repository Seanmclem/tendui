import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { PageTypePicker } from '../components/PageTypePicker';
import { PageTerminals } from '../components/PageTerminals';
import { useMainGuiStore } from '../stores/main-gui-store';
import { runCommand } from '../utils/commander-utils';

interface VitePageProps {
  style: any;
}

export const VitePage: React.FC<VitePageProps> = ({ style }) => {
  const [selectedPageType, setSelectedPageType] = useState('');
  const { getActiveTerminal, getTerminalsForPage, setActiveTerminal } = useMainGuiStore();

  // Get the active terminal for this page
  const activeTerminal = getActiveTerminal('Vite');

  // Get ALL terminals for this page
  const allViteTerminals = getTerminalsForPage('Vite');

  const handleRunCommand = (command: string) => {
    if (activeTerminal) {
      runCommand(activeTerminal.id, command, true);
    } else {
      console.log('No active terminal found for Vite page');
    }
  };

  const handleRunCommandOnTerminal = (terminalId: string, command: string) => {
    runCommand(terminalId, command, true);
  };

  const handleSwitchTerminal = (terminalId: string) => {
    setActiveTerminal(terminalId);
  };

  console.log('VitePage rendering, style:', style);

  return (
    <Container style={style}>
      <ContentSection>
        <Heading>Vite Page</Heading>
        <Description>
          This is the Vite development page. Use the terminals below to run Vite commands.
        </Description>

        <FeatureList>
          <FeatureItem>• Create new Vite projects</FeatureItem>
          <FeatureItem>• Run development server</FeatureItem>
          <FeatureItem>• Build for production</FeatureItem>
          <FeatureItem>• Install dependencies</FeatureItem>
        </FeatureList>

        {/* Example buttons showing how to use terminal ID */}
        <ButtonContainer>
          <button onClick={() => handleRunCommand('clear')}>Clear Active Terminal</button>
          <button onClick={() => handleRunCommand('ls')}>List Files</button>
          <button onClick={() => handleRunCommand('pwd')}>Show Current Directory</button>
          <button onClick={() => handleRunCommand('echo "Hello from Vite page!"')}>
            Echo Message
          </button>
        </ButtonContainer>

        {/* Multiple Terminal Management */}
        <TerminalManagementSection>
          <h3>Terminal Management</h3>
          <p>Active Terminal: {activeTerminal?.name || 'None'}</p>

          <TerminalList>
            {allViteTerminals.map((terminal) => (
              <TerminalItem key={terminal.id} isActive={terminal.isActive}>
                <TerminalInfo>
                  <span>{terminal.name}</span>
                  <span className="terminal-id">{terminal.id}</span>
                </TerminalInfo>
                <TerminalActions>
                  <button
                    onClick={() => handleSwitchTerminal(terminal.id)}
                    disabled={terminal.isActive}
                  >
                    {terminal.isActive ? 'Active' : 'Switch to'}
                  </button>
                  <button
                    onClick={() =>
                      handleRunCommandOnTerminal(
                        terminal.id,
                        'echo "Command sent to ' + terminal.name + '"'
                      )
                    }
                  >
                    Send Command
                  </button>
                </TerminalActions>
              </TerminalItem>
            ))}
          </TerminalList>
        </TerminalManagementSection>

        {/* Debug info - you can remove this */}
        <DebugInfo>
          Active Terminal ID: {activeTerminal?.id || 'None'}
          <br />
          Total Vite Terminals: {allViteTerminals.length}
        </DebugInfo>

        {/* <PageTypePicker setSelectedValue={setSelectedPageType} /> */}
      </ContentSection>

      <TerminalSection>
        <PageTerminals pageType="Vite" style={{ height: '100%' }} />
      </TerminalSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #646cff;
  color: white;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #646cff;
`;

const TerminalSection = styled.div`
  height: 300px;
  border-top: 1px solid #333;
  background-color: #1e1e1e;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #ffffff;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const FeatureList = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;
`;

const FeatureItem = styled.div`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  button {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const TerminalManagementSection = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 20px;

  h3 {
    color: #ffffff;
    margin-bottom: 10px;
  }

  p {
    color: #ffffff;
    margin-bottom: 15px;
  }
`;

const TerminalList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TerminalItem = styled.div<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid
    ${(props) => (props.isActive ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)')};
  padding: 15px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TerminalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  span {
    color: #ffffff;
    font-size: 14px;

    &.terminal-id {
      font-family: monospace;
      font-size: 12px;
      opacity: 0.7;
    }
  }
`;

const TerminalActions = styled.div`
  display: flex;
  gap: 8px;

  button {
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;

    &:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

const DebugInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  margin-bottom: 20px;
`;
