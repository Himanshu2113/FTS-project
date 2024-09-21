import { useEffect } from "react";
import "../App.css";

import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Navbar from "../components/Navbar";
// import Token from "../Submit/Login";
export default function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      // alert("Please login");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="top-heading">
        <h2 className="head home">
          Dive into a world where anonymity meets authenticity, offering a safe
          harbor to unveil your deepest feelings, thoughts, and secrets without
          inhibition.
        </h2>
        <br />
        <br />
        <Button text="Share your feelings" l="/submitfeelings" />
        <Button text="Share your thoughts" l="/submitthoughts" />
        <Button text="Share your secrets" l="/submitsecrets" />
      </div>
    </div>
  );
}
