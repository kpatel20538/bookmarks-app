import React from "react";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { Column } from "rbx";

import BookmarkCard from "/components/BookmarkCard";

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

const List = () => {
  const data = [];
  return (
    <Flipper flipKey={JSON.stringify(data)}>
      <Column.Group multiline>
        {data.map((bookmark) => (
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
              <BookmarkCard bookmark={bookmark} />
            </Column>
          </Flipped>
        ))}
      </Column.Group>
    </Flipper>
  );
};

// ---

const BookmarksGrid = () => {
  return <List />;
};

export default BookmarksGrid;
