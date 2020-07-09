import React from "react";
import { Section, Container, Title, Block } from "rbx";

import static from './static.yaml';

const Home = () => {
  return (
    <Section>
      <Container>
        <Block textAlign="centered">
          <Title>{static.appTitle}</Title>
          <Title subtitle>{static.appSubtitle}</Title>
        </Block>
      </Container>
    </Section>
  );
};

export default Home;
