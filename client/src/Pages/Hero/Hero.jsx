import React, { useEffect, useState } from "react";
import "./Hero.css";
function Hero() {
  const [name, setName] = useState("");
  const fetchData = async () => {
    const response = await fetch("/about", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { name } = await response.json();
    setName(name);
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
