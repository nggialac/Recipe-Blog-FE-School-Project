import React from "react";
import "../css/AboutUs.css";
import Navbar from "../components/Navbar";
import imgLac from "../images/lac.jpg";
import { start } from "@popperjs/core";
import { Link } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import imgKhuong from "../images/khuong.jpg";
import creative from "../images/creative.jpg";
import Footer from "../components/Footer";

export default function AboutUs() {
  return (
    <div>
      <Navbar isActive={true} />
      <div className="about-us">
        <img src={creative} alt="backgroundimg" />
        <div className="container">
          <div className="intro">
            <h3>Với mong muốn đem những bữa cơm </h3>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="our-team">
                <div className="pic">
                  <img src={imgLac} alt="avatar" className="img-ava" />
                </div>
                <h3 className="title">Lac Nguyen</h3>
                <span className="post">Web Dev</span>

                <ul className="social">
                  <li>
                    <Link href="#" className="fa fa-facebook" alt="icon"></Link>
                  </li>
                  <li>
                    <Link href="#" className="fa fa-twitter" alt="icon"></Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="fa fa-google-plus"
                      alt="icon"
                    ></Link>
                  </li>
                  <li>
                    <Link href="#" className="fa fa-linkedin" alt="icon"></Link>
                  </li>
                </ul>
              </div>
            </div>

              <div className="col-md-4 col-sm-6">
                <div className="our-team">
                  <div className="pic">
                    <img src={imgKhuong} className="img-ava" alt="avatar" />
                  </div>
                  <h3 className="title">Khuong Dao</h3>
                  <span className="post">Mobile Dev</span>

                  <ul className="social">
                    <li>
                      <Link
                        href="#"
                        className="fa fa-facebook"
                        alt="icon"
                      ></Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="fa fa-twitter"
                        alt="icon"
                      ></Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="fa fa-google-plus"
                        alt="icon"
                      ></Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="fa fa-linkedin"
                        alt="icon"
                      ></Link>
                    </li>
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
