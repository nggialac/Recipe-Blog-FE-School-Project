import http from "../apis/http-common";

const getAllRecipe = () => {
    return http.get("recipe");
}

const getRecipeById = id => {
    return http.get(`recipe/${id}`);
  };

  const createRecipe = data => {
      return http.post("recipe", data);
  }

  const updateRecipe = (id, data) => {
    return http.put(`recipe/${id}`, data);
  };
  
  const removeRecipe = id => {
    return http.delete(`recipe/${id}`);
  };
  
  const removeAllRecipe = () => {
    return http.delete(`recipe`);
  };
  
  const findByRecipeName = name => {
    return http.get(`recipe/recipename?name=${name}`);
  };

export default {
    getAllRecipe,
    getRecipeById,
    createRecipe,
    updateRecipe,
    removeRecipe,
    removeAllRecipe,
    findByRecipeName
};