import http from "../apis/http-common";
import axios from "axios";

const getLogin = data => {
    //return http.post("login", data);
    return axios.create({
        //baseURL: "http://localhost:8080/",
        baseURL: "https://recipe-server-app.herokuapp.com/",
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, XMLHttpRequest'
      }}).post("login", data);
}


// const getLogin = (data) => {
//     return http.post("login", data);
// }

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getLogin
};