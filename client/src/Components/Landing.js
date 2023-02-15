import React from "react";
import gjspic from "../assets/gjspic.png";
export default function Landing() {
  return (
    <div className="Landing-page">
      <div className="Landing-page-main">
        <div className="Landing-page-main-left">
          <h1>Build Webpages Like a pro</h1>
          <p>
            The builder is designed for businesses, bloggers, artists, and
            anyone else who wants to create a professional-looking website
            without spending a lot of time or money. With our user-friendly
            interface and helpful support team, you can get your website up and
            running in no time. Try our website builder today and see how easy
            it is to create a stunning website that will impress your audience
            and help you achieve your goals.
          </p>
          <button>Get Started</button>
        </div>
        <div className="Landing-page-main-right">
          <img src={gjspic} alt="gjs pic" />
        </div>
      </div>
    </div>
  );
}
