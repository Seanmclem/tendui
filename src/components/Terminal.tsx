import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';
import styled from 'styled-components';

interface TerminalProps {
  terminalId: string;
  isActive: boolean;
  onRemove: (id: string) => void;
  style?: any;
}

export const TerminalComponent: React.FC<TerminalProps> = ({
  terminalId,
  isActive,
  onRemove,
  style
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [term, setTerm] = useState<Terminal | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted && terminalRef.current) {
      setIsMounted(true);

      // Create new terminal instance
      const newTerm = new Terminal({
        cols: 80,
        rows: 30,
        theme: {
          background: '#1e1e1e',
          foreground: '#ffffff'
        }
      });

      // Open terminal in the DOM element
      newTerm.open(terminalRef.current);
      setTerm(newTerm);

      // Create the terminal process on the main process
      window.Main.createTerminal(terminalId);

      // Handle keystrokes
      newTerm.onData((text: string) => {
        console.log('Terminal keystroke:', text);
        window.Main.sendKeystroke(terminalId, text);
      });

      // Listen for incoming data from this specific terminal
      window.Main.on('terminal.incomingData', (data: any) => {
        // Handle both new format (with terminalId) and legacy format
        if (data.terminalId && data.terminalId === terminalId) {
          newTerm.write(data.data);
        } else if (typeof data === 'string') {
          // Legacy format - only write if this is the first/only terminal
          newTerm.write(data);
        }
      });

      // Set up initial environment
      // setTimeout(() => {
      //   window.Main.sendKeystroke(terminalId, 'export TERM=xterm\r');
      // }, 100);
    }
  }, [isMounted, terminalId]);

  useEffect(() => {
    if (term && isActive) {
      // Focus the terminal when it becomes active
      term.focus();
    }
  }, [isActive, term]);

  const handleRemove = () => {
    if (term) {
      term.dispose();
    }
    window.Main.removeTerminal(terminalId);
    onRemove(terminalId);
  };

  return (
    <TerminalContainer
      style={{
        ...style,
        display: isActive ? 'flex' : 'none',
        flexDirection: 'column'
      }}
    >
      <TerminalHeader>
        <TerminalTitle>Terminal {terminalId}</TerminalTitle>
        <RemoveButton onClick={handleRemove}>×</RemoveButton>
      </TerminalHeader>
      <TerminalElement ref={terminalRef} />
    </TerminalContainer>
  );
};

const TerminalContainer = styled.div`
  background-color: #1e1e1e;
  border: 1px solid #333;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
  padding: 8px 12px;
  border-bottom: 1px solid #333;
`;

const TerminalTitle = styled.span`
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;

  &:hover {
    background-color: #ff4444;
  }
`;

const TerminalElement = styled.div`
  flex: 1;
  padding: 8px;
`;
