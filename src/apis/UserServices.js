import http from "../apis/http-common";
// import axios from "axios";
// import Cookies from "js-cookie";

const getUser = () => {
  return http.get("recipe");
};

// const getName = () => {
//   axios
//     .get("https://recipe-server-app.herokuapp.com/login/decodejwt", {
//       headers: {
//         Authorization: Cookies.get("__session"),
//       },
//     })
//     .then(
//       (response) => {
//         var response = response.data;
//       },
//       (error) => {
//         var status = error.response.status;
//       }
//     );
// };

export default {
  getUser,
};
