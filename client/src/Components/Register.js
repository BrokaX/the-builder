import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userRegister, userLogin } from "../apiHelpers";
import { useNavigate } from "react-router";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userRegister(user);
      if (
        res.email === "Email field Cannot be Empty" ||
        res.password === "Password must be at least 8 characters" ||
        res.name === "Name field Cannot be Empty" ||
        res.password2 === "Confirm password field Cannot be Empty" ||
        res.password === "Password field Cannot be Empty" ||
        res.password2 === "Passwords do not match"
      ) {
        setErrors(res);
        console.log("1" + res);
      } else {
        await userLogin(res.email, res.password);
        navigate("/login");
      }
    } catch (error) {
      if (error.message === "Email already exists") {
        setErrors({ ...errors, email: "Email already exists" });
      }
    }
  };

  return (
    <div className="Register-container">
      <div className="form-container">
        <div className="Register-title">
          <h4>Create an Account</h4>
        </div>
        <form className="register-form" noValidate onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Username</label>
            <input
              onChange={onChange}
              value={user.name}
              error={errors.name}
              id="name"
              type="text"
              name="name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              onChange={onChange}
              value={user.email}
              error={errors.email}
              id="email"
              type="email"
              name="email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={onChange}
              value={user.password}
              error={errors.password}
              id="password"
              type="password"
              name="password"
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              onChange={onChange}
              value={user.password2}
              error={errors.password2}
              id="password2"
              name="password2"
              type="password"
            />
            {errors.password2 && (
              <span className="error">{errors.password2}</span>
            )}
          </div>
          <div>
            <button>Sign-up</button>
          </div>
          {errors.general && <span className="error">{errors.general}</span>}
        </form>
        <p className="already-have-an-account">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
