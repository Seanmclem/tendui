import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const JsonValues = (values: any) => {
  // console.log('type', values);

  const [theRealJsonValue] = useState(values?.values);

  const [booleanValue, setBooleanValue] = useState(theRealJsonValue);

  if (typeof theRealJsonValue === 'string' || typeof theRealJsonValue === 'number') {
    // return null;
    return <input type="text" value={theRealJsonValue} onChange={() => null} />;
  } else if (typeof theRealJsonValue === 'boolean') {
    if (theRealJsonValue !== booleanValue) {
      // setBooleanValue(theRealJsonValue);
    }
    return (
      <input
        type={'checkbox'}
        checked={booleanValue}
        onChange={() => setBooleanValue(!booleanValue)} // dont work dont care
      />
    );
  } else if (typeof theRealJsonValue?.length === 'number') {
    return (
      <>
        {theRealJsonValue.map((theValue: any) => (
          <JsonValues values={theValue} />
        ))}
      </>
    );
  } else if (typeof theRealJsonValue === 'object') {
    const theKeys = Object.keys(theRealJsonValue);
    // console.log('ISAIDWHATSWRONG', values.values);
    console.log('theKeys', theKeys);

    // theKeys.forEach((daKey) => console.log({ daKey }));

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

interface props {
  topProperty: string;
  values: any;
}

export const JsonSection: React.FC<props> = ({ topProperty, values }) => {
  if (topProperty && values) {
    // console.log('topProperty', topProperty);

    // console.log('values', values);
    return (
      <Container>
        <KeyText>{topProperty}</KeyText>
        <ValuesContainer>
          <JsonValues values={values} />
        </ValuesContainer>
      </Container>
    );
  } else {
    return null;
  }
};

const Container = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const KeyText = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ValuesContainer = styled.div`
  padding: 10px 0px 10px 20px;
`;
