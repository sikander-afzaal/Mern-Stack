import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Contact.css";
function Contact() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    email: "",
    desc: "",
    id: "",
  });
  const fetchData = async () => {
    try {
      const response = await fetch("/about", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setDetails((prev) => {
        return {
          ...prev,
          name: data.name,
          phone: data.phone,
          email: data.email,
          id: data._id,
        };
      });
    } catch (error) {
      navigate("/Login");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (data.message === "Thank you for contacting us") {
        alert("Thank you for contacting us");
        setDetails((prev) => {
          return { ...prev, desc: "" };
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const inputHandler = (e) => {
    const inputName = e.target.name;
    setDetails((prev) => {
      return { ...prev, [inputName]: e.target.value };
    });
  };
  return (
    <div className="contact-cont">
      <div className="contact">
        <h1>Get in Touch</h1>
        <form onSubmit={submitHandler}>
          <div className="input-row">
            <input
              onChange={inputHandler}
              value={details.name}
              type="text"
              name="name"
              placeholder="Your Name"
            />
            <input
              onChange={inputHandler}
              value={details.email}
              type="email"
              name="email"
              placeholder="Your Email"
            />
            <input
              onChange={inputHandler}
              value={details.phone}
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
            />
          </div>
          <textarea
            onChange={inputHandler}
            value={details.desc}
            name="desc"
            placeholder="Your Message"
          ></textarea>
          <button className="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
