import {useEffect} from "react";
import { Link } from "react-router-dom";
import user from "../images/user.jpg";

const CourseDetail = (props) => {
  const { courseName, courseContent, courseImage } = props.location.state.course;

  useEffect(() => {
    // console.log(props);
  }, []);

  return (
    <div className="main">
      <div className="ui card card-cdt centered">
        <div className="image">
          <img src={courseImage} alt="user" />
        </div>
        <div className="content">
          <div className="header">{courseName}</div>
          <div className="description" dangerouslySetInnerHTML={{ __html: courseContent }}></div>
        </div>
      </div>
      <div className="center-div">
        <Link to={`/dashboard/recipe/${props.location.state.recipeId}/course`}>
          <button className="ui button blue center">
            Back to course List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
