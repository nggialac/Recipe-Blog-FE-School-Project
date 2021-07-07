import { useState, useEffect, useHistory } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import CourseList from "./courseComponents/CourseList";
import CourseDetail from "./courseComponents/CourseDetail";
import EditCourse from "./courseComponents/EditCourse";
import AddCourse from "./courseComponents/AddCourse";
import CourseService from "../../apis/CourseService";
import "./css/Course.css";
import 'semantic-ui-css/semantic.min.css'

export default function Course() {
  const [courses, setCourses] = useState([]);
  const { id } = useParams();

  const addCourse = async (course) => {
    console.log(course);
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
    console.log(id);
    retrieveCourse();
  }, []);

  const retrieveCourse = async () => {
    CourseService.getAllCourse(id)
      .then((response) => {
        console.log(response.data);
        setCourses(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCourse = async (recipeId, temp) => {
    CourseService.updateCourseById(recipeId, temp.courseId, temp)
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
    CourseService.removeACourseById(id, orderId)
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
                />
              )}
            />
            <Route
              path={`/dashboard/recipe/${id}/course/add`}
              render={(props) => (
                <AddCourse {...props} addCourseHandler={addCourse} recipeId={id}/>
              )}
            />
{/* 
            <Route
              path={`/dashboard/recipe/${id}/course/edit`}
              render={(props) => (
                <EditCourse {...props} updateCourseHandler={updateCourse} />
              )}
            /> */}

            <Route path={`/dashboard/recipe/${id}/course/detail/:id`} component={CourseDetail} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
