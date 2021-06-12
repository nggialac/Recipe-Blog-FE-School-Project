import React, { useState } from "react";
import "./css/SearchGeneral.css";
import SearchForm from "./components/SearchForm";
import SearchRecipes from "./components/SearchRecipes";
import RecipeDataService from "../../apis/RecipeServices";

export default function Home() {
  const [recipes, setRecipes] = useState([]);


  const getRecipe = (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    RecipeDataService.findByRecipeName(recipeName)
      .then((response) => {
        if(response.data) setRecipes(response.data); 
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">
          Recipe Home
        </h1>
      </header>
      <SearchForm getRecipe={getRecipe} />
      <SearchRecipes recipes={recipes} />
    </div>
  );
}
