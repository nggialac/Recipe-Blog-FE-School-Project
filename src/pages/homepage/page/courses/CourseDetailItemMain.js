import React from "react";
import { start } from "@popperjs/core";
import image from "./images/image.jpg";
import "./CourseDetailItem.css";

export default function CourseDetailItemMain(props) {
  return (
    <div>
      <main role="main">
        <div>
          <div class="">
            <div
              class="p-5 text-center bg-image rounded-3 jump"
              style={{ backgroundImage: "url(" + image + ")" }}
            >
              <div class="mask">
                {/* <div class="d-flex justify-content-center align-items-center h-300">
                  <div class="text-white">
                    <h1 class="mb-3">Heading</h1>
                    <h4 class="mb-3">Subheading</h4>
                    <a
                      class="btn btn-outline-light btn-lg"
                      href="#!"
                      role="button"
                    >
                      Call to action
                    </a>
                  </div>
                </div> */}
              </div>
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
                    {/* <img
                            className="card-img-top"
                            data-src=""
                            alt="Card image cap"
                          /> */}
                    <div className="card-body">
                      {/* <p className="card-text">
                              This is a wider card with supporting text below as
                              a natural lead-in to additional content. This
                              content is a little bit longer.
                            </p> */}
                      {props.course.courseContent}
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {props.course.courseCreateDate}
                        </small>
                      </div>
                    </div>
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
