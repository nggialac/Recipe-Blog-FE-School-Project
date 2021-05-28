import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeRecipe from './HomeRecipe'

export default function RouterHome() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/home/recipe" />
        <Route path="/home/recipe/:id" component={HomeRecipe} />
      </Switch>
    </BrowserRouter>
  );
}
