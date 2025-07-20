import React from 'react';
import styled from 'styled-components';
import { PageTerminals } from '../components/PageTerminals';
import { useMainGuiStore } from '../stores/main-gui-store';
import { runCommand } from '../utils/commander-utils';

interface AstroPageProps {
  style: any;
}

export const AstroPage: React.FC<AstroPageProps> = ({ style }) => {
  const { getActiveTerminal } = useMainGuiStore();

  // Get the active terminal for this page
  const activeTerminal = getActiveTerminal('Astro');

  const handleRunCommand = (command: string) => {
    if (activeTerminal) {
      runCommand(activeTerminal.id, command, true);
    } else {
      console.log('No active terminal found for Astro page');
    }
  };

  return (
    <Container style={style}>
      <ContentSection>
        <Heading>Astro Page</Heading>
        <Description>
          This is the Astro development page. You can use the terminals below to run Astro commands.
        </Description>

        <FeatureList>
          <FeatureItem>• Create new Astro projects</FeatureItem>
          <FeatureItem>• Run development server</FeatureItem>
          <FeatureItem>• Build for production</FeatureItem>
          <FeatureItem>• Install dependencies</FeatureItem>
        </FeatureList>

        {/* Example buttons showing how to use terminal ID */}
        <ButtonContainer>
          <button onClick={() => handleRunCommand('clear')}>Clear Terminal</button>
          <button onClick={() => handleRunCommand('ls')}>List Files</button>
          <button onClick={() => handleRunCommand('pwd')}>Show Current Directory</button>
          <button onClick={() => handleRunCommand('echo "Hello from Astro page!"')}>
            Echo Message
          </button>
        </ButtonContainer>

        {/* Debug info - you can remove this */}
        <DebugInfo>Active Terminal ID: {activeTerminal?.id || 'None'}</DebugInfo>
      </ContentSection>

      <TerminalSection>
        <PageTerminals pageType="Astro" style={{ height: '100%' }} />
      </TerminalSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1a1a2e;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const TerminalSection = styled.div`
  height: 300px;
  border-top: 1px solid #333;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #cccccc;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const FeatureList = styled.div`
  background-color: #16213e;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
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
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const DebugInfo = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  margin-bottom: 20px;
`;
