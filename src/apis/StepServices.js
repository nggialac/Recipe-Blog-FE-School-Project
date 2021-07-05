/* eslint-disable import/no-anonymous-default-export */
import http from "../apis/http-common";

const getStepById = (id) => {
  return http.get(`recipe/${id}/recipestep`);
};

const createStepById = (id, data) => {
  return http.post(`recipe/${id}/recipestep`, data);
};

const updateStepById = (id, data) => {
  return http.put(`recipe/${id}/recipestep`, data);
};

const removeAStepById = (id, order) => {
  return http.delete(`recipe/${id}/recipestep/${order}`);
};

export default {
  getStepById,
  createStepById,
  updateStepById,
  removeAStepById,
};
