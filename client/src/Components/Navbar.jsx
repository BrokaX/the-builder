import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../apiHelpers";

export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("details"));
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="Container-nav">
        <Link style={{ color: "white" }} className="Logo" to="/">
          <i className="Logo fab fa-html5">..Builder</i>
        </Link>
        <div className="Menu">
          {user ? (
            <>
              <Link to="/builder">
                <h5>Build</h5>
              </Link>
              <Link to="/profile">
                <h5>My-templates</h5>
              </Link>
              <Link onClick={handleLogout} to="/">
                <h5>Logout</h5>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <h5>Login</h5>
              </Link>
              <Link to="/register">
                <h5>Signup</h5>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
