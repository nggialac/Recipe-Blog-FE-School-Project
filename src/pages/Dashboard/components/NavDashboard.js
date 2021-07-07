import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import RecipeId from "./../Recipe";
import RecipeList from "./../ListRecipe";
import AddRecipe from "./../AddRecipe";
import Steps from "./../Steps";
import Course from "./../Course";
import Sidebar from "./Sidebar";
import "../css/Apppp.css";
import Register from "../Register";
import LoginGeneral from "../../login/LoginGeneral";
import Ingredient from "../Ingredient";
import Dashboard from "../Dashboard";
import HomeApp from "../../homepage/page/HomeApp";
import Tips from "../Tips";

export default function NavDashboard(props) {
  return (
    <>
      <Router>
        <Sidebar />

        <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
          <Route
            path="/dashboard/register"
            exact
            component={() => <Register fullName={props.fullName} />}
          />
          <Route exact path="/dashboard/recipe" component={RecipeList} />
          <Route exact path="/dashboard/recipe/add" component={AddRecipe} />
          <Route exact path="/dashboard/recipe/:id" component={RecipeId} />
          <Route
            exact
            path="/dashboard/recipe/:id/step-adding"
            component={Steps}
          />
          <Route
            exact
            path="/dashboard/recipe/:id/ingredient-adding"
            component={Ingredient}
          />
          <Route exact path="/dashboard/recipe/:id/course" component={Course} />
          <Route exact path="/dashboard/tips" component={Tips} />
          <Route exact path="/login" component={LoginGeneral} />
        </Switch>
      </Router>
    </>
  );
}
