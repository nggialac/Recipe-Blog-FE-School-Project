import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import CourseCard from "./CourseCard";

import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { DataGrid } from '@material-ui/data-grid';
import ListRecipe from "../ListRecipe";



const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const CourseList = (props) => {
  
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [goBack, setGoBack] = useState(false);
  let history = useHistory();


  const deleteCourseHandler = (id) => {
    props.getCourseId(id);
  };

  useEffect(() => {
    // console.log(props);
    
  }, []);

  return (
    <div className="main-course">
      <h2>
        Course List
        <Link to={`/dashboard/recipe`}>
          <button className="ui button pink right" >Back</button>
          </Link>
        <Link to={`/dashboard/recipe/${props.recipeId}/course/add`}>
          <button className="ui button blue right">Add Course</button>
        </Link>

      </h2>
      <div className="ui celled list">
        {props.courses.map((course) => {
          return (
            <CourseCard
              course={course}
              clickHander={deleteCourseHandler}
              key={course.id}
              recipeId={props.recipeId}
            />
          );
        })}
        ;
      </div>
    </div>
  );
};

export default CourseList;
