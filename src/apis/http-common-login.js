import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api/",
    //baseURL: "https://recipe-server-app.herokuapp.com/api/",
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, XMLHttpRequest'
  }});