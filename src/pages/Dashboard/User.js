import React from "react";
import user from "./images/user.jpg";
import {Link} from "react-router-dom";

export default function User(props) {
  return (
    <div>
      <div className="main">
        <div className="ui card centered">
          <div className="image">
            <img src={user} alt="avatar" />
          </div>
          <div className="content">
            <div className="header">{props.info.fullName}</div>
            <div className="description">{props.info.role}</div>
          </div>
        </div>
      </div>
      <div className="center-div" style={{marginTop: 50}}>
      <Link to={`/dashboard/user/changepw`}>
          <button className="ui button blue center">
            Change Password
          </button>
        </Link>
      </div>
    </div>
  );
}
