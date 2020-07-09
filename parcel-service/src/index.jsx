import React from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import { client } from "./helpers/apollo";
import "rbx/index.css";

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

render(<Root />, document.getElementById("root"));
