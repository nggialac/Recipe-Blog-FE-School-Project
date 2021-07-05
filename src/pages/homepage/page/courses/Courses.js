import { useState, useEffect } from "react";
import CourseService from "../../../../apis/CourseService";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import "./Courses.css";
import CoursesMain from "./CoursesMain";

export default function Courses() {
  return (
    <div>
      {" "}
      <Navbar isActive={true} />
      <CoursesMain />
      <Footer />
    </div>
  );
}
