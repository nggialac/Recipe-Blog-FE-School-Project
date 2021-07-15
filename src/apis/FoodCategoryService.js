import http from "../apis/http-common";

const getAllCategory = () => {
  return http.get("foodcategory/all/recipe");
};

const getAllCategory_Page = (params) => {
  return http.get("foodcategory/all/recipe/pagination", { params });
};

const createFc = (data) => {
  return http.post("foodcategory/create", data);
};

const createFcByRecipe = (data) => {
  return http.post("foodcategory/create/recipe", data);
};

const updateFcByRecipe = (id, data) => {
  return http.put(`foodcategory/update/${id}/recipe`, data);
};

const deleteFc = (id) => {
  return http.delete(`foodcategory/delete/${id}/recipe`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAllCategory,
  getAllCategory_Page,
  createFc,
  createFcByRecipe,
  updateFcByRecipe,
  deleteFc,
};
