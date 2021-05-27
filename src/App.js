import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardGeneral from "./pages/Dashboard/DashboardGeneral";
import LoginGeneral from "./pages/login/LoginGeneral";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/dashboard">
            <DashboardGeneral />
          </Route>
          <Route path="/login">
            <LoginGeneral />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
