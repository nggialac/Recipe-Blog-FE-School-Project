import React, {useState} from "react";
import RecipeDataService from "../../apis/RecipeServices";

const AddRecipe = () => {
  const initialRecipeState = {
    //recipeId: 0,
    cookTime: 0,
    prepTime: 0,
    recipeDescription: "",
    recipeName: "",
  };

  //INITIAL HOOKS
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const saveRecipe = () => {
    var data = {
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      recipeDescription: recipe.recipeDescription,
      recipeName: recipe.recipeName,
    };

    RecipeDataService.createRecipe(data)
      .then((response) => {
        setRecipe({
          id: response.data.id,
          cookTime: response.data.cookTime,
          prepTime: response.data.prepTime,
          recipeDescription: response.data.recipeDescription,
          recipeName: response.data.recipeName
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">

      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRecipe}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="recipeName">Name</label>
            <input
              type="text"
              className="form-control"
              id="recipeName"
              required
              value={recipe.recipeName}
              onChange={handleInputChange}
              name="recipeName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="recipeDescription">Description</label>
            <input
              type="text"
              className="form-control"
              id="recipeDescription"
              defaultValue={recipe.recipeDescription}
              onChange={handleInputChange}
              name="recipeDescription"
            />
          </div>

          <div className="form-group">
            <label htmlFor="prepTime">prepTime</label>
            <input
              type="text"
              className="form-control"
              id="prepTime"
              value={recipe.prepTime}
              onChange={handleInputChange}
              name="prepTime"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cookTime">cookTime</label>
            <input
              type="text"
              className="form-control"
              id="cookTime"
              value={recipe.cookTime}
              onChange={handleInputChange}
              name="cookTime"
            />
          </div>

          <button onClick={saveRecipe} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
      
    </div>
  );
};

export default AddRecipe;
