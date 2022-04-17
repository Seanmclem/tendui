import React, { useState } from 'react';
import { IoPlayOutline } from 'react-icons/io5';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

interface props {
  type: string;
  script: string;
}

export const ScriptAction: React.FC<props> = ({ type, script }) => {
  const [clicked, set] = useState(false);
  const { scale } = useSpring({ scale: clicked ? 0.7 : 1 });

  const handleRun = () => {
    // run script
  };

  return (
    <Container
      onMouseDown={() => set(true)}
      onMouseUp={() => {
        handleRun();
        set(false);
      }}
      style={{
        // backgroundColor: 'red',
        // height: '100px',
        // width: '100px',
        // color: '#FFF',
        transform: scale.to((s) => `scale(${s})`)
      }}
    >
      <IoPlayOutline />
      <ButtonText>Run</ButtonText>
    </Container>
  );
};

const Container = styled(animated.button)`
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: lightgreen;
  padding: 1px 5px;
  margin: 2px 5px 2px 0px;
`;

const ButtonText = styled.div``;
