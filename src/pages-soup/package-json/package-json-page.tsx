// import React from "react";
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import JSONPretty from 'react-json-pretty';
import { JsonSection } from './JsonSection';
import { PageTypePicker, Segment } from '../../components/PageTypePicker';
import { ScriptsTab } from './ScriptsTab';

interface props {
  style: any;
}

export const PackageJsonPage: React.FC<props> = ({ style }) => {
  const [fromMain, setFromMain] = useState<string | null>(null);

  const [packaheJsonJson, setPackageJsonJson] = useState<any>({});
  const [highLevelKeys, setHighLevelKeys] = useState<string[]>([]);

  useEffect(() => {
    if (window.Main) {
      window.Main.on('getFile', (message: string) => {
        setFromMain(message);
        getJsonFromString(message);
      });
    }
    sendGoGetFile();
  }, []);

  const sendGoGetFile = () => {
    if (window.Main) {
      window.Main.goGetFile("Hello I'm GETTING FILE???!");
    } else {
      setFromMain('You are in a Browser, so no Electron functions are available');
    }
  };

  const getJsonFromString = (inputPoo: string) => {
    const daJson = JSON.parse(inputPoo);
    setHighLevelKeys(Object.keys(daJson));
    setPackageJsonJson(daJson);
    console.log(daJson);
  };

  const [selectedPageType, setSelectedPageType] = useState('edit-all');

  const segments: Segment[] = [
    {
      label: 'Edit/All',
      value: 'edit-all',
      ref: useRef()
    },
    {
      label: 'Scripts',
      value: 'scripts',
      ref: useRef()
    },
    {
      label: 'Dependencies',
      value: 'dependencies',
      ref: useRef()
    }
  ];

  return (
    <Container style={style}>
      <div className=" flex flex-col  h-full  bg-gray-300 space-y-4 overflow-y-scroll">
        <h1 className="text-2xl text-black"> package.json</h1>

        <PageTypePicker segments={segments} setSelectedValue={setSelectedPageType} />
        {/* ALL */}
        <div style={{ display: selectedPageType === 'edit-all' ? 'initial' : 'none' }}>
          {highLevelKeys && packaheJsonJson
            ? highLevelKeys.map((highLevelKey) => (
                <JsonSection
                  key={highLevelKey}
                  topProperty={highLevelKey}
                  values={packaheJsonJson[highLevelKey]}
                />
              ))
            : null}
        </div>

        {/* SCRIPTS */}
        <ScriptsTab selectedPageType={selectedPageType} packaheJsonJson={packaheJsonJson} />
        {/* <div style={{ display: selectedPageType === 'scripts' ? 'initial' : 'none' }}>
          <JsonSection topProperty={'scripts'} values={packaheJsonJson['scripts']} />
        </div> */}

        {/* DEPENDENCIES */}
        <div style={{ display: selectedPageType === 'dependencies' ? 'initial' : 'none' }}>
          <JsonSection topProperty={'dependencies'} values={packaheJsonJson['dependencies']} />
        </div>

        <JSONPretty id="json-pretty" data={fromMain}></JSONPretty>
      </div>
    </Container>
  );
};

const Container = styled.div`
  /* background-color: red; */
`;
