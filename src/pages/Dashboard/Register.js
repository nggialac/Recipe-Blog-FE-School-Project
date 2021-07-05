import React from "react";

export default function Register(props) {
  return (
    <div>
      {props.fullName ? (
        <h1>Hello {props.fullName}</h1>
      ) : (
        <h1>None authentication!</h1>
      )}
    </div>
  );
}
