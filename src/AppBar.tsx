import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from './assets/icons/Icon-Electron.png';

function AppBar() {
  const [isMaximize, setMaximize] = useState(false);

  const handleToggle = () => {
    if (isMaximize) {
      setMaximize(false);
    } else {
      setMaximize(true);
    }
    window.Main.Maximize();
  };

  return (
    <>
      <One1 className="draggable">
        <div style={{ display: 'inline-flex' }}>
          <Img2 src={Icon} alt="Icon of Electron" />
          <Heading3>Vite App</Heading3>
        </div>
        <One4>
          <Button5 onClick={window.Main.Minimize} className="undraggable ">
            &#8211;
          </Button5>
          <Button6 onClick={handleToggle} className="undraggable ">
            {isMaximize ? '\u2752' : '⃞'}
          </Button6>
          <Button7 onClick={window.Main.Close} className="undraggable ">
            &#10005;
          </Button7>
        </One4>
      </One1>
      {/* <div className="bg-gray-900 text-white undraggable">
        <div className="flex text-center">
          <div className="text-sm w-8  hover:bg-gray-700">File</div>
          <div className="text-sm w-8   hover:bg-gray-700">Edit</div>
          <div className="text-sm w-10  hover:bg-gray-700">View</div>
          <div className="text-sm w-14  hover:bg-gray-700 ">Window</div>
          <div className="text-sm w-9  hover:bg-gray-700 ">Help</div>
        </div>
      </div> */}
    </>
  );
}

export default AppBar;

const One1 = styled.div`
  display: flex;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  display: flex;
  justify-content: space-between;
`;
const Img2 = styled.img`
  height: 1.5rem;

  @media (min-width: 1024px) {
    margin-left: -0.5rem;
  }
`;

const Heading3 = styled.p`
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;

  @media (min-width: 768px) {
    padding-top: 0.25rem;
    margin-left: -0.25rem;
  }
  @media (min-width: 1024px) {
    margin-left: -0.5rem;
  }
`;

const One4 = styled.div`
  display: inline-flex;
  margin-top: -0.25rem;
  display: inline-flex;
`;

const Button5 = styled.div`
  padding-top: 0.25rem;

  @media (min-width: 768px) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  @media (min-width: 1024px) {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
`;

const Button6 = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0.25rem;

  @media (min-width: 1024px) {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }
`;
const Button7 = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.25rem;
`;
