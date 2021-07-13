import React from "react";
import { start } from "@popperjs/core";
import image from "./images/image.jpg";
import {Link} from "react-router-dom";
import "./CourseDetailItem.css";

export default function CourseDetailItemMain(props) {
  return (
    <div>
      <main role="main">
        <div>
          <div class="">
            <div
              class="p-5 text-center bg-image rounded-3 jump"
              // style={{ backgroundImage: "url(" + image + ")" }}
              style={{
                backgroundImage: "url(" + props.course.courseImage + ")",
                objectFit: "cover",
                // backgroundSize:"cover",
                objectPosition: "center",
                backgroundRepeat: "inherit",
              }}
            >
              {/* <div class="mask">
                <div class="d-flex justify-content-center align-items-center h-300">
                  <div class="text-white">
                    <h1 class="mb-3">Heading</h1>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <div>
          <div className="album py-5 bg-light">
            <div className="container">
              <div className="">
                <h1 style={{ textAlign: start }}>{props.course.courseName}</h1>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="card mb-4 box-shadow">
                    <div className="card-body">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: props.course.courseContent,
                        }}
                      />
                      {/* {props.course.courseContent} */}
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {props.course.createDate}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <h3>List course of recipe</h3>
                    <ul>
                      {console.log(props.difCourse)}
                    {props.difCourse
                      ? props.difCourse.map((data) => {
                          if (data.courseId !== props.course.courseId)
                            return (
                              <Link to={`/courses/${data.courseId}`}>
                                <li>
                                  <h3 style={{marginTop: "6px"}} >{data.courseName}</h3>
                                </li>
                              </Link>
                            );
                        })
                      : ""}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
