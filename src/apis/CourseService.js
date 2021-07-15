/* eslint-disable import/no-anonymous-default-export */
import http from "../apis/http-common";

const getAllCourse = (id) => {
  return http.get(`recipe/${id}/course`);
};

const getCourseByCourseId = (id) => {
  return http.get(`course/${id}`);
};

const getAllCourse_Page = (params) => {
  return http.get(`course/pagination`, { params });
};

const getAllCourse_Page_Desc = (params) => {
  return http.get(`course/pagination/desc`, { params });
};

const getCoursesByRecipeId = (id, params) => {
  return http.get(`recipe/${id}/course/pagination`, { params });
};

const createCourseById = (id, data) => {
  return http.post(`recipe/${id}/course`, data);
};

const updateCourseById = (id, orderId, data) => {
  return http.put(`recipe/${id}/course/${orderId}`, data);
};

const removeACourseByIdAndRecipeId = (id, order) => {
  return http.delete(`recipe/${id}/course/${order}`);
};

const removeCourseById = (order) => {
  return http.delete(`course/${order}`);
};

export default {
  getCourseByCourseId,
  getCoursesByRecipeId,
  getAllCourse,
  getAllCourse_Page_Desc,
  getAllCourse_Page,
  createCourseById,
  updateCourseById,
  removeACourseByIdAndRecipeId,
  removeCourseById,
};
