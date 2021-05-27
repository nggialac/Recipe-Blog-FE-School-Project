import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RecipeId from "./../Recipe";
import RecipeList from "./../ListRecipe";
import AddRecipe from "./../AddRecipe";
import Dashboard from "./../Dashboard";
// import LoginGeneral from "../../login/LoginGeneral";

export default function NavDashboard() {
  return (
    <Router>
      <div>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/dashboard" className="navbar-brand">
              Dashboard
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/dashboard/recipe"} className="nav-link">
                  List Recipe
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/dashboard/add"} className="nav-link">
                  Add
                </Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route
                exact
                path={["/dashboard/recipe"]}
                component={RecipeList}
              />
              <Route exact path="/dashboard/add" component={AddRecipe} />
              <Route path="/dashboard/recipe/:id" component={RecipeId} />
              <Route exact path="/dashboard" component={Dashboard} />
              {/* <Route exact path="/login" component={LoginGeneral} /> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}
