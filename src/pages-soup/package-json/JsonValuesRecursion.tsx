import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JsonSection } from './JsonSection';

export const JsonValuesRecursion = (values: any) => {
  // console.log('type', values);

  const [theRealJsonValue] = useState(values?.values);

  const [booleanValue, setBooleanValue] = useState(theRealJsonValue);

  if (typeof theRealJsonValue === 'string' || typeof theRealJsonValue === 'number') {
    // STRING -or- NUMBER
    return <input type="text" value={theRealJsonValue} onChange={() => null} />;
  } else if (typeof theRealJsonValue === 'boolean') {
    // BOOLEAN
    return (
      <input
        type={'checkbox'}
        checked={booleanValue}
        onChange={() => setBooleanValue(!booleanValue)} // does it work?
      />
    );
  } else if (typeof theRealJsonValue?.length === 'number') {
    // ARRAY
    return (
      <>
        {theRealJsonValue.map((theValue: any) => (
          <JsonValuesRecursion values={theValue} />
        ))}
      </>
    );
  } else if (typeof theRealJsonValue === 'object') {
    // OBJECT
    const theKeys = Object.keys(theRealJsonValue);
    console.log('theKeys', theKeys);

    return (
      <>
        {theKeys.map((highLevelKey) => (
          <JsonSection
            key={highLevelKey}
            topProperty={highLevelKey}
            values={theRealJsonValue[highLevelKey]}
          />
        ))}
      </>
    );
  } else {
    return null;
  }
};

const KeyText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ValuesContainer = styled.div`
  padding: 10px 0px 10px 20px;
`;
