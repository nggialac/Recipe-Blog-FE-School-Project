import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardGeneral from "./pages/Dashboard/DashboardGeneral";
import LoginGeneral from "./pages/login/LoginGeneral";
import HomeGeneral from "./pages/home/HomeGeneral";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/home">
            <HomeGeneral/>
          </Route>
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
