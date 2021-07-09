import React, { useState, useEffect } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import { Link, withRouter } from "react-router-dom";
import "./css/ListRecipe.css";

import { makeStyles, Button } from "@material-ui/core";
import RecipeServices from "../../apis/RecipeServices";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ListRecipe = () => {
  //INITIAL HOOKS
  const classes = useStyles();
  const [recipes, setRecipes] = useState();
  const [searchName, setSearchName] = useState("");
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["pageNumber"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }

    return params;
  };

  const retrieveRecipes_Page = () => {
    const params = getRequestParams(searchName, page, pageSize);
    RecipeServices.getAllRecipe_Page(params)
      .then((response) => {
        const { recipes, totalPages } = response.data;
        setRecipes(recipes);
        setCount(totalPages);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    retrieveRecipes_Page();
  }, [page, pageSize]);

  //SEARCH STATE
  const onChangeSearchName = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  // const retrieveRecipes = () => {
  //   RecipeDataService.getAllRecipe()
  //     .then((response) => {
  //       setRecipes(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const deleteRecipe = () => {
    RecipeDataService.removeRecipeWithCategory(currentRecipe.recipeId)
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    // retrieveRecipes();
    retrieveRecipes_Page();
    setCurrentRecipe(null);
    setCurrentIndex(-1);
  };

  const setActiveRecipe = (recipe, index) => {
    setCurrentRecipe(recipe);
    setCurrentIndex(index);
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
    <div className="container mt-3">
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
                className="btn btn-secondary"
                type="button"
                onClick={retrieveRecipes_Page}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Recipes List</h4>
          <div className="mt-3">
            {"Items per Page: "}
            <select onChange={handlePageSizeChange} value={pageSize}>
              {pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
            />
          </div>

          <ul className="list-group">
            {recipes &&
              recipes.map((recipe, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveRecipe(recipe, index)}
                  key={index}
                >
                  {recipe.recipeName}
                </li>
              ))}
          </ul>

          {currentRecipe ? (
            <div>
              <Link
                className="link-edit-recipe"
                to={{
                  pathname: `recipe/${currentRecipe.recipeId}/ingredient-adding`,
                  state: { name: currentRecipe.recipeName },
                }}
              >
                <button className="m-3 btn btn-sm btn-success">
                  Update Ingredients
                </button>
              </Link>

              <Link
                className="link-edit-recipe"
                to={{
                  pathname: `recipe/${currentRecipe.recipeId}/step-adding`,
                  state: { name: currentRecipe.recipeName },
                }}
              >
                <button className="m-3 btn btn-sm btn-info">
                  Update Steps
                </button>
              </Link>

              <Link
                className="link-edit-recipe"
                to={{
                  pathname: `recipe/${currentRecipe.recipeId}/course`,
                  state: { name: currentRecipe.recipeName },
                }}
              >
                <button className="m-3 btn btn-sm btn-warning" style={{color: "#fff"}}>
                  Update Courses
                </button>
              </Link>
            </div>
          ) : (
            <></>
          )}
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
                  <strong>Type of Food Category</strong>
                </label>{" "}
                {currentRecipe.foodCategories
                  .map((fc) => {
                    return fc.foodCategoryName;
                  })
                  .join(",")}
                {/* {console.log(currentRecipe.foodCategories)} */}
              </div>
              <div>
                <label>
                  <strong>Recipe Image</strong>
                </label>{" "}
                {currentRecipe.recipeImage}
              </div>
              <Link
                className="link-edit-recipe"
                to={`recipe/${currentRecipe.recipeId}`}
              >
                <Button
                  className="badge badge-warning"
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
              </Link>
              <Button
                className="badge badge-danger"
                onClick={deleteRecipe}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Recipe...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ListRecipe);
