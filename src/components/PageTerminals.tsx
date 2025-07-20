import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useMainGuiStore } from '../stores/main-gui-store';
import { TerminalComponent } from './Terminal';
import { TerminalTabs } from './TerminalTabs';

interface PageTerminalsProps {
  pageType: string;
  style?: any;
}

export const PageTerminals: React.FC<PageTerminalsProps> = ({ pageType, style }) => {
  const { getTerminalsForPage, addTerminal, removeTerminal } = useMainGuiStore();

  const terminalInstances = getTerminalsForPage(pageType);

  // Initialize with one terminal if none exist for this page
  useEffect(() => {
    if (terminalInstances.length === 0) {
      addTerminal(pageType);
    }
  }, [terminalInstances.length, addTerminal, pageType]);

  const handleRemoveTerminal = (terminalId: string) => {
    removeTerminal(terminalId);
  };

  const handleAddTerminal = () => {
    addTerminal(pageType);
  };

  return (
    <Container style={style}>
      <TerminalTabs
        terminalInstances={terminalInstances}
        onAddTerminal={handleAddTerminal}
        onRemoveTerminal={handleRemoveTerminal}
      />
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
