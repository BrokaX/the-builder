import React from "react";
import { Link } from "react-router-dom";
import gjspic from "../assets/gjspic.png";

export default function Landing() {
  return (
    <div className="landing-page">
      <div className="landing-page-main">
        <div className="landing-page-main-left">
          <h1>Build Webpages Like a Pro</h1>
          <p>
            The builder is designed for businesses, bloggers, artists, and
            anyone else who wants to create a professional-looking website
            without spending a lot of time or money. With our user-friendly
            interface and helpful support team, you can get your website up and
            running in no time. Try our website builder today and see how easy
            it is to create a stunning website that will impress your audience
            and help you achieve your goals.
          </p>
          <Link style={{ textDecoration: "none" }} to="/register">
            <button className="get-started-btn">Get Started</button>
          </Link>
        </div>
        <div className="landing-page-main-right">
        <div class="sliding-container">
  <div class="sliding-background"></div>
</div>
        </div>
      </div>
    </div>
  );
}
