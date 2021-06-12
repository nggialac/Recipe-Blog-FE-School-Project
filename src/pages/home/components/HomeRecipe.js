import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeDataService from "../../../apis/RecipeServices";

const HomeRecipe = () => {
  const [activeRecipe, setActiveRecipe] = useState(null);
  //const { path } = useRouteMatch();
  const { id } = useParams();

  useEffect(() => {
    console.log(id)
    //console.log(activeRecipe);
    getRecipe(id);
  }, [id]);

  const getRecipe = (id) => {
    RecipeDataService.getRecipeById(id)
      .then((response) => {
        setActiveRecipe(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div>
      {activeRecipe ? (
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
      ) : (
        <div>
          <h1 className="">Not found!</h1>
        </div>
      )}
    </div>
  );
};

export default HomeRecipe;
