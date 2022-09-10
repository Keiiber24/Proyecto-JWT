import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>
        <div className="ml-auto d-flex">
          <div className=" ms-2">
            {localStorage.getItem("jwt-token") ? (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  console.log("test");
                  localStorage.removeItem("jwt-token");
                  navigate("/login");
                }}
              >
                Logout!
              </button>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary">Login</button>
              </Link>
            )}
          </div>
          <div className="ms-2">
            <Link to="/sign-up">
              <button className="btn btn-success">Sign up!</button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
