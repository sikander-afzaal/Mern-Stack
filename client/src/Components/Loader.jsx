import React from "react";
import loader from "../Assets/loader.gif";
function Loader() {
  return (
    <div className="loader">
      <h1>Please Wait</h1>
      <img src={loader} alt="" />
    </div>
  );
}

export default Loader;
