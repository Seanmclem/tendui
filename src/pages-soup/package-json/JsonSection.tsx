import React from 'react';
import styled from 'styled-components';
import { JsonValuesRecursion } from './JsonValuesRecursion';

interface props {
  topProperty: string;
  values: any;
  type?: 'OBJECT' | 'ARRAY';
}

export const JsonSection: React.FC<props> = ({ topProperty, values, type = '' }) => {
  if (topProperty && values) {
    // console.log('topProperty', topProperty);

    // console.log('values', values);
    return (
      <Container>
        <KeyText>
          {topProperty}
          {/* {type === 'OBJECT' ? `(${values})` : ''} */}
          {typeof values?.length === 'number' && typeof values !== 'string'
            ? `(ARRAY)(${values?.length})`
            : ''}
        </KeyText>
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
