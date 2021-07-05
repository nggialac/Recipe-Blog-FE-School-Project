import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import CourseService from "../../../../apis/CourseService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { start } from "@popperjs/core";
import CourseDetailItemMain from "./CourseDetailItemMain";

export default function CourseDetailItem() {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourseById(id);
  }, []);

  const getCourseById = (id) => {
    CourseService.getCourseByCourseId(id)
      .then((response) => {
        console.log(response.data);
        setCourse(response.data);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    //   https://www.skillshare.com/browse/cooking
    <div>
      <Navbar isActive={true} />
      <CourseDetailItemMain course={course} />
      <Footer />
    </div>
  );
}
