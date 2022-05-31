import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { JsonSection } from './JsonSection';

interface props {
  values: any;
}

export const JsonValuesRecursion: React.FC<props> = ({ values }) => {
  // console.log('type', values);

  const [theRealJsonValue, setTheREal] = useState(values);
  /// HACKY JUNK, PLEASE DELETE ^v
  const [booleanValue, setBooleanValue] = useState(theRealJsonValue);

  useEffect(() => {
    setTheREal(values);
    setBooleanValue(values);

    /// HACKY JUNK, PLEASE DELETE ^^
  }, [values]);

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
      <ArrayList>
        {theRealJsonValue.map((theValue: any) => (
          <JsonValuesRecursion key={theValue} values={theValue} />
        ))}
      </ArrayList>
    );
  } else if (typeof theRealJsonValue === 'object') {
    // OBJECT
    const theKeys = Object.keys(theRealJsonValue);
    // console.log('theKeys', theKeys);

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

const ArrayList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  max-width: 240px;
`;
