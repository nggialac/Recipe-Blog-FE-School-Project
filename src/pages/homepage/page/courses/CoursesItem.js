import React from "react";
import { Link } from "react-router-dom";

export default function CoursesItem(props) {
  return (
    <div>
      {props.courses ? (
        props.courses.map((course) => {
          return (
            <div className="row p-2 bg-white border rounded mt-2">
              <div className="col-md-3 mt-1">
                <img
                  className="img-fluid img-responsive rounded product-image"
                  src={course.courseImage}
                />
              </div>
              <div className="col-md-6 mt-1">
                <h5>{course.courseName}</h5>
                <div className="d-flex flex-row">
                  <span>{course.courseCreatedate}</span>
                </div>

                <p className="text-justify text-truncate para mb-0">
                  {course.courseContent}
                </p>
              </div>
              <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                {/* <div className="d-flex flex-row align-items-center">
                  <h4 className="mr-1">$13.99</h4>
                  <span className="strike-text">$20.99</span>
                </div> */}
                <div className="d-flex flex-column mt-4">
                  <Link to={`/courses/${course.courseId}`}>
                  <button className="btn btn-primary btn-sm" type="button">
                    Details
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}