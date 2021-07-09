import React, { useState, useEffect, useRef } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import { useForm } from "react-hook-form";
import "./css/Recipe.css";
import MultiSelect from "react-multi-select-component";
import FoodCategoryService from "../../apis/FoodCategoryService";
import {
  NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
  NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET,
} from "../../config";

const Recipe = (props) => {
  const initialRecipeState = {
    recipeId: -1,
    recipeName: "",
    recipeDescription: "",
    prepTime: 0,
    cookTime: 0,
    recipeImage: "",
    foodCategories: [],
  };

  const [currentRecipe, setCurrentRecipe] = useState({ initialRecipeState });
  const [message, setMessage] = useState("");
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
//
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);
  const fileSelect = useRef(null);
  const dropbox = useRef(null);

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
    console.log(image);
  }

  function handleCancel() {
    setImage(null);
    setProgress(0);
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
        setCurrentRecipe({...currentRecipe, recipeImage: response.secure_url});
        console.log(response.secure_url);
      }
    };

    fd.append("upload_preset", NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET);
    fd.append("tags", "browser_upload");
    fd.append("file", file);
    xhr.send(fd);
  }
//
  const getCategoryFood = () => {
    FoodCategoryService.getAllCategory()
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
        let obj = response.data.map((fc) => {
          return { label: fc.foodCategoryName, value: fc.foodCategoryId };
        });
        setOptions(obj);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getRecipe = (id) => {
    RecipeDataService.getRecipeByIdWithCategory(id)
      .then((response) => {
        console.log(response.data);
        setCurrentRecipe(response.data);
        setImage(response.data.recipeImage);
        setSelected(
          response.data.foodCategories.map((fc) => {
            return { label: fc.foodCategoryName, value: fc.foodCategoryId };
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategoryFood();
    getRecipe(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    // console.log(currentRecipe);
    const { name, value } = event.target;
    setCurrentRecipe({ ...currentRecipe, [name]: value });
  };

  const updateRecipe = () => {
    var foodCate = selected.map((fc) => {
      return {
        foodCategoryId: fc.value,
        foodCategoryName: fc.label,
      };
    });
    var data = {
      cookTime: currentRecipe.cookTime,
      prepTime: currentRecipe.prepTime,
      recipeDescription: currentRecipe.recipeDescription,
      recipeName: currentRecipe.recipeName,
      recipeImage: currentRecipe.recipeImage,
      foodCategories: foodCate,
    };

    RecipeDataService.updateRecipeWithCategory(currentRecipe.recipeId, data)
      .then((response) => {
        console.log(response.data);
        setMessage("The Recipe was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteRecipe = () => {
    RecipeDataService.removeRecipeWithCategory(currentRecipe.recipeId)
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
    <div className="container">
      {currentRecipe ? (
        <div className="edit-form">
          <h1>Update Recipe</h1>
          <form key={currentRecipe}>
            <div className="form-group">
              <label htmlFor="recipeId">recipeId</label>
              <input
                {...register("recipeId")}
                type="number"
                className="form-control"
                id="recipeId"
                name="recipeId"
                //defaultValue={currentRecipe.recipeId}
                value={currentRecipe.recipeId || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeName">recipeName</label>
              <input
                {...register("recipeName")}
                type="text"
                className="form-control"
                id="recipeName"
                //name="recipeName"
                //defaultValue={currentRecipe.recipeName}
                value={currentRecipe.recipeName || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeDescription">recipeDescription</label>
              <input
                {...register("recipeDescription")}
                type="text"
                className="form-control"
                id="recipeDescription"
                // name="recipeDescription"
                //defaultValue={currentRecipe.recipeDescription}
                value={currentRecipe.recipeDescription || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prepTime">prepTime</label>
              <input
                {...register("prepTime")}
                type="text"
                className="form-control"
                id="prepTime"
                // name="prepTime"
                // defaultValue={currentRecipe.prepTime}
                value={currentRecipe.prepTime || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cookTime">cookTime</label>
              <input
                {...register("cookTime")}
                type="text"
                className="form-control"
                id="cookTime"
                // name="cookTime"
                // defaultValue={currentRecipe.cookTime}
                value={currentRecipe.cookTime || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <div>
                {/* <pre>{JSON.stringify(selected)}</pre> */}
                <MultiSelect
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  labelledBy="Select"
                />
              </div>
            </div>
            <div className="form-group">
            <div className="field">
          <h4>Image</h4>
          <div style={{ justifyContent: "center", textAlign: "center" }}>
            <div
              ref={dropbox}
              className="upload-image center"
              style={{ display: "inline-block" }}
            >
              {image ? (
                <>
                  <img
                    alt=""
                    className="rounded-lg center"
                    src={image.replace("upload/", "upload/w_600/")}
                    style={{ height: 350, width: 600 }}
                  />
                  <div className="btn-upload-image flex justify-center items-center mt-2">
                    <button
                      className=" border-2 px-4 py-2 rounded w-1/2 btn-danger"
                      onClick={handleCancel}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <div
                  className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
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
