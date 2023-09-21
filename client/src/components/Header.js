import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
// import Auth from "../utils/auth";
import logo from "../assets/t-p-logo-sm.png";
import { currentUser } from "../api/users";

const styles= {
  header: {
    background: "white"
  }
}

const Header = () => {
  const isUserValid = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const logout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
		window.location.reload();
  };
  return (
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-4 border-bottom" style={styles.header}>
      <Link
        className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        to={`/`}
      >
        <img
          className="ms-3 me-2"
          src={logo}
          alt="Logo showing the world and the letters t and p"
          width="40"
          height="40"
        />
        <h1 className="bi fs-4">Travel Planner</h1>
      </Link>
      <NavBar />
      <div className="col-md-3 text-end">
        {isUserValid ? (
          <>
            <Link
              className="btn btn-outline-secondary me-2"
              to={`/#/`}
            >
              {username}
            </Link>
            <button className="btn btn-outline-dark me-2" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn-outline-secondary me-2" to="/login">
              Login
            </Link>
            <Link className="btn btn-outline-dark me-2" to="/signup">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
