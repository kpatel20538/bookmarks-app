import React, { useState } from "react";
import {
  Box,
  Hero,
  Title,
  Modal,
  Delete,
  Button,
  Field,
  Label,
  Control,
  Input,
  Select,
  Help,
  Checkbox,
} from "rbx";
import { useMutation } from "@apollo/client";
import INSERT_MUTATION from "./insert-bookmark.gql";
import BOOKMARKS_QUERY from "../bookmarks-query.gql";

const isUrl = (url) =>
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
    url
  );

const InsertModal = ({ active, onClose }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState({});
  const [error, setError] = useState("");
  const [mutate, { loading }] = useMutation(INSERT_MUTATION, {
    refetchQueries: [{query: BOOKMARKS_QUERY}],
  });

  return (
    <Modal active={active} onClose={onClose} closeOnBlur>
      <Modal.Background />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>Add New Bookmark</Modal.Card.Title>
          <Delete onClick={onClose} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Field key="title">
            <Label>Title</Label>
            <Control>
              <Input
                type="text"
                placeholder="e.g. Alex Smith"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Control>
            <Help color="danger">{title ? null : "Invalid"}</Help>
          </Field>
          <Field key="url">
            <Label>Url</Label>
            <Control>
              <Input
                type="text"
                placeholder="e.g. https://example.org"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Control>
            <Help color="danger">{isUrl(url) ? null : "Invalid"}</Help>
          </Field>
          {["Science", "Techonology", "Engineering", "Mathematics"].map(
            (tag) => (
              <Field key={tag}>
                <Control>
                  <Label>
                    <Checkbox
                      checked={tags[tag] || false}
                      onChange={(e) => {
                        setTags({ ...tags, [tag]: e.target.checked });
                      }}
                    />{" "}
                    {tag}
                  </Label>
                </Control>
              </Field>
            )
          )}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button
            state={loading ? "loading" : null}
            color="success"
            disabled={!title || !isUrl(url)}
            onClick={() => {
              mutate({
                variables: {
                  input: {
                    title,
                    url,
                    tags: Object.keys(tags).filter((tag) => tags[tag]),
                  },
                },
              })
                .then(() => {
                  onClose();
                })
                .catch(() => alert("Insert Failed"));
            }}
          >
            Add
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

const InsertCard = ({}) => {
  const [active, setActive] = useState(false);

  return (
    <>
      <Box paddingless onClick={() => setActive(true)}>
        <Hero textAlign="centered" color="primary" size="medium">
          <Hero.Body>
            <Title>Add New Bookmark</Title>
          </Hero.Body>
        </Hero>
      </Box>
      <InsertModal active={active} onClose={() => setActive(false)} />
    </>
  );
};

export default InsertCard;
