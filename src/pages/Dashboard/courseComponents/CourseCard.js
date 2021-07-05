import {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import user from "../images/user.png";

const CourseCard = (props) => {
  const pathId = props.recipeId;
  useEffect(() => {
    // console.log(props);
  }, [])
  const {
    courseId,
    courseName,
    courseImage,
    courseContent,
    createBy,
    createDate,
  } = props.course;
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{ pathname: `/dashboard/recipe/${pathId}/course/detail/${courseId}`, state: { course: props.course, recipeId: props.recipeId} }}
        >
          <div className="header">{courseName}</div>
          <div>{courseContent}</div>
        </Link>
      </div>
      <i
        className="trash alternate outline icon"
        style={{ color: "red", marginTop: "7px", marginLeft: "10px" }}
        onClick={() => props.clickHander(courseId)}
      ></i>
      <Link to={{ pathname: `/dashboard/recipe/${pathId}/course/edit`, state: { course: props.course } }}>
        <i
          className="edit alternate outline icon"
          style={{ color: "blue", marginTop: "7px" }}
        ></i>
      </Link>
    </div>
  );
};

export default CourseCard;
