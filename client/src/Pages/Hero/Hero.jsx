import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContextCreate } from "../../Context/userContext";
import "./Hero.css";
function Hero() {
  const [name, setName] = useState("");
  const { dispatch } = useContext(UserContextCreate);
  const fetchData = async () => {
    const response = await fetch("/about", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { name } = await response.json();
    if (name) {
      dispatch({ type: "USER", payload: true });
      setName(name);
    } else {
      dispatch({ type: "USER", payload: false });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="hero">
      {name ? (
        <p>
          Hi{" "}
          <span style={{ textTransform: "capitalize", fontWeight: "bold" }}>
            {name}
          </span>{" "}
          Welcome to Mern Stack Website
        </p>
      ) : (
        <p>Hi Welcome to Mern Stack Website</p>
      )}
    </div>
  );
}

export default Hero;
