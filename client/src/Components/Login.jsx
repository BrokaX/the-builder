import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    setErrors("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await userLogin(user);
      if (
        res.email === "Email field Cannot be Empty" ||
        res.password === "Password field cannot be Empty" ||
        res.passwordincorrect === "Incorrect Email or Password" ||
        res.emailnotfound === "Incorrect Email or Password"
      ) {
        setErrors(res);
        toast.error("Unable to login, please check your details", {
          position: toast.POSITION.BOTTOM_RIGHT,
          style: { backgroundColor: "#1b3152", color: "#d7eefa" },
        });
      }
    } catch (error) {
      console.log(error);
      if (error.emailnotfound === "Incorrect Email or Password") {
        setErrors({ ...error, emailnotfound: "Account not found" });
        console.log(error);
      }
    }
    const res = await userLogin(user);
    const token = res.token;
    if (res.user) {
      localStorage.setItem("details", JSON.stringify(res.user));
      authHeader(token);
      toast.success(`Welcome ${res.user.name}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
        style: { backgroundColor: "#1b3152", color: "#d7eefa" },
      });
      navigate("/profile");
    }
  };

  return (
    <div className="Register-container">
      <div className="form-container">
        <div className="Register-title">
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
              error={errors.password || errors.passwordincorrect}
              id="password"
              type="password"
              name="password"
            />
            {errors.password && (
              <span className="error">
                {errors.password || errors.passwordincorrect}
              </span>
            )}
            {errors.passwordincorrect && (
              <span className="error">{errors.passwordincorrect}</span>
            )}
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="already-have-an-account">
          Don't have an account yet? <Link to="/register">Create one</Link>
        </p>
        {errors.emailnotfound && (
          <span className="error">{errors.emailnotfound}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
