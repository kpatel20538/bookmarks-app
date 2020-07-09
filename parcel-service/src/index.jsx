import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";

import App from "./App";
import { client } from "./apollo";
import "rbx/index.css";

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

render(<Root />, document.getElementById("root"));
