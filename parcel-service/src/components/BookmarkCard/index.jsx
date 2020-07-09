import React from "react";
import { gql, useSubscription, useMutation } from "@apollo/client";
import { Card, Image, Media, Title, Delete } from "rbx";
import Crossfade from "react-crossfade-image";

import SUBSCRIPTION_THUMBNAIL from "./subscription-thumbnail.gql";
import MUTATION_DELETE from "./mutate-delete.gql";

const SUBSCRIPTION_THUMBNAIL_AST = gql(SUBSCRIPTION_THUMBNAIL);
const MUTATION_DELETE_AST = gql(MUTATION_DELETE);

const BookmarkCard = React.memo(({ bookmark, query }) => {
  const { data } = useSubscription(SUBSCRIPTION_THUMBNAIL_AST, {
    variables: { id: bookmark.id },
  });
  const [deleteBookmark] = useMutation(MUTATION_DELETE_AST, {
    refetchQueries: [{ query }],
    variables: { id: bookmark.id },
  });

  return (
    <Card>
      <Card.Image>
        <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
          <Image
            as={Crossfade}
            containerClass="image is-16by9"
            src={
              data && data.Bookmarks_by_pk && data.Bookmarks_by_pk.thumbnail
                ? data.Bookmarks_by_pk.thumbnail
                : bookmark.thumbnail ||
                  "https://bulma.io/images/placeholders/1280x960.png"
            }
          />
        </a>
      </Card.Image>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left">
            <Image.Container as="p" size={64}>
              <Image
                src={`https://www.google.com/s2/favicons?sz=128&domain_url=${bookmark.url}`}
              />
            </Image.Container>
          </Media.Item>
          <Media.Item>
            <Title size={4}>{bookmark.title}</Title>
            <Title size={6} subtitle>
              {new URL(bookmark.url).host}
            </Title>
          </Media.Item>
          <Media.Item as="figure" align="right">
            <Delete onClick={() => deleteBookmark()} />
          </Media.Item>
        </Media>
      </Card.Content>
    </Card>
  );
});

export default BookmarkCard;
