import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";

import "./Signin.css";
import login from "../../Assets/login.svg";
function Signin() {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const inputHandler = (e) => {
    const inputName = e.target.name;
    if (inputName === "email-login") {
      setBody((prev) => {
        return { ...prev, email: e.target.value };
      });
    } else if (inputName === "password-login") {
      setBody((prev) => {
        return { ...prev, password: e.target.value };
      });
    }
  };
  const loginHandler = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (data.message === "login success") {
      navigate("/");
    } else if (data.err === "please fill the fields") {
      alert("please fill the fields");
    } else if (data.err === "credentials invalid") {
      alert("credentials invalid");
    }
  };
  return (
    <div className="login-cont">
      <div className="login">
        <div className="left-login">
          <img src={login} alt="" />
          <Link to="/Register">Not a Member</Link>
        </div>
        <form onSubmit={loginHandler} className="right-login">
          <h1>Sign In</h1>
          <div className="input-row">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              onChange={inputHandler}
              type="email"
              name="email-login"
              id="email-login"
              placeholder="Your Email"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faUser} />
            <input
              onChange={inputHandler}
              type="password"
              name="password-login"
              id="password-login"
              placeholder="Enter Password"
            />
          </div>
          <button className="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
