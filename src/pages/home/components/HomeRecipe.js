import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";
import RecipeDataService from "../../../apis/RecipeServices";

export default function HomeRecipe(props) {
  const initialRecipeState = {
    recipeId: -1,
    recipeName: "",
    recipeDescription: "",
    prepTime: 0,
    cookTime: 0,
    recipeImage: ""
  };

  const [activeRecipe, setActiveRecipe] = useState({initialRecipeState});

  useEffect(() => {

    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const getRecipe = (id) => {
       RecipeDataService.getRecipeById(id)
      .then((response) => {
        setActiveRecipe(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <Route>
    <div className="container">
      <div className="active-recipe">
        <img
          className="active-recipe__img"
          src={activeRecipe.recipeImage}
          alt={activeRecipe.recipeName}
        />
        <h3 className="active-recipe__title">{activeRecipe.recipeName}</h3>
        {/* <h4 className="active-recipe__publisher">
          Publisher: <span>{recipe.publisher}</span>
        </h4> */}
        <p className="active-recipe__website">
          Website:
          {/* <span>
            <a href={recipe.publisher_url}>{recipe.publisher_url}</a>
          </span> */}
        </p>
        <button className="active-recipe__button">
          <Link to="/home">Go Home</Link>
        </button>
      </div>
    </div>
    </Route>
  );
}
