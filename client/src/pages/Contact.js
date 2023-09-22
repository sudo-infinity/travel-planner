import React from "react";
import logo from "../assets/group.png";

const Contact = () => {
  return (
    <div className="container mt-2">
      <h2 className="display-6">Contact</h2>
      <div className="row mb-3">
        <div className="col">
          <img
            src={logo}
            width="50%"
            alt="Team Procedural"
            className="rounded mx-auto d-block"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
