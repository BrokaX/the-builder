import React from "react";
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div className="Navbar">


      
      <div className="Container-nav">
      <Link style={{ color: 'white' }} className="Logo" to = {"/"}><div className="Logo">
          <i className="fab fa-html5">..  Builder</i>
        </div></Link>
        <div className="Menu">
          <Link to = {"/builder"}><h5>Build</h5></Link>
          <Link to = {"/profile"}><h5>My-templates</h5></Link>
          <h5>Login</h5>
          <h5>Signup</h5>
        </div>
      </div>
    </div>
  );
}
