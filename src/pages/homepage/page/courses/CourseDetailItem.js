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
  const [difCourse, setDifCourse] = useState();

  useEffect(() => {
    getCourseById(id);
    getCourseDifId();
  }, [id]);

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

  const getCourseDifId = (id) => {
    CourseService.getAllCourse_Page({name: null, pageNumber: 0, pageSize: 6})
      .then((response) => {
        console.log(response.data);
        // let temp = response.data.content.filter((data)=>{
        //   // if(data.courseId !== id && data.courseId !== 0) 
        //   return data !== course;
        // })
        setDifCourse(response.data.content);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    //   https://www.skillshare.com/browse/cooking
    <div>
      <Navbar isActive={true} />
      <CourseDetailItemMain course={course} difCourse={difCourse}/>
      <Footer />
    </div>
  );
}
