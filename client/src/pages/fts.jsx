import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../App.css";

export default function FTS(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="top-heading">
        <h1 className="size_h1">{props.h1}</h1>
        <br />
        <button className="box top-heading buttons">
          <Link
            to={props.submit}
            className="size_button"
            style={{ textDecoration: "none" }}
          >
            {props.h2}
          </Link>
        </button>
      </div>
      <br />
      <div>
        <div
          style={{
            border: "3px solid white",
            borderRadius: "30px",
            margin: "10px",
            padding: "10px",
            backgroundColor: "#00FF00",
          }}
          className="top-heading"
        >
          {props.fetch}
        </div>
      </div>
    </div>
  );
}
