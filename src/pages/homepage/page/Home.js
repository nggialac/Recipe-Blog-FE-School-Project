import React from "react";
import "../css/HomeApp.css";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import CourseCards from "../components/courseComponents/CourseCards";

function Home(props) {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Cards recipes={props.recipes} />
      <CourseCards courses={props.courses} />
      <Footer />
    </>
  );
}

export default Home;
