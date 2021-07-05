/* eslint-disable import/no-anonymous-default-export */
import http from "../apis/http-common";

const getAllIngredientById = (id) => {
  return http.get(`recipe/${id}/ingredient`);
};

const createIngredientById = (id, data) => {
  return http.post(`recipe/${id}/ingredient`, data);
};

const updateIngredientById = (id, orderId, data) => {
  return http.put(`recipe/${id}/ingredient/${orderId}`, data);
};

const removeAIngredientById = (id, order) => {
  return http.delete(`recipe/${id}/ingredient/${order}`);
};

export default {
  getAllIngredientById,
  updateIngredientById,
  createIngredientById,
  removeAIngredientById,
};
