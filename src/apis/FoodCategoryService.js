import http from "../apis/http-common";

const getAllCategory = () => {
    return http.get("foodcategory/all/recipe");
}

const createFc = (data) => {
    return http.post("foodcategory/create", data);
}

const createFcByRecipe = (data) => {
    return http.post("foodcategory/create/recipe", data);
}

const updateFcByRecipe = (id, data) => {
    return http.put(`foodcategory/update/${id}/recipe`, data);
}

const deleteFc = (id) => {
    return http.delete(`foodcategory/delete/${id}/recipe`);
}

export default {
    getAllCategory,
    createFc,
    createFcByRecipe,
    updateFcByRecipe,
    deleteFc,
}