import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import FcCard from "./FcCard";

export default function FcList(props) {
  const deleteFcHandler = (id) => {
    props.getFcId(id);
  };

  useEffect(() => {
    // console.log(props);
    props.retrieveFc();
  }, []);

  return (
    <div>
      <div className="main-tips">
        <h2>
          Food Category List
          {/* <Link to={`/dashboard/tips`}>
          <button className="ui button pink right">Back</button>
        </Link> */}
          <Link to={`/dashboard/fc/add`}>
            <button className="ui button blue right">Add Food category</button>
          </Link>
        </h2>
        <div className="ui celled list">
          {props.fc.map((data) => {
            return (
              <FcCard
                fc={data}
                clickHander={deleteFcHandler}
                key={data.foodCategoryId}
                // recipeId={props.recipeId}s
              />
            );
          })}
          ;
        </div>
      </div>
    </div>
  );
}
