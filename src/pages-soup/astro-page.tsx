import React from 'react';
import styled from 'styled-components';
import { PageTerminals } from '../components/PageTerminals';

interface AstroPageProps {
  style: any;
}

export const AstroPage: React.FC<AstroPageProps> = ({ style }) => {
  return (
    <Container style={style}>
      <ContentSection>
        <Heading>Astro Page</Heading>
        <Description>
          This is the Astro development page. You can use the terminals below to run Astro commands.
        </Description>

        <FeatureList>
          <FeatureItem>• Create new Astro projects</FeatureItem>
          <FeatureItem>• Run development server</FeatureItem>
          <FeatureItem>• Build for production</FeatureItem>
          <FeatureItem>• Install dependencies</FeatureItem>
        </FeatureList>
      </ContentSection>

      <TerminalSection>
        <PageTerminals pageType="Astro" style={{ height: '100%' }} />
      </TerminalSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #1a1a2e;
`;

const ContentSection = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const TerminalSection = styled.div`
  height: 300px;
  border-top: 1px solid #333;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 16px;
`;

const Description = styled.p`
  color: #cccccc;
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const FeatureList = styled.div`
  background-color: #16213e;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #333;
`;

const FeatureItem = styled.div`
  color: #ffffff;
  font-size: 14px;
  margin-bottom: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;
