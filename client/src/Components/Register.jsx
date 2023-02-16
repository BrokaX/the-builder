import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="Register">
      <div>
        <h3>Create an account</h3>
        <form><label htmlFor="Name">Username</label>
          <input type="text" name="name" />
          <label htmlFor="Email">Email</label>
          <input type="Email" name="email" />
          <label htmlFor="Password">Password</label>
          <input type="password" name="password" />
          <label htmlFor="Password">Confirm Password</label>
          <input type="password" name="password2" />
        </form>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
