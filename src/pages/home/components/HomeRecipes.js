import React from "react";
import { Link } from "react-router-dom";

const HomeRecipes = (props) => (
  <div className="container">
    <div className="row">
      {props.recipes.map((recipe) => {
        return (
          <div
            className="col-md-4"
            key={recipe.recipeId}
            style={{ marginBottom: "2rem" }}
          >
            <div className="recipes__box">
              <img
                className="recipe__box-img"
                src={recipe.recipeImage}
                alt={recipe.recipeName}
              />
              <div className="recipe__text">
                <h5 className="recipes__title">
                  {recipe.recipeName.length < 25
                    ? `${recipe.recipeName}`
                    : `${recipe.recipeName.substring(0, 25)}...`}
                </h5>
                {/* <p className="recipes__subtitle">
                  Publisher: <span>{recipe.publisher}</span>
                </p> */}
              </div>
              <button className="recipe_buttons">
                <Link to={`/home/recipe/${recipe.recipeId}`}>View More</Link>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default HomeRecipes;
