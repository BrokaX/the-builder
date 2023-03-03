import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
import Carousel from "./Carousel";
import wizzard1 from "../../assets/landing/wizzard1.png"
import wizzard2 from "../../assets/landing/wizzard2.png"
import wizzard3 from "../../assets/landing/wizzard3.png"
import ContactForm from "./ContactForm";
import Footer from "./Footer";



export default function Landing() {
  const user = localStorage.getItem("user");
  return (
    <div className="landing-page">
      <div className="landing-page-main">
      <div className="landing-page-main-right">
          <div className="card-container">
            <Carousel />
          </div>
        </div>
        <div className="landing-page-main-left">
          
          <Link
            style={{ textDecoration: "none" }}
            to={user ? "/builder" : "/register"}
          >
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
 
      </div>
      <div className="section-one">
        <div className="section-one-div"><h1>Table of Contents</h1>
        <p>Generate tables of contents dynamically, easily & improve your articles readability and accessibility.</p>
        <img className="section-one-img" src={wizzard1} alt="" />
        </div>
        <div className="section-one-div"><h1>Instant Access</h1>
        <p>Excellent editor for beginners and professionals. Use text and style it with editor, add media or even html.</p>
        <img className="section-one-img" src={wizzard2} alt="" />
        </div>
        <div className="section-one-div"><h1>One Page</h1>
        <p>Create awesome one-page sites. For those who need simple websites with a smooth scroll effect.</p>
        <img className="section-one-img" src={wizzard3} alt="" />
        </div>
      </div>
      <ContactForm/>
      <Footer/>
    </div>
  );
}
