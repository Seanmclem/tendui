import React from 'react';
import styled from 'styled-components';
import { useMainGuiStore } from '../stores/main-gui-store';

export const TerminalTabs: React.FC = () => {
  const { terminalInstances, addTerminal, setActiveTerminal, removeTerminal } = useMainGuiStore();

  const handleTabClick = (terminalId: string) => {
    setActiveTerminal(terminalId);
  };

  const handleAddTerminal = () => {
    addTerminal();
  };

  return (
    <TabsContainer>
      <TabsList>
        {terminalInstances.map((terminal) => (
          <TabItem
            key={terminal.id}
            isActive={terminal.isActive}
            onClick={() => handleTabClick(terminal.id)}
          >
            <TabTitle>{terminal.name}</TabTitle>
            <TabCloseButton
              onClick={(e) => {
                e.stopPropagation();
                removeTerminal(terminal.id);
              }}
            >
              ×
            </TabCloseButton>
          </TabItem>
        ))}
        <AddTabButton onClick={handleAddTerminal}>+</AddTabButton>
      </TabsList>
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  background-color: #2d2d2d;
  border-bottom: 1px solid #333;
`;

const TabsList = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 40px;
`;

const TabItem = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  margin-right: 2px;
  background-color: ${(props) => (props.isActive ? '#1e1e1e' : '#3d3d3d')};
  color: #ffffff;
  cursor: pointer;
  border-radius: 4px 4px 0 0;
  border: 1px solid ${(props) => (props.isActive ? '#555' : '#333')};
  border-bottom: none;
  min-width: 120px;
  max-width: 200px;
  height: 32px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#1e1e1e' : '#4d4d4d')};
  }
`;

const TabTitle = styled.span`
  flex: 1;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TabCloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  margin-left: 8px;

  &:hover {
    background-color: #ff4444;
    color: #ffffff;
  }
`;

const AddTabButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 18px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  margin-left: 4px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #4d4d4d;
    color: #ffffff;
  }
`;
