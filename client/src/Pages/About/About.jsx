import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import avatar from "../../Assets/avatar.jpg";
import Loader from "../../Components/Loader";
function About() {
  const [profile, setProfile] = useState({
    name: "",
    work: "",
    phone: "",
    email: "",
    id: "",
  });
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [change, setChange] = useState({
    phone: "",
    work: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();
  //fetching the data
  const fetchFunc = async () => {
    setLoader(true);
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
      setProfile((prev) => {
        return {
          ...prev,
          phone: data.phone,
          work: data.work,
          email: data.email,
          id: data._id,
          name: data.name,
        };
      });
      setLoader(false);
    } catch (err) {
      navigate("/Login");
    }
  };
  useEffect(() => {
    fetchFunc();
  }, []);
  //sending post request to change the data boiiiiii
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/change", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: change.name ? change.name : profile.name, //so if field left empty the name in db doesnot get empty
          work: change.work ? change.work : profile.work,
          phone: change.phone ? change.phone : profile.phone,
          email: change.email ? change.email : profile.email,
          checkEmail: change.email ? true : false,
          id: profile.id,
        }),
      });
      const data = await response.json();
      setLoader(true);
      if (data.err === "Email Already Used") {
        alert("Email already registered boi");
        setLoader(false);
      } else if (data.message === "changes saved") {
        fetchFunc();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //input handler-----------------
  const inputHandler = (e) => {
    const inputName = e.target.name;
    setChange((prev) => {
      return { ...prev, [inputName]: e.target.value };
    });
  };
  return loader ? (
    <Loader />
  ) : (
    <div className="about-cont">
      <div
        onClick={() => setOpen(false)}
        className={`overlay ${open ? "display" : ""}`}
      ></div>
      <form
        onSubmit={submitHandler}
        className={`edit-box ${open ? "display" : ""}`}
      >
        <input
          onChange={inputHandler}
          value={change.name}
          type="text"
          placeholder="name"
          name="name"
        />
        <input
          onChange={inputHandler}
          value={change.phone}
          type="text"
          placeholder="phone"
          name="phone"
        />
        <input
          onChange={inputHandler}
          value={change.work}
          type="text"
          placeholder="work"
          name="work"
        />
        <input
          onChange={inputHandler}
          value={change.email}
          type="text"
          placeholder="email"
          name="email"
        />
        <button onClick={() => setOpen(false)} className="submit">
          Submit
        </button>
      </form>
      <div className="about">
        <div className="left-about">
          <img src={avatar} alt="" />
        </div>
        <div className="right-about">
          <div className="top-about">
            <div className="name-about">
              <h2>{profile.name}</h2>
              <p>{profile.work}</p>
            </div>
            <button onClick={() => setOpen(true)} className="edit-profile">
              Edit Profile
            </button>
          </div>
          <div className="bottom-about">
            <h1>About</h1>
            <div className="row-about">
              <h3>User Id</h3>
              <p>{profile.id}</p>
            </div>
            <div className="row-about">
              <h3>Name</h3>
              <p>{profile.name}</p>
            </div>
            <div className="row-about">
              <h3>Email</h3>
              <p>{profile.email}</p>
            </div>
            <div className="row-about">
              <h3>Phone</h3>
              <p>{profile.phone}</p>
            </div>
            <div className="row-about">
              <h3>Profession</h3>
              <p>{profile.work}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
