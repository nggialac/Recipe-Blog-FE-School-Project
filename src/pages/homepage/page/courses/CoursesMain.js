import { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import CoursesItem from "./CoursesItem";
import CourseService from "../../../../apis/CourseService";
import img from "./images/image.jpg";

export default function CoursesMain(props) {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [searchName, setSearchName] = useState();
  const pageSizes = [5, 10, 20];

  useEffect(() => {
    getCourses();
  }, [page, pageSize]);

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

  const getCourses = () => {
    const params = getRequestParams(searchName, page, pageSize);
    CourseService.getAllCourse_Page(params)
      .then((response) => {
        let temp = response.data.content;
        setCourses(temp);
        setCount(response.data.totalPages);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  return (
    <div>
      <div
        class="p-5 text-center bg-image rounded-3 jump"
        // style={{ backgroundImage: "url(" + image + ")" }}
        style={{
          backgroundImage: "url(" + img + ")",
          objectFit: "cover",
          // backgroundSize:"cover",
          objectPosition: "center",
          backgroundRepeat: "inherit",
        }}
      ></div>
      <h1 className="pagesize-bar">Choose your Courses!</h1>
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
          {/* 
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          /> */}
        </div>
      </div>

      <div className="courses-body">
        <div classNameName="container mt-5 mb-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <CoursesItem courses={courses} />
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <div className="mt-3">
          <Pagination
            className="my-3"
            count={count}
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
}
