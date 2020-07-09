import React from "react";
import { Section, Container, Loader, Column } from "rbx";
import { useQuery } from "@apollo/client";
import FlipMove from "react-flip-move";
import BOOKMARKS_QUERY from "./bookmarks-query.gql";
import BookmarkCard from "./BookmarkCard";
import InsertCard from "./InsertCard";

const CardColumn = React.forwardRef(({ children }, ref) => {
  return (
    <Column
      ref={ref}
      mobile={{ size: "full" }}
      tablet={{ size: "half" }}
      desktop={{ size: "one-quarter" }}
    >
      {children}
    </Column>
  );
});

const App = () => {
  const { data } = useQuery(BOOKMARKS_QUERY);
  console.log(data);
  return (
    <Section>
      <Container>
        {data ? (
          <Column.Group
            as={FlipMove}
            multiline
            enterAnimation="accordionHorizontal"
          >
            <CardColumn key="">
              <InsertCard />
            </CardColumn>
            {data.Bookmarks.map((bookmark) => (
              <CardColumn key={bookmark.id}>
                <BookmarkCard bookmark={bookmark} />
              </CardColumn>
            ))}
          </Column.Group>
        ) : (
          <Loader size="large" />
        )}
      </Container>
    </Section>
  );
};

export default App;
