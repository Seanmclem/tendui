import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { PageTypePicker } from '../components/PageTypePicker';
import { PageTerminals } from '../components/PageTerminals';

interface VitePageProps {
  style: any;
}

export const VitePage: React.FC<VitePageProps> = ({ style }) => {
  const [selectedPageType, setSelectedPageType] = useState('');

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

        {/* <PageTypePicker setSelectedValue={setSelectedPageType} /> */}
      </ContentSection>

      <TerminalSection>
        <PageTerminals pageType="Vite" style={{ height: '100%' }} />
      </TerminalSection>
    </Container>
  );
};

{
  /* <ButtonContainer style={{}}>
          <button onClick={() => runCommand('clear', ipcRenderer, true)}>clear</button>
          <button onClick={() => runCommand('ls', ipcRenderer, true)}>Do LS</button>

          <button onClick={() => runCommand('pwd', ipcRenderer, true)}>PWD</button>

          <button onClick={() => runCommand('nano ~/.zshrc', ipcRenderer, true)}>Edit zsh</button>
          <button onClick={() => runCommand('\b', ipcRenderer)}>backspace</button>

          <button onClick={() => runCommand('\x1b\x5b\x41', ipcRenderer)}>Up Arrow</button>
          <button onClick={() => runCommand('\x1b\x5b\x44', ipcRenderer)}>Left Arrow</button>
          <button onClick={() => runCommand('\x1b\x5b\x43', ipcRenderer)}>Right Arrow</button>

          <button onClick={() => runCommand('\x1b\x5b\x42', ipcRenderer)}>Down Arrow</button>

          <button onClick={() => runCommand('\x20', ipcRenderer)}>space</button>

          <button onClick={() => runCommand('\r', ipcRenderer)}>Enter</button>

          <button onClick={() => runCommand('\x1b', ipcRenderer)}>ESC</button>

          <button onClick={() => runCommand('\x18', ipcRenderer)}>
            command x?
          </button>

          <button onClick={() => createCommand(ipcRenderer)}>creat Vite</button>

          <button onClick={() => setShowTerminal(!showTerminal)}>Toggle Termnal</button>
        </ButtonContainer> */
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #646cff;
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
`;

const FeatureItem = styled.div`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;
