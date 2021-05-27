import React, { useState, useEffect } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import { useForm } from "react-hook-form";
import "./css/Recipe.css";

const Recipe = (props) => {
  const initialRecipeState = {
    recipeId: -1,
    recipeName: "",
    recipeDescription: "",
    prepTime: 0,
    cookTime: 0,
    recipeImage: ""
  };

  //INITIAL HOOKS
  //const {id: setRouteId} = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({ initialRecipeState });
  const [message, setMessage] = useState("");

  const getRecipe = (id) => {
    RecipeDataService.getRecipeById(id)
      .then((response) => {
        setCurrentRecipe(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // useEffect(() => {
  //   getRecipe(setRouteId);
  // }, [setRouteId]);

  useEffect(() => {
    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    console.log(currentRecipe);
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  };

  const updateRecipe = () => {
    console.log(currentRecipe);
    RecipeDataService.updateRecipe(currentRecipe.recipeId, currentRecipe)
      .then((response) => {
        console.log(response.data);
        setMessage("The Recipe was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRecipe = () => {
    //console.log(currentRecipe.recipeId);
    RecipeDataService.removeRecipe(currentRecipe.recipeId)
      .then((response) => {
        console.log(response.data);
        props.history.push("/recipe");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //REACT-HOOK-FORM
  const { register } = useForm();

  return (
    <div>
      {currentRecipe ? (
        <div className="edit-form">
          <h4>Recipe</h4>
          <form key={currentRecipe}>
            <div className="form-group">
              <label htmlFor="recipeId">recipeId</label>
              <input
                {...register('recipeId')}
                type="number"
                className="form-control"
                id="recipeId"
                name="recipeId"
                //defaultValue={currentRecipe.recipeId}
                value={currentRecipe.recipeId||""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">recipeName</label>
              <input
                {...register('recipeName')}
                type="text"
                className="form-control"
                id="recipeName"
                //name="recipeName"
                //defaultValue={currentRecipe.recipeName}
                value={currentRecipe.recipeName||""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">recipeDescription</label>
              <input
                {...register('recipeDescription')}
                type="text"
                className="form-control"
                id="recipeDescription"
                // name="recipeDescription"
                //defaultValue={currentRecipe.recipeDescription}
                value={currentRecipe.recipeDescription||""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prepTime">prepTime</label>
              <input
                {...register('prepTime')}
                type="text"
                className="form-control"
                id="prepTime"
                // name="prepTime"
                // defaultValue={currentRecipe.prepTime}
                value={currentRecipe.prepTime||""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cookTime">cookTime</label>
              <input
                {...register('cookTime')}
                type="text"
                className="form-control"
                id="cookTime"
                // name="cookTime"
                // defaultValue={currentRecipe.cookTime}
                value={currentRecipe.cookTime||""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeImage">recipeImage</label>
              <input
                {...register('recipeImage')}
                type="text"
                className="form-control"
                id="recipeImage"
                // name="cookTime"
                // defaultValue={currentRecipe.cookTime}
                value={currentRecipe.recipeImage||""}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-3" onClick={deleteRecipe}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateRecipe}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Recipe...</p>
        </div>
      )}
    </div>
  );
};

export default Recipe;
