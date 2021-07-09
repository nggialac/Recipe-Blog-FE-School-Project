import React, { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import NavDashboard from "./components/NavDashboard";
import Cookies from "js-cookie";
import axios from "axios";

const DashboardGeneral = (props) => {
  const history = useHistory();
  const [fullName, setFullName] = useState("");
  const [info, setInfo] = useState();
  const [isLogged, setIsLogged] = useState(props.isLogged);

  useEffect(() => {
    if (
      Cookies.get("__session") === "" ||
      Cookies.get("__session") === undefined ||
      isLogged === false
    ) {
      history.push({
        pathname: "/login",
      });
    } else getDataUser();
  }, [fullName]);

  var config = {
    method: "post",
    url: "https://recipe-server-app.herokuapp.com/login/decodejwt",
    headers: {
      Authorization: `Bearer ${Cookies.get("__session")}`,
    },
  };

  async function getDataUser() {
    axios(config)
      .then((res) => {
        setFullName(res.data.fullName);
        setInfo(res.data);
        setIsLogged(true);
      })
      .catch((e) => {
        console.log(e);
        setIsLogged(false);
      });
  }

  return (
    <div>
      <NavDashboard fullName={fullName} info={info}/>
    </div>
  );
}

export default withRouter(DashboardGeneral);