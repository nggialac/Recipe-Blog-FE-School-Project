import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./../Dashboard/Dashboard";
import Preferences from "./Preferences";
import Login from "./Login";
import useToken from "./useToken";

import "./css/LoginGeneral.css";

export default function LoginGeneral() {
  const { token, setToken } = useToken(null);

  console.log(token);

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
