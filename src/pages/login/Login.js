import React, { useState, useEffect } from "react";
import "./css/Login.css";
import LoginServices from "../../apis/LoginServices";
import SideImage from "./images/left_side.jpg";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  // useEffect(() => {
  // if()
  // }, [input])

  // if (redirect) {
  //   return <Redirect to="/dashboard" />;
  // }
  useEffect(() => {
    Cookies.get("__session") && Cookies.get("__session") !=="" ? setRedirect(true) : setRedirect(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginServices.getLogin({ username, password })
      .then((response) => {
        let temp = (response.data.token).slice(7, (response.data.token).length);
        console.log(temp);
        if(response.data.token) {
          Cookies.set("__session", temp);
          setRedirect(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return redirect ? (
    <Redirect to="/dashboard" />
  ) : (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={SideImage} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                {/* <div class="brand-wrapper">
                <img src={TopImage} alt="logo" class="logo"/>
              </div> */}
                <p className="login-card-description">Sign into your account</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="sr-only">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label className="sr-only">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="***********"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <input
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value="Submit"
                  />
                </form>

                {/* <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use.</a>
                  <a href="#!">Privacy policy</a>
                </nav> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
