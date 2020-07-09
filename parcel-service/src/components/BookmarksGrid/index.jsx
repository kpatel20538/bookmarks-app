import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { Column, PageLoader, Button } from "rbx";

import BookmarkCard from "/components/BookmarkCard";
import InsertBookmarkModal from "/components/InsertBookmarkModal";

import QUERY_BOOKMARKS from "./query-bookmarks.gql";
import static from "./static.yaml";

const QUERY_BOOKMARKS_AST = gql(QUERY_BOOKMARKS);

const onAppear = (el, index) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      el.style.transform = `scaleX(${val})`;
      el.style.opacity = val;
    },
    delay: index * 50,
  });
};

const onExit = (el, index, removeElement) => {
  spring({
    config: { overshootClamping: true },
    onUpdate: (val) => {
      el.style.opacity = 1 - val;
      el.style.transform = `scaleX(${1 - val})`;
    },
    delay: index * 50,
    onComplete: removeElement,
  });

  return () => {
    removeElement();
  };
};

const BookmarksGrid = () => {
  const { data, loading } = useQuery(QUERY_BOOKMARKS_AST);
  const [isInsertModalActive, setIsInsertModalActive] = useState(false);
  return (
    <Flipper flipKey={JSON.stringify(data)}>
      <Button.Group>
        <Button color="info" onClick={() => setIsInsertModalActive(true)}>
          {static.insertBookmark}
        </Button>
      </Button.Group>
      <Column.Group multiline>
        <PageLoader active={loading} />
        {!loading &&
          data.Bookmarks.map((bookmark) => (
            <Flipped
              key={bookmark.id}
              flipId={bookmark.id}
              onAppear={onAppear}
              onExit={onExit}
            >
              <Column
                mobile={{ size: "full" }}
                tablet={{ size: "half" }}
                desktop={{ size: "one-quarter" }}
              >
                <BookmarkCard bookmark={bookmark} query={QUERY_BOOKMARKS_AST} />
              </Column>
            </Flipped>
          ))}
      </Column.Group>
      <InsertBookmarkModal
        active={isInsertModalActive}
        onClose={() => setIsInsertModalActive(false)}
        query={QUERY_BOOKMARKS_AST}
      />
    </Flipper>
  );
};

export default BookmarksGrid;
