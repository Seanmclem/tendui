import React, { useCallback, useState } from 'react';
import { IoPlayOutline, IoHeart } from 'react-icons/io5';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';
import { IconType } from 'react-icons';

interface props {
  type: TheType;
  script: string;
}

type TheType = 'run' | 'favorite';

interface ButtonConfig {
  color: string;
  text: string;
  icon: any;
  action: (...agrs: any[]) => any;
}

export const ScriptAction: React.FC<props> = ({ type, script }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const { scale } = useSpring({ scale: buttonClicked ? 0.7 : 1 });

  const buttonConfig = useCallback(() => {
    return {
      run: { color: 'lightgreen', icon: <IoPlayOutline />, text: 'Run', action: () => null },
      favorite: {
        color: 'pink',
        text: 'favorite',
        icon: <IoHeart />,
        action: () => null
      }
    } as Record<TheType, ButtonConfig>;
  }, []);

  const handleRun = () => {
    // run script
  };

  const config = buttonConfig();

  return (
    <Container
      theColor={config[type].color}
      onMouseDown={() => setButtonClicked(true)}
      onMouseUp={() => {
        handleRun();
        setButtonClicked(false);
      }}
      style={{
        // backgroundColor: 'red',
        // height: '100px',
        // width: '100px',
        // color: '#FFF',
        transform: scale.to((s) => `scale(${s})`)
      }}
    >
      {/* <IoPlayOutline /> */}
      {config[type].icon}
      <ButtonText>{config[type].text}</ButtonText>
    </Container>
  );
};

const Container = styled(animated.button)<{ theColor: string }>`
  font-size: 14px;
  display: flex;
  align-items: center;
  background-color: ${({ theColor }) => theColor};
  padding: 1px 5px;
  margin: 2px 5px 2px 0px;
`;

const ButtonText = styled.div``;
