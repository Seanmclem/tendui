import React from 'react';

import { useWindowSize } from '@react-hook/window-size';
import styled from 'styled-components';
import { PackageJsonPage } from '../../pages-soup/package-json/package-json-page';
import { VitePage } from '../../pages-soup/vite-page';
import { MultiTerminalPage } from '../../pages-soup/MultiTerminalPage';

import { Sidebar } from './Sidebar';
import { useMainGuiStore } from '../../stores/main-gui-store';
import { HomePage } from '../../pages-soup/home/HomePage';

const defaultSidebardWidth = 150;

export const MainUI: React.VFC<{}> = () => {
  const [width, height] = useWindowSize();
  const selectedMenuOption = useMainGuiStore((state) => state.selectedMenuOption);

  return (
    <MainUiContainer style={{ height: height - 40 }}>
      <Sidebar sidebarWidth={defaultSidebardWidth} />
      <GuiBody style={{ height: '100%', width: width - defaultSidebardWidth }}>
        <VitePage
          style={{
            display: selectedMenuOption === 'Vite' ? 'initial' : 'none'
          }}
        />
        <MultiTerminalPage
          style={{
            display: selectedMenuOption === 'Terminals' ? 'initial' : 'none'
          }}
        />
        <PackageJsonPage
          style={{
            display: selectedMenuOption === 'package.json' ? 'initial' : 'none'
          }}
        />
        <HomePage
          style={{
            display: selectedMenuOption === 'Home' ? 'initial' : 'none'
          }}
        />
      </GuiBody>
    </MainUiContainer>
  );
};

const MainUiContainer = styled.div`
  display: flex;
  /* height: 30%; */
  /* overflow: hidden; */
  /* height: 100%; */
  /* padding-top: 40px; */
`;

const GuiBody = styled.div`
  overflow-y: scroll;
`;
