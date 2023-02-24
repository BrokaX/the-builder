import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin, authHeader } from "../apiHelpers";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin(user);
      const token = res.token;
      localStorage.setItem("details", JSON.stringify(res.user))
      console.log(res.user)
      authHeader(token);
      navigate("/profile");
    } catch (error) {
      setErrors({ ...errors, message: error.message });
    }
  };

  return (
    <div className="Register-container">
      <div className="form-container">
      <div className="Register-container-title">
        <h4>Login to your account</h4>
      </div>
      <form className="register-form" noValidate onSubmit={onSubmit}>
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
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      <p className="already-have-an-account">
        Don't have an account yet? <Link to="/register">Create one</Link>
      </p>
    </div></div>
  );
};

export default Login;
