import React, { useState } from "react";
import "./css/HomeGeneral.css";
import Form from "./components/Form";
import HomeRecipes from "./components/HomeRecipes";
import RecipeDataService from "../../apis/RecipeServices";
import { Link } from "react-router-dom";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  const getRecipe = (e) => {
    //console.log(currentRecipe.recipeId);
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    RecipeDataService.findByRecipeName(recipeName)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          <Link to="/home">Go Home</Link>
        </h1>
      </header>
      <Form getRecipe={getRecipe} />
      <HomeRecipes recipes={recipes} />
    </div>
  );
}
