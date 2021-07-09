import React from "react";
import {withRouter} from "react-router-dom";

const Dashboard = () => {
  //props: {name: string}
  return (
    <div style={{marginRight: 40}}>
      <h1>Welcome to Workspace!!!</h1>
    </div>
  );
};

export default withRouter(Dashboard);
