import http from "./http-common-login";

const changePassword = (id, params) => {
  return http.post(`user/${id}`, null, { params });
};

const createUser = (data) => {
  return http.post("user", data);
};

export default {
  changePassword,
  createUser,
};
