// import React from "react";
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JSONPretty from 'react-json-pretty';

interface props {
  style: any;
}

export const PackageJsonPage: React.FC<props> = ({ style }) => {
  const [isOpen, setOpen] = useState(false);
  const [isSent, setSent] = useState(false);
  const [fromMain, setFromMain] = useState<string | null>(null);

  useEffect(() => {
    console.log('G    sendGoGetFile();    sendGoGetFile();    ');
    // setTimeout(() => {
    sendGoGetFile();
    // }, 1000);
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      setOpen(false);
      setSent(false);
    } else {
      setOpen(true);
      setFromMain(null);
    }
  };
  const sendGoGetFile = () => {
    if (window.Main) {
      window.Main.goGetFile("Hello I'm GETTING FILE???!");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
    setSent(true);
  };

  useEffect(() => {
    if (isSent && window.Main)
      window.Main.on('getFile', (message: string) => {
        setFromMain(message);
      });
  }, [fromMain, isSent]);

  return (
    <Container style={style}>
      <div className=" flex flex-col  h-full  bg-gray-300 space-y-4 overflow-y-scroll">
        <h1 className="text-2xl text-black"> package.json</h1>

        <JSONPretty id="json-pretty" data={fromMain}></JSONPretty>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* background-color: red; */
`;
