import React from "react";
import { Section, Container, Title, Block } from "rbx";

import BookmarksGrid from './components/BookmarksGrid';

import static from './static.yaml';

const TitleBar = () => (
  <Block textAlign="centered">
    <Title>{static.appTitle}</Title>
    <Title subtitle>{static.appSubtitle}</Title>
  </Block>
);

const Home = () => {
  return (
    <Section>
      <Container>
        <TitleBar />
        <BookmarksGrid />
      </Container>
    </Section>
  );
};

export default Home;
