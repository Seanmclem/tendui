import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface props {
  topProperty: string;
  children: [];
}

export const JsonSection: React.FC<props> = ({ topProperty }) => {
  return <Container>{topProperty}</Container>;
};

const Container = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
