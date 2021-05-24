import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import RecipeId from "./pages/Dashboard/Recipe";
import RecipeList from "./pages/Dashboard/ListRecipe";
import AddRecipe from "./pages/Dashboard/AddRecipe";


function App() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/home" className="navbar-brand">
            Dashboard
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/recipe"} className="nav-link">
                List Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/recipe"]} component={RecipeList} />
            <Route exact path="/add" component={AddRecipe} />
            <Route path="/recipe/:id" component={RecipeId} />
          
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
