import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
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
    <BrowserRouter>
      <div className="wrapper">
        <h1>Application</h1>
        <div className="App">
          <nav className="navbar navbar-expand-lg navbar-light fixed-top">
            <div className="container">
              <Link className="navbar-brand" to={"/sign-in"}>
                positronX.io
              </Link>
              <div
                className="collapse navbar-collapse"
                id="navbarTogglerDemo02"
              >
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/preferences">
            <Preferences />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
