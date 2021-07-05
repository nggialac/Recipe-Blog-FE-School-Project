/* eslint-disable import/no-anonymous-default-export */
import http from "../apis/http-common";

const getAllCourse = (id) => {
  return http.get(`recipe/${id}/course`);
};

const getCourseByCourseId = (id) => {
  return http.get(`course/${id}`);
};

const getAllCourse_Page = (params) => {
  return http.get("course/pagination", { params });
};

const createCourseById = (id, data) => {
  return http.post(`recipe/${id}/course`, data);
};

const updateCourseById = (id, orderId, data) => {
  return http.put(`recipe/${id}/course/${orderId}`, data);
};

const removeACourseById = (id, order) => {
  return http.delete(`recipe/${id}/course/${order}`);
};

export default {
  getCourseByCourseId,
  getAllCourse,
  getAllCourse_Page,
  createCourseById,
  updateCourseById,
  removeACourseById,
};
