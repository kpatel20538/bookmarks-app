import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { Column, PageLoader } from "rbx";

import BookmarkCard from "/components/BookmarkCard";

import QUERY_BOOKMARKS from "./query-bookmarks.gql";

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

  return (
    <Flipper flipKey={JSON.stringify(data)}>
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
    </Flipper>
  );
};

export default BookmarksGrid;
