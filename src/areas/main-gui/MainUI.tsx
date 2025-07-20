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
            display: selectedMenuOption === 'Vite' ? 'flex' : 'none',
            height: '100%'
          }}
        />
        <AstroPage
          style={{
            display: selectedMenuOption === 'Astro' ? 'flex' : 'none',
            height: '100%'
          }}
        />
        <PackageJsonPage
          style={{
            display: selectedMenuOption === 'package.json' ? 'flex' : 'none',
            height: '100%'
          }}
        />
        <HomePage
          style={{
            display: selectedMenuOption === 'Home' ? 'flex' : 'none',
            height: '100%'
          }}
        />
      </PageContent>
    </MainUiContainer>
  );
};

const MainUiContainer = styled.div`
  display: flex;
  height: 100%;
  background-color: #f0f0f0;
`;

const PageContent = styled.div`
  flex: 1;
  overflow: visible;
  background-color: #e0e0e0;
`;
