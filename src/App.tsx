import React, { useEffect, useState } from 'react';
import AppBar from './AppBar';
import { MainUI } from './areas/main-gui/MainUI';

function App() {
  // console.log(window.ipcRenderer);

  return (
    <div className="flex flex-col h-screen">
      {window.Main && (
        <div className="flex-none">
          <AppBar />
        </div>
      )}
      <div className="flex-auto bg-gray-800">
        <MainUI />
      </div>
    </div>
  );
}

export default App;
