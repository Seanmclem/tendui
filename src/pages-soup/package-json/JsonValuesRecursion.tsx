import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JsonSection } from './JsonSection';

interface props {
  values: any;
}

// TODO: replace
export const JsonValuesRecursion: React.FC<props> = ({ values }) => {
  if (typeof values === 'string' || typeof values === 'number') {
    // STRING -or- NUMBER
    return <input type="text" value={values} onChange={() => null} />;
  } else if (typeof values === 'boolean') {
    // BOOLEAN
    return (
      <input
        type={'checkbox'}
        checked={values}
        // onChange={() => setvalues(!values)} // does it work? /// ... TODO: bubble up
      />
    );
  } else if (typeof values?.length === 'number') {
    // ARRAY
    return (
      <ArrayList>
        {values.map((theValue: any) => (
          <JsonValuesRecursion key={theValue} values={theValue} />
        ))}
      </ArrayList>
    );
  } else if (typeof values === 'object') {
    // OBJECT
    const theKeys = Object.keys(values);
    // console.log('theKeys', theKeys);

    return (
      <>
        {theKeys.map((highLevelKey) => (
          <JsonSection
            key={highLevelKey}
            topProperty={highLevelKey}
            values={values[highLevelKey]}
          />
        ))}
      </>
    );
  } else {
    return null;
  }
};

const ArrayList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 240px;
`;
