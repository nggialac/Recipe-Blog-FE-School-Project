import http from "../apis/http-common";

const getAllRecipe = () => {
    return http.get("recipe");
}

const getAllRecipe_Page = (params) => {
  return http.get("recipe/pagination", {params});
}

const getAllRecipe_Page_Desc = (params) => {
  return http.get("recipe/pagination/desc", {params});
}

const getRecipeById = id => {
    return http.get(`recipe/${id}`);
  };

const getRecipeByIdWithCategory = id =>{
  return http.get(`recipe/details/${id}/fc`);
}

  const createRecipe = data => {
      return http.post("recipe", data);
  }

  const createRecipeWithCategory = data => {
    return http.post("recipe/create/fc", data);
  }

  const updateRecipe = (id, data) => {
    return http.put(`recipe/${id}`, data);
  };

  const updateRecipeWithCategory = (id, data) => {
    return http.put(`recipe/update/${id}/fc`, data);
  };
  
  const removeRecipe = id => {
    return http.delete(`recipe/${id}`);
  };

  const removeRecipeWithCategory = id =>{
    return http.delete(`recipe/delete/${id}/fc`);
  }
  
  const removeAllRecipe = () => {
    return http.delete(`recipe`);
  };
  
  const findByRecipeName = name => {
    return http.get(`recipe/recipename?name=${name}`);
  };

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAllRecipe,
    getAllRecipe_Page,
    getAllRecipe_Page_Desc,
    getRecipeById,
    getRecipeByIdWithCategory,
    createRecipe,
    createRecipeWithCategory,
    updateRecipe,
    updateRecipeWithCategory,
    removeRecipe,
    removeRecipeWithCategory,
    removeAllRecipe,
    findByRecipeName
};