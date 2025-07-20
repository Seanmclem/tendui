import React from 'react';

import { useWindowSize } from '@react-hook/window-size';
import styled from 'styled-components';
import { PackageJsonPage } from '../../pages-soup/package-json/package-json-page';
import { VitePage } from '../../pages-soup/vite-page';
import { AstroPage } from '../../pages-soup/astro-page';

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
      <PageContent style={{ width: width - defaultSidebardWidth }}>
        <VitePage
          style={{
            display: selectedMenuOption === 'Vite' ? 'initial' : 'none'
          }}
        />
        <AstroPage
          style={{
            display: selectedMenuOption === 'Astro' ? 'initial' : 'none'
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
      </PageContent>
    </MainUiContainer>
  );
};

const MainUiContainer = styled.div`
  display: flex;
  height: 100%;
`;

const PageContent = styled.div`
  flex: 1;
  overflow: hidden;
`;
