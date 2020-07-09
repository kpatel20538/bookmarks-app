import React from "react";
import { Card, Image, Media, Title, Tag, Delete } from "rbx";
import CrossfadeImage from "react-crossfade-image";
import { useSubscription, useMutation } from "@apollo/client";
import THUMBNAIL_SUBSCRIPTION from "./subscription.gql";
import DELETE_MUTATION from "./delete-bookmark.gql";
import BOOKMARKS_QUERY from "../bookmarks-query.gql";

import "./styles.css";

const BookmarkThumbnail = ({ bookmark }) => {
  const { data } = useSubscription(THUMBNAIL_SUBSCRIPTION, {
    variables: { id: bookmark.id },
  });

  return (
    <Image
      as={CrossfadeImage}
      containerClass="image is-16by9"
      className="thumbnail"
      src={
        data && data.Bookmarks_by_pk && data.Bookmarks_by_pk.thumbnail
          ? data.Bookmarks_by_pk.thumbnail
          : bookmark.thumbnail ||
            "https://bulma.io/images/placeholders/1280x960.png"
      }
    />
  );
};

const BookmarkCard = ({ bookmark }) => {
  const [mutate] = useMutation(DELETE_MUTATION, {
    variables: { id: bookmark.id },
    refetchQueries: [{ query: BOOKMARKS_QUERY }],
  });

  const url = new URL(bookmark.url);
  return (
    <Card>
      <Card.Image>
        <a href={bookmark.url} rel="noopener noreferrer" target="_blank">
          <BookmarkThumbnail bookmark={bookmark} />
        </a>
      </Card.Image>
      <Card.Content>
        <Media>
          <Media.Item as="figure" align="left">
            <Image.Container size={64}>
              <Image
                rounded
                className="box"
                paddingless
                src={`https://icons.duckduckgo.com/ip3/${url.hostname}.ico`}
              />
            </Image.Container>
          </Media.Item>
          <Media.Item>
            <Title>{bookmark.title}</Title>
            <Title size={5} subtitle>
              {url.hostname}
            </Title>
          </Media.Item>
          <Media.Item align="right">
            <Delete as="button" size="large" onClick={() => mutate()} />
          </Media.Item>
        </Media>
        <Tag.Group>
          {bookmark.tags.map((tag) => (
            <Tag key={tag} color="primary" size="medium">
              {tag}
            </Tag>
          ))}
        </Tag.Group>
      </Card.Content>
    </Card>
  );
};

export default BookmarkCard;
