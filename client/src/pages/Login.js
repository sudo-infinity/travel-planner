import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
// import { LOGIN_USER } from "../utils/mutations";
import validator from "validator";
import { loginUser } from "../api/auth";

import "../style/signup-login.css";

// import Auth from "../utils/auth";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

  const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
      const res = await loginUser(data);
			localStorage.setItem("token", res.data);
      localStorage.setItem("id", res.id);
      localStorage.setItem("username", res.username);
			window.location = "/";
		} catch (error) {
				setError(error.response);
		}
	};

  const resetValidation = (e) => {
    e.target.classList.remove("is-invalid");
    e.target.classList.remove("is-valid");
  };

  const validation = (e) => {
    if (e.target.type === "email") {
      if (validator.isEmail(e.target.value)) {
        e.target.classList.add("is-valid");
      } else {
        e.target.classList.add("is-invalid");
      }
    } else if (e.target.type === "password") {
      if (e.target.value.length >= 5) {
        e.target.classList.add("is-valid");
      } else {
        e.target.classList.add("is-invalid");
      }
    } else if (e.target.value === "") {
      e.target.classList.add("is-invalid");
    } else {
      e.target.classList.add("is-valid");
    }
  };

  return (
    <div className="mt-3">
      <div className="form-signup-login form-login w-100 m-auto">
          <form onSubmit={handleFormSubmit}>
            <h2 className="h3 mb-3 fw-normal">Please login</h2>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                onFocus={resetValidation}
                onBlur={validation}
              />
              <div className="invalid-feedback m-2">Invalid email address</div>
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                onFocus={resetValidation}
                onBlur={validation}
              />
              <div className="invalid-feedback m-2">
                Password must be at least 5 characters
              </div>
              <label htmlFor="password">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-outline-dark" type="submit">
              Submit
            </button>
            <div className="text-center mt-3">
              <Link to="/signup">Create an account</Link>
            </div>
          </form>
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default Login;
