import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
// import { ADD_USER } from "../utils/mutations";
import validator from "validator";
import "../style/signup-login.css";
import { createUser } from "../api/users";

// import Auth from "../utils/auth";

const Signup = () => {
  const [data, setData] = useState({
		username: "",
    email: "",
    password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
    try {
      await createUser(data);
      navigate("/login");
    } catch (error) {
      setError(error.message);
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
      if (e.target.value.length >= 8) {
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
    <div className="form-signup-login form-signup w-100 m-auto mt-3">
      {false? (
        <p>
          Success! You may now head <Link to="/login">back to the login.</Link>
        </p>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <h2 className="h3 mb-3 fw-normal">Please sign up</h2>

          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={data.name}
              onChange={handleChange}
              onFocus={resetValidation}
              onBlur={validation}
            />
            <div className="invalid-feedback m-2">Username cannot be blank</div>
            <label htmlFor="username">Username</label>
          </div>

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
              Password must be at least 8 characters
            </div>
            <label htmlFor="password">Password</label>
          </div>
          <button
            className="w-100 btn btn-lg btn-outline-secondary"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error}</div>
      )}
    </div>
  );
};

export default Signup;
