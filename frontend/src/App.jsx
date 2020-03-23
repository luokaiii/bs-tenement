import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import { User } from "./store/index";
import UserLayout from "./pages/layout/UserLayout";
import BackLayout from "./pages/layout/BackLayout";

import "./App.less";

function App() {
  return (
    <User>
      <HashRouter>
        <Switch>
          <Route path="/f" component={UserLayout} />
          <Route path="/b" component={BackLayout} />
          <Redirect to="/f/home" />
        </Switch>
      </HashRouter>
    </User>
  );
}

export default App;
