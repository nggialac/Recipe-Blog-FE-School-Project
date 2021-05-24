import React, { useState, useEffect, useRef } from "react";
import RecipeDataService from "../../apis/RecipeServices";
import "./AddRecipe.css";

var NEXT_PUBLIC_CLOUDINARY_CLOUDNAME = "recipe-photos";
var NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET = "qmzji0mo";

const AddRecipe = () => {
  const initialRecipeState = {
    //recipeId: 0,
    cookTime: 0,
    prepTime: 0,
    recipeDescription: "",
    recipeName: "",
    recipeImage: ""
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
      recipeImage: recipe.recipeImage
    };

    RecipeDataService.createRecipe(data)
      .then((response) => {
        setRecipe({
          id: response.data.id,
          cookTime: response.data.cookTime,
          prepTime: response.data.prepTime,
          recipeDescription: response.data.recipeDescription,
          recipeName: response.data.recipeName,
          recipeImage: response.data.recipeImage
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
    //console.log(image);
    //alert(image);
    recipe.recipeImage = image;
    console.log(recipe.recipeImage);
  }

  useEffect(() => {
    let isMounted = true;

    // function dragEnter(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }

    // function dragOver(e) {
    //   e.stopPropagation();
    //   e.preventDefault();
    // }

    // function drop(e) {
    //   e.stopPropagation();
    //   e.preventDefault();

    //   const dt = e.dataTransfer;
    //   const files = dt.files;

    //   handleFiles(files);
    // }

    // dropbox.current.addEventListener("dragenter", dragEnter, false);
    // dropbox.current.addEventListener("dragover", dragOver, false);
    // dropbox.current.addEventListener("drop", drop, false);

    // return () => {
    //   dropbox.current.removeEventListener("dragenter", dragEnter);
    //   dropbox.current.removeEventListener("dragover", dragOver);
    //   dropbox.current.removeEventListener("drop", drop);
    // };
    return () => {
      isMounted = false;
    };
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

          <div className="form-group" style={{display: 'none'}}>
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
              <h1 className="text-3xl text-center font-bold">
                Upload image to Cloudinary
              </h1>
              <div className="py-10">
                <div ref={dropbox} className="upload-image" style={{display: 'block'}}>
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
                          className=" border-2 px-4 py-2 rounded w-1/2"
                          onClick={handleCancel}
                          type="button"
                        >
                          Cancel
                        </button>
                        <button
                          className="border-2 px-4 py-2 rounded ml-2 w-1/2"
                          onClick={handleSave}
                          type="button"
                        >
                          Save
                        </button>
                      </div>
                    </>
                  ) : (
                    <div
                      className="bg-gray-200 border-4 border-dashed border-gray-400 rounded-lg"
                      style={{ height: 400, width: 600 }}
                    >
                      <form className="flex justify-center items-center h-full">
                        {progress === 0 ? (
                          <div className="text-gray-700 text-center">
                            <button
                              className="btn btn-primary"
                              onClick={handleImageUpload}
                              type="button"
                            >
                              Browse
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-700">{progress}%</span>
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

          <div className="upload-image">
            <button onClick={saveRecipe} className="btn btn-success">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddRecipe;