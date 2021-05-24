import React, { useState, useEffect } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import { Link } from "react-router-dom";

const ListRecipe = () => {
  //INITIAL HOOKS
  const [recipes, setRecipes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveRecipes();
  }, []);

  //SEARCH STATE
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveRecipes = () => {
    RecipeDataService.getAllRecipe()
      .then((response) => {
        setRecipes(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveRecipes();
    setCurrentRecipe(null);
    setCurrentIndex(-1);
  };

  const setActiveRecipe = (recipe, index) => {
    setCurrentRecipe(recipe);
    setCurrentIndex(index);
  };

  const removeAllRecipes = () => {
    RecipeDataService.removeAllRecipe()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByName = () => {
    RecipeDataService.findByRecipeName(searchName)
      .then((response) => {
        setRecipes(response.data);
        //console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Recipe Name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <h4>Recipes List</h4>
        <ul className="list-group">
          {recipes &&
            recipes.map((recipe, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveRecipe(recipe, index)}
                key={index}
              >
                {recipe.recipeName}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllRecipes}
        >
          Remove All
        </button>
      </div>

      <div className="col-md-6">
        {currentRecipe ? (
          <div>
            <h4>Recipe</h4>
            <div>
              <label>
                <strong>ID:</strong>
              </label>{" "}
              {currentRecipe.recipeId}
            </div>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentRecipe.recipeName}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentRecipe.recipeDescription}
            </div>
            <div>
              <label>
                <strong>PrepTime</strong>
              </label>{" "}
              {currentRecipe.prepTime}
            </div>
            <div>
              <label>
                <strong>CookTime</strong>
              </label>{" "}
              {currentRecipe.cookTime}
            </div>
            <div>
              <label>
                <strong>Recipe Image</strong>
              </label>{" "}
              {currentRecipe.recipeImage}
            </div>

            <Link
              to={`recipe/${currentRecipe.recipeId}`}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Recipe...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRecipe;
