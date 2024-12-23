import React from "react";
import "./Loader.css"; 

const Loader = ({ type = "spinner", message = "Loading...", isLoading = true, size = "lg" }) => {
  if (!isLoading) return null;

  if (type === "spinner") {
    return (
      <div className={`d-flex justify-content-center align-items-center my-3`}>
        <div className={`spinner-border text-primary`} role="status" style={{ width: size === "lg" ? "3rem" : "2rem", height: size === "lg" ? "3rem" : "2rem" }}>
          <span className="visually-hidden">{message}</span>
        </div>
      </div>
    );
  }

  if (type === "dots") {
    return (
      <div className="d-flex justify-content-center align-items-center my-3">
        <div className="dot-loader">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    );
  }

  if (type === "text") {
    return (
      <div className="d-flex justify-content-center align-items-center my-3">
        <p>{message}</p>
      </div>
    );
  }

  return null;
};

export default Loader;
