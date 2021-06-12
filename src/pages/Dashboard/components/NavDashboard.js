import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import RecipeId from "./../Recipe";
import RecipeList from "./../ListRecipe";
import AddRecipe from "./../AddRecipe";
import Dashboard from "./../Dashboard";
import Steps from "./../Steps";
import Sidebar from "./Sidebar";
import "../css/Apppp.css";

export default function NavDashboard() {
  return (
    <Router>
      {/* <Navbar />
      <Switch>
        <Route path="/dashboard/sidebar" />
      </Switch> */}

      <Sidebar />
      <div className="container mt-3">
        <Switch>
          <Route path="/dashboard" exact component={RecipeList}/>
          <Route exact path={["/dashboard/recipe"]} component={RecipeList} />
          <Route exact path="/dashboard/recipe/add" component={AddRecipe} />
          <Route exact path="/dashboard/recipe/:id" component={RecipeId} />
          <Route exact path="/dashboard/recipe/steps/:id" component={Steps} />
        </Switch>
      </div>
      <div>
      </div>
    </Router>
  );
}
