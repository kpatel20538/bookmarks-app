import React from "react";
import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/link-ws";

const httpLink = new HttpLink({
  uri: "https://api-kpatel20538.cloud.okteto.net/v1/graphql",
});

const wsLink = new WebSocketLink({
  uri: `wss://api-kpatel20538.cloud.okteto.net/v1/graphql`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
});
