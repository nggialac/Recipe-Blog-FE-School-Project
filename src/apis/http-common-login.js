import axios from "axios";
import Cookies from "js-cookie";

export default axios.create({
  //baseURL: "http://localhost:8080/",
  baseURL: "https://recipe-server-app.herokuapp.com/login/",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, XMLHttpRequest",
    Authorization: `Bearer ${Cookies.get("__session")}`,
  },
});
