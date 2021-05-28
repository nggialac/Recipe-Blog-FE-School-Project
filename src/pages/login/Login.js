import React, { useState } from "react";
import "./css/Login.css";
import PropTypes from "prop-types";
import LoginServices from "../../apis/LoginServices";
// import LoginComponent from "./components/LoginComponent";
// import SignUpComponent from "./components/SignUpComponent";

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default function Login({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    LoginServices.getLogin({ username, password })
      .then((response) => {
        setToken(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Sign In</h3>

            <div className="form-group">
              <label>Username</label>
              <input
                className="username form-control"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                className="password form-control"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
            <p className="forgot-password text-right">
              Forgot password?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
