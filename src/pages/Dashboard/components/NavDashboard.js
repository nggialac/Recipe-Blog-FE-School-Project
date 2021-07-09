import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

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
import Tips from "../Tips";
import User from "../User";
import ChangePassword from "../userComponents/ChangePassword";
import CreateUser from "../userComponents/CreateUser";
import FoodCategory from "../FoodCategory";

const NavDashboard = (props) => {
  return (
    <>
      <Router>
        <Sidebar />

        <Switch>
          <Route exact path="/dashboard" component={Dashboard}>
            {/* <Dashboard /> */}
          </Route>
          <Route path="/dashboard/user" exact>
            <User info={props.info} />
          </Route>
          <Route path="/dashboard/user/changepw" exact>
            <ChangePassword info={props.info} />
          </Route>
          <Route path="/dashboard/user/create" exact>
            <CreateUser info={props.info} />
          </Route>
          <Route exact path="/dashboard/recipe">
            <RecipeList />
          </Route>
          <Route exact path="/dashboard/recipe/add">
            <AddRecipe />
          </Route>
          <Route exact path="/dashboard/recipe/:id" component={RecipeId}>
            {/* <RecipeId /> */}
          </Route>
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
          <Route exact path="/dashboard/tips">
            <Tips />
          </Route>
          <Route exact path="/dashboard/fc">
            <FoodCategory />
          </Route>
          <Route exact path="/login" >
          <LoginGeneral/>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default withRouter(NavDashboard);
