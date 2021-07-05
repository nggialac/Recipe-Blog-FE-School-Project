import React from "react";
import { BrowserRouter, Route } from "react-router-dom";


import Login from "./Login";
import "./css/LoginGeneral.css";
import DashboardGeneral from "../Dashboard/DashboardGeneral";

export default function LoginGeneral() {
  // const [fullName, setFullName] = useState("");
  // useEffect(() => {
  //   var config = {
  //     method: "post",
  //     //url: "https://recipe-server-app.herokuapp.com/login/decodejwt",
  //     url: "http://localhost:8080/login/decodejwt",
  //     headers: {
  //       Authorization: `Bearer ${Cookies.get("__session")}`,
  //     },
  //   };
  //   axios(config)
  //     .then((res) => {
  //       setFullName(res.data.fullname);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [fullName]);

  return (
    <BrowserRouter>
      <Route path="">
        <Login />
      </Route>
      <Route path="/dashboard">
        <DashboardGeneral />
      </Route>
    </BrowserRouter>
  );
}
