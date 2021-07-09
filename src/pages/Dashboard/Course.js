import { useState, useEffect, useHistory } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import CourseList from "./courseComponents/CourseList";
import CourseDetail from "./courseComponents/CourseDetail";
import EditCourse from "./courseComponents/EditCourse";
import AddCourse from "./courseComponents/AddCourse";
import CourseService from "../../apis/CourseService";
import "./css/Course.css";
import 'semantic-ui-css/semantic.min.css'

export default function Course(props) {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();
  const [tempParams, setTempParams] = useState({pageNumber: 0, pageSize: 10});
  const [count, setCount] = useState();

  const addCourse = async (course) => {
    const request = {
      ...course,
    };

    CourseService.createCourseById(id, request)
      .then((response) => {
        console.log(response.data);
        setCourses([...courses, response.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    console.log(props);
    retrieveCourse_Page(tempParams);
  }, []);

  // const retrieveCourse = async () => {
  //   CourseService.getAllCourse(id)
  //     .then((response) => {
  //       console.log(response.data);
  //       setCourses(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  const retrieveCourse_Page = async (params) => {
    setTempParams(params);
    CourseService.getCoursesByRecipeId(id, params)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data.courses);
        setCount(response.data.totalPages);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCourse = async (temp) => {
    CourseService.updateCourseById(id, temp.courseId, temp)
      .then((response) => {
        console.log(response.data);
        const {
          courseId,
          courseName,
          courseImage,
          courseContent,
          createBy,
          createDate,
        } = response.data;
        setCourses(
          courses.map((course) => {
            return course.courseId === courseId ? { ...response.data } : course;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const removeCourse = async (orderId) => {
    CourseService.removeACourseByIdAndRecipeId(id, orderId)
      .then((response) => {
        console.log(response.data);
        let newCourseList = courses.filter((course) => {
          return course.courseId !== orderId;
        });
        setCourses(newCourseList);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="course-wrapper">
      <div className="ui container">
        <Router>
          <div className="ui fixed">
            <div className="ui center">
              <h1>Course Manager</h1>
            </div>
          </div>

          <Switch>
            <Route
              path={`/dashboard/recipe/${id}/course`}
              exact
              render={(props) => (
                <CourseList
                  {...props}
                  courses={courses}
                  getCourseId={removeCourse}
                  recipeId={id}
                  retrieveTipsPages={retrieveCourse_Page}
                  count={count}
                  locate={props.history.location.pathname}
                />
              )}
            />
            <Route
              path={`/dashboard/recipe/${id}/course/add`}
              render={(props) => (
                <AddCourse {...props} addCourseHandler={addCourse} recipeId={id}/>
              )}
            />

            <Route
              path={`/dashboard/recipe/${id}/course/edit`}
              render={(props) => (
                <EditCourse {...props} updateCourseHandler={updateCourse} />
              )}
            />

            <Route path={`/dashboard/recipe/${id}/course/detail/:id`} component={CourseDetail} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
