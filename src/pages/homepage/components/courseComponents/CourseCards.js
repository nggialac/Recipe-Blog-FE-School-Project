import "../../css/Cards.css";
import CourseCardItem from "./CourseCardItem";

function CourseCards(props) {
  return (
    <div className="cards">
      <h1>Check out these COURSES!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items row">
            {props.courses ? (
              props.courses.map((course) => {
                return (
                  <CourseCardItem
                    courseId={course.courseId || ""}
                    src={course.courseImage || ""}
                    text={course.courseContent || ""}
                    label="Course"
                    path={`/${course.courseId || ""}`}
                  />
                );
              })
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseCards;
