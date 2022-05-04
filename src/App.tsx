import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import AppBar from './AppBar';
import { MainUI } from './areas/main-gui/MainUI';

function App() {
  // console.log(window.ipcRenderer);

  return (
    <AppContianer>
      {window.Main && (
        <AppBarContianer>
          <AppBar />
        </AppBarContianer>
      )}
      <MainUIContianer>
        <MainUI />
      </MainUIContianer>
    </AppContianer>
  );
}

export default App;

const AppContianer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const AppBarContianer = styled.div`
  flex: none;
`;

const MainUIContianer = styled.div`
  flex: 1 1 auto;
`;
