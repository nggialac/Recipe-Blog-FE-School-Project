/* eslint-disable import/no-anonymous-default-export */
import http from "../apis/http-common";

const getAllTips = () => {
  return http.get(`tips`);
};

const getTipsById = (id) => {
  return http.get(`tips/${id}`);
};

const getAllTips_Page = (params) => {
  return http.get("tips/pagination", { params });
};

const createTips = (data) => {
  return http.post(`tips`, data);
};

const updateTips = (tipsId, data) => {
  return http.put(`tips/${tipsId}`, data);
};

const removeTips = (tipsId) => {
  return http.delete(`tips/${tipsId}`);
};

export default {
  getAllTips,
  getTipsById,
  getAllTips_Page,
  createTips,
  updateTips,
  removeTips,
};
