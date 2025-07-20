import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMainGuiStore } from '../stores/main-gui-store';
import { TerminalComponent } from '../components/Terminal';
import { TerminalTabs } from '../components/TerminalTabs';

interface MultiTerminalPageProps {
  style: any;
}

export const MultiTerminalPage: React.FC<MultiTerminalPageProps> = ({ style }) => {
  const { terminalInstances, addTerminal, removeTerminal } = useMainGuiStore();

  // Initialize with one terminal if none exist
  useEffect(() => {
    if (terminalInstances.length === 0) {
      addTerminal();
    }
  }, [terminalInstances.length, addTerminal]);

  const handleRemoveTerminal = (terminalId: string) => {
    removeTerminal(terminalId);
  };

  return (
    <Container style={style}>
      <TerminalTabs />
      <TerminalsContainer>
        {terminalInstances.map((terminal) => (
          <TerminalComponent
            key={terminal.id}
            terminalId={terminal.id}
            isActive={terminal.isActive}
            onRemove={handleRemoveTerminal}
            style={{ width: '100%', height: '100%' }}
          />
        ))}
      </TerminalsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1e1e1e;
`;

const TerminalsContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;
