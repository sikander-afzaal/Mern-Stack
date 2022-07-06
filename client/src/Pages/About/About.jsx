import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
function About() {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const response = await fetch("/about", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        if (!response.status === 200) {
          throw new Error("Token not verified");
        }
      } catch (err) {
        navigate("/Login");
      }
    };
    fetchFunc();
  }, []);

  return <div className="about">About</div>;
}

export default About;
