import React, { useState } from "react";
import "./css/Login.css";
import PropTypes from "prop-types";
import LoginServices from "../../apis/LoginServices";

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
        //console.log(setToken);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //setToken(token);

  return (
    <div className="login-wrapper">
      <div className="wrapper">
        <h1>Login</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Username</p>
              <input
                name="username"
                type="text"
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              <p>Password</p>
              <input
                name="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
