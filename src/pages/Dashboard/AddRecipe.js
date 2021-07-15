import React, { useState, useEffect, useRef } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import "./css/AddRecipe.css";
import MultiSelect from "react-multi-select-component";
import {
  NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
} from "../../config";
import FoodCategoryService from "../../apis/FoodCategoryService";

// var NEXT_PUBLIC_CLOUDINARY_CLOUDNAME = "recipe-photos";
// var NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET = "qmzji0mo";

const AddRecipe = () => {
  const initialRecipeState = {
    //recipeId: 0,
    cookTime: 0,
    prepTime: 0,
    recipeDescription: "",
    recipeName: "",
    recipeImage: "",
    foodCategories: [],
  };

  const [category, setCategory] = useState([]);
  const [options, setOptions] = useState();

  const getCategoryFood = () => {
    FoodCategoryService.getAllCategory()
      .then((response) => {
        //setOptions(response.data);
        let obj = response.data.map((fc) => {
          return { label: fc.foodCategoryName, value: fc.foodCategoryId };
        });
        setOptions(obj);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //INITIAL HOOKS
  const [recipe, setRecipe] = useState(initialRecipeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const saveRecipe = () => {
    handleSave();
    var foodCate = category.map((fc) => {
      return {
        foodCategoryId: fc.value,
        foodCategoryName: fc.label,
      };
    })
    var data = {
      cookTime: recipe.cookTime,
      prepTime: recipe.prepTime,
      recipeDescription: recipe.recipeDescription,
      recipeName: recipe.recipeName,
      recipeImage: recipe.recipeImage,
      foodCategories: foodCate,
    };

    RecipeDataService.createRecipe(data)
      .then((response) => {
        if (response.data.recipeName !== "") {
          setRecipe({
            id: response.data.id,
            cookTime: response.data.cookTime,
            prepTime: response.data.prepTime,
            recipeDescription: response.data.recipeDescription,
            recipeName: response.data.recipeName,
            recipeImage: response.data.recipeImage,
            foodCategories: response.data.foodCategories,
          });
          setSubmitted(true);
          console.log(response.data);
        } else {
          alert("Input Name Recipe!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newRecipe = () => {
    setRecipe(initialRecipeState);
    setSubmitted(false);
  };

  /////////////////////////////////////////////////////////////////////////////
  const dropbox = useRef(null);
  const fileSelect = useRef(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  async function handleImageUpload() {
    if (fileSelect) {
      fileSelect.current.click();
    }
  }

  function handleFiles(files) {
    console.log("handleFiles");
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      console.log(files[i]);
      uploadFile(files[i]);
    }
  }

  function uploadFile(file) {
    const url = `https://api.cloudinary.com/v1_1/${NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
    const xhr = new XMLHttpRequest();
    const fd = new FormData();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    // Update progress (can be used to show progress indicator)
    xhr.upload.addEventListener("progress", (e) => {
      setProgress(Math.round((e.loaded * 100.0) / e.total));
      console.log(Math.round((e.loaded * 100.0) / e.total));
    });

    xhr.onreadystatechange = (e) => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setImage(response.secure_url);
        console.log(response.secure_url);
      }
    };

    fd.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET);
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }

  function handleCancel() {
    setImage(null);
    setProgress(0);
  }

  function handleSave() {
    recipe.recipeImage = image;
  }

  useEffect(() => {
    getCategoryFood();
  }, []);

  return (
    <div className="submit-form upload-image">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newRecipe}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <h1>Add Recipe</h1>
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

          {options ? <div className="form-group">
            <label htmlFor="foodCategory">foodCategory</label>
            {/* <pre>
              {JSON.stringify(
                category.map((fc) => {
                  return {
                    foodCategoryId: fc.value,
                    foodCategoryName: fc.label,
                  };
                })
              )}
            </pre> */}
            <MultiSelect
              options={options}
              value={category}
              onChange={setCategory}
              labelledBy="Categories"
            />
          </div>: <h2>fail</h2>}

          <div className="form-group" style={{ display: "none" }}>
            <label htmlFor="recipeImage">Image</label>
            <input
              type="text"
              className="form-control"
              id="recipeImage"
              required
              value={recipe.recipeImage}
              onChange={handleInputChange}
              name="recipeImage"
            />
          </div>

          <div className="form-group">
            <div className="py-10">
              <h3 className="text-center font-bold">
                Upload image (to Cloudinary)
              </h3>
              <div className="py-10">
                <div
                  ref={dropbox}
                  className="upload-image"
                  style={{ display: "block" }}
                >
                  {image ? (
                    <>
                      <img
                        alt=""
                        className="rounded-lg"
                        src={image.replace("upload/", "upload/w_600/")}
                        style={{ height: 450, width: 600 }}
                      />
                      <div className="btn-upload-image flex justify-center items-center mt-2">
                        <button
                          className=" border-2 px-4 py-2 rounded w-1/2 btn-danger"
                          onClick={handleCancel}
                          type="button"
                        >
                          Cancel
                        </button>
                        <div className="upload-image">
                          {image && recipe.recipeName !== "" ? (
                            <button
                              onClick={saveRecipe}
                              className="btn btn-success border-2 px-4 py-2 rounded ml-2 w-1/2 btn-info"
                              type="button"
                            >
                              Submit
                            </button>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div
                      className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
                      style={{ height: 400, width: 600 }}
                    >
                      <form className="flex justify-center items-center h-full">
                        {progress === 0 ? (
                          <div className="text-gray-700 text-center ">
                            <button
                              className="btn btn-primary"
                              onClick={handleImageUpload}
                              type="button"
                            >
                              Browse
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-center items-center">
                            <span className="text-gray-700">{progress}%</span>
                          </div>
                        )}

                        <input
                          ref={fileSelect}
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => handleFiles(e.target.files)}
                        />
                      </form>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;
