import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import "./Register.css";
import register from "../../Assets/register.svg";

function Register() {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    name: "",
    phone: "",
    work: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleInputs = (e) => {
    const inputName = e.target.name;
    setBody((prev) => {
      return { ...prev, [inputName]: e.target.value };
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    const repsonse = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await repsonse.json();
    switch (data.err) {
      case "please fill the fields":
        alert("please fill the fields");
        break;
      case "user already registered":
        alert("user already registered");
        break;
      case "two passwords not same":
        alert("two passwords not same");
        break;
      case "user failed to register":
        alert("user failed to register");
        break;
      case "user registered":
        navigate("/");
        break;

      default:
        navigate("/");
        break;
    }
  };

  return (
    <div className="register-cont">
      <div className="register">
        <form onSubmit={postData} className="left-register">
          <h1>Sign Up</h1>
          <div className="input-row">
            <FontAwesomeIcon icon={faUser} />
            <input
              onChange={handleInputs}
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              onChange={handleInputs}
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faPhone} />
            <input
              onChange={handleInputs}
              type="number"
              name="phone"
              id="phone"
              placeholder="Your Phone Number"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faBriefcase} />
            <input
              onChange={handleInputs}
              type="text"
              name="work"
              id="job"
              placeholder="Your Profession"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faLock} />
            <input
              onChange={handleInputs}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <div className="input-row">
            <FontAwesomeIcon icon={faLock} />
            <input
              onChange={handleInputs}
              type="password"
              name="cpassword"
              id="cpassword"
              placeholder="Confirm Your Password"
            />
          </div>
          <button className="submit">Register</button>
        </form>
        <div className="right-register">
          <img src={register} alt="" />
          <Link to={"/Login"}>Already Registered</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
