import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Modal, Delete, Button, Field, Control, Label, Help, Input } from "rbx";

import MUTATION_INSERT from "./mutate-insert.gql";
import static from "./static.yaml";

const MUTATION_INSERT_AST = gql(MUTATION_INSERT);

const TextField = ({ label, error, onChangeText, value, ...props }) => {
  return (
    <Field>
      <Label>{label}</Label>
      <Control>
        <Input
          color={error && value ? "danger" : null}
          onChange={(e) => onChangeText(e.target.value)}
          value={value}
          {...props}
        />
      </Control>
      <Help color="danger">{error || <br />}</Help>
    </Field>
  );
};

const isValidTitle = (value) => value.trim();
const isValidUrl = (value) => value.trim();
const getError = (value, validator) => {
  if (!value && value !== 0) {
    return static.errors.required;
  } else if (!validator(value)) {
    return static.errors.invalid;
  } else {
    return null;
  }
};
const formatTitle = (value) => value.trim();
const formatUrl = (value) => {
  const val = value.trim();
  if (!val.startsWith("http://") && !val.startsWith("http://")) {
    return `https://${val}`;
  }
  return val;
};

const InsertBookmarkModal = ({ active, onClose, query }) => {
  const [insertBookmark, { loading }] = useMutation(MUTATION_INSERT_AST, {
    refetchQueries: [{ query }],
  });

  const [values, setValues] = useState({
    title: "",
    url: "",
  });
  const errors = {
    title: getError(values.title, isValidTitle),
    url: getError(values.url, isValidUrl),
  };
  return (
    <Modal active={active} onClose={onClose} closeOnBlur>
      <Modal.Background />
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>{static.title}</Modal.Card.Title>
          <Delete onClick={() => onClose()} />
        </Modal.Card.Head>
        <Modal.Card.Body>
          {Object.keys(values).map((field) => (
            <TextField
              key={field}
              label={static.labels[field]}
              placeholder={static.placeholders[field]}
              error={errors[field]}
              value={values[field]}
              onChangeText={(value) => setValues({ ...values, [field]: value })}
            />
          ))}
        </Modal.Card.Body>
        <Modal.Card.Foot>
          <Button
            color="success"
            state={loading ? "loading" : null}
            disabled={Object.values(errors).some((error) => error)}
            onClick={async () => {
              await insertBookmark({
                variables: {
                  title: formatTitle(values.title),
                  url: formatUrl(values.url),
                },
              });
              setValues({
                title: "",
                url: "",
              });
              onClose();
            }}
          >
            {static.affirm}
          </Button>
          <Button onClick={() => onClose()}>{static.deny}</Button>
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

export default InsertBookmarkModal;
