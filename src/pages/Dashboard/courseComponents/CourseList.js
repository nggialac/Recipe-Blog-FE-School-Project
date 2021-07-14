import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import CourseCard from "./CourseCard";
import Pagination from "@material-ui/lab/Pagination";
import ListRecipe from "../ListRecipe";

const CourseList = (props) => {
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState();
  const [courses, setCourses] = useState([]);
  const pageSizes = [5, 10, 20];

  const getRequestParams = (searchName, page, pageSize) => {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["pageNumber"] = page - 1;
    }

    if (pageSize) {
      params["pageSize"] = pageSize;
    }
    return params;
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const paginate = () =>{
    const params = getRequestParams(searchName, page, pageSize);
    props.retrieveTipsPages(params);
  } 

  const deleteCourseHandler = (id) => {
    props.getCourseId(id);
  };

  useEffect(() => {
    console.log(props);
    console.log(props.locate);
    // setCourses(props.courses);
    paginate();
  }, [page, pageSize]);

  return (
    <div className="main-course">
      <h2>
        Course List
        {/* <Link to={`/dashboard/recipe`}> */}
          <button className="ui button pink right" onClick={()=>props.history.goBack()}>Back</button>
          {/* </Link> */}
        <Link to={`/dashboard/recipe/${props.recipeId}/course/add`}>
          <button className="ui button blue right">Add Course</button>
        </Link>

      </h2>
      <div className="ui celled list">
        {props.courses.length > 0 ? props.courses.map((course) => {
          return (
            <CourseCard
              course={course}
              clickHander={deleteCourseHandler}
              key={course.id}
              recipeId={props.recipeId}
            />
          );
        }): <h1>Empty!</h1>}
        ;
      </div>

      <div className="d-flex justify-content-center">
        <div className="mt-3">
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={props.count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default withRouter(CourseList);
