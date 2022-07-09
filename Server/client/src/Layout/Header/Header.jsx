import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { UserContextCreate } from "../../Context/userContext";

import "./Header.css";
import { useContext } from "react";
function Header() {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(UserContextCreate);

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
      dispatch({ type: "USER", payload: false });
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
        <NavLink
          onClick={() => setOpen(false)}
          to="/"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          Home
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          to="/About"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          About
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          to="/Contact"
          className={({ isActive }) =>
            isActive ? "active navlink" : "navlink"
          }
        >
          Contact
        </NavLink>
        {state.loggedIn ? (
          <NavLink
            onClick={() => {
              setOpen(false);
              logoutHandler();
            }}
            to="/Login"
            className={({ isActive }) =>
              isActive ? "active navlink" : "navlink"
            }
          >
            Logout
          </NavLink>
        ) : (
          <>
            {" "}
            <NavLink
              onClick={() => setOpen(false)}
              to="/Login"
              className={({ isActive }) =>
                isActive ? "active navlink" : "navlink"
              }
            >
              Login
            </NavLink>
            <NavLink
              onClick={() => setOpen(false)}
              to="/Register"
              className={({ isActive }) =>
                isActive ? "active navlink" : "navlink"
              }
            >
              Sign Up
            </NavLink>
          </>
        )}
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
