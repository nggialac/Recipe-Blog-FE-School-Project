import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function FcCard(props) {
  useEffect(() => {
    // console.log(props);
  }, []);
  const { foodCategoryId, foodCategoryName, recipe } = props.fc;
  return (
    <div className="item">
      <div className="content">
        <Link
          to={{
            pathname: `/dashboard/fc/detail/${foodCategoryId}`,
            state: { fc: props.fc },
          }}
        >
          <div className="header">{foodCategoryName}</div>
          {/* <div>{description}</div> */}
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(foodCategoryId)}
      ></i>
      <Link to={{ pathname: `/dashboard/fc/edit`, state: { fc: props.fc } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
}
