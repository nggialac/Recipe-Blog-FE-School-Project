import React, { useState, useEffect } from "react";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import DashboardGeneral from "./../Dashboard/DashboardGeneral";
import LoginServices from "../../apis/LoginServices";
import axios from "axios";
import Cookies from "js-cookie";

import Login from "./Login";
import Register from "./Register";
import "./css/LoginGeneral.css";

export default function LoginGeneral() {
  const [name, setName] = useState("");

  // if(!token) {
  //   return <Login setToken={setToken} />
  // }
  useEffect(() => {
    //console.log(Cookies.get("__session"));
    axios
      .post("https://recipe-server-app.herokuapp.com/login/decodejwt", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("__session")}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json, XMLHttpRequest",
        },
      })
      .then(
        (response) => {
          setName(response.data.fullname);
          console.log(response);
        },
        (e) => {
          console.log(e);
        }
      );
  }, [name]);

  return (
    <BrowserRouter>
      {/* <Nav name={name} setName={setName} /> */}
      <Route path="/dashboard" exact component={DashboardGeneral} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={() => <Register name={name} />} />
    </BrowserRouter>
  );
}
