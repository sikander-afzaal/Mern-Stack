import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

import "./Header.css";
function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const home = useRef();
  const about = useRef();
  const login = useRef();
  const register = useRef();
  const contact = useRef();
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        document.querySelector(".active").classList.remove("active");
        home.current.classList.add("active");
        break;
      case "/About":
        document.querySelector(".active").classList.remove("active");
        about.current.classList.add("active");
        break;
      case "/Contact":
        document.querySelector(".active").classList.remove("active");
        contact.current.classList.add("active");
        break;
      case "/Login":
        document.querySelector(".active").classList.remove("active");
        login.current.classList.add("active");
        break;
      case "/Register":
        document.querySelector(".active").classList.remove("active");
        register.current.classList.add("active");
        break;

      default:
        break;
    }
  }, [location.pathname]);

  //logging out function by clearing the cookie
  const logoutHandler = async () => {
    const response = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.message) {
      alert(data.message);
    }
  };
  return (
    <div className="header">
      <h1 className="logo">MERNSTACK</h1>
      <div className={`right-header ${open ? "active-header" : ""}`}>
        <FontAwesomeIcon
          onClick={() => setOpen(false)}
          className="mobile"
          icon={faXmark}
        />
        <Link
          ref={home}
          onClick={() => setOpen(false)}
          to="/"
          className="nav-link active"
        >
          Home
        </Link>
        <Link
          ref={about}
          onClick={() => setOpen(false)}
          to="/About"
          className="nav-link"
        >
          About
        </Link>
        <Link
          ref={contact}
          onClick={() => setOpen(false)}
          to="/Contact"
          className="nav-link"
        >
          Contact
        </Link>
        <Link
          ref={login}
          onClick={() => setOpen(false)}
          to="/Login"
          className="nav-link"
        >
          Login
        </Link>
        <Link
          ref={register}
          onClick={() => setOpen(false)}
          to="/Register"
          className="nav-link"
        >
          Sign Up
        </Link>
        <Link
          onClick={() => {
            setOpen(false);
            logoutHandler();
          }}
          to="/Login"
          className="nav-link"
        >
          Logout
        </Link>
      </div>
      <FontAwesomeIcon
        onClick={() => setOpen(true)}
        className="mobile"
        icon={faBars}
      />
    </div>
  );
}

export default Header;
