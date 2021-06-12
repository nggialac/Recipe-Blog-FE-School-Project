import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import DashboardGeneral from "./pages/Dashboard/DashboardGeneral";
import LoginGeneral from "./pages/login/LoginGeneral";
// import Login from "./pages/login/Login";
import SearchGeneral from "./pages/home/SearchGeneral";
import HomeRecipe from "./pages/home/components/HomeRecipe";

//
// import Services from './pages/homepage/page/Services';
// import Products from './pages/homepage/page/Products';
// import SignUp from './pages/homepage/page/Signup';
// import Home from './pages/homepage/page/Home';
import HomeApp from "./pages/homepage/page/HomeApp";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/search">
            <SearchGeneral />
          </Route>
          <Route path="/home/recipe/:id">
            <HomeRecipe />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/dashboard">
            <DashboardGeneral />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/login">
            <LoginGeneral />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/">
            <HomeApp />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
