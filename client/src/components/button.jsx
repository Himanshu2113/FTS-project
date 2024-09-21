import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function Button(props) {
  return (
    <div className="box">
      <h2>
        <Link to={props.l} style={{ textDecoration: "none" }}>
          {props.text}
        </Link>
      </h2>
    </div>
  );
}
