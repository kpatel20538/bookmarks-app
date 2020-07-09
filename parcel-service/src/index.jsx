import React, { Suspense } from "react";
import { render } from "react-dom";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Loader } from "rbx";
import { client } from "/helpers/apollo";
import "rbx/index.css";

const Home = React.lazy(() => import('/routes/Home'));

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

render(<Root />, document.getElementById("root"));
