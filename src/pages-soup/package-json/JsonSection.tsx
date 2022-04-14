import React from 'react';
import styled from 'styled-components';
import { JsonValuesRecursion } from './JsonValuesRecursion';

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
          <JsonValuesRecursion values={values} />
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
