import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function SubmitThoughts() {
  const navigate = useNavigate();
  const [thought, setThought] = useState({
    thoughts: "",
    reasont: "",
  });

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    fetch("/api/submitt", {
      // method: "POST",
      headers: {
        // "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          navigate("/login");
        }
        console.log(data);
      });
  });

  const handleThought = (e) => {
    e.persist();
    setThought({ ...thought, [e.target.name]: e.target.value });
    // console.log(thought);
  };
  const saveThought = (e) => {
    e.preventDefault();
    const data = {
      thoughts: thought.thoughts,
      reasont: thought.reasont,
    };
    if (!data.thoughts) return notifyA("Please fill all the fields");
    else if (!data.reasont) {
      return notifyA("Please fill all the fields");
    }
    // console.log(data);
    const serializedBody = JSON.stringify(data);
    const fetchOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: serializedBody,
    };
    fetch("http://localhost:3000/api/submitt", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          navigate("/login");
        } else {
          notifyB(data.message);
          navigate("/thoughts");
        }
        console.log(data);
      });
  };
  return (
    <div className="submit-div container">
      <Navbar />
      <form onSubmit={saveThought} method="post" action="/api/submitt">
        <textarea
          name="thoughts"
          onChange={handleThought}
          value={thought.thoughts}
          className="textArea"
          maxLength={500}
          rows="6"
          placeholder="Write your thoughts..."
        ></textarea>
        <br />
        <br />
        <textarea
          name="reasont"
          onChange={handleThought}
          maxLength={500}
          value={thought.reasont}
          className="textArea"
          cols="20"
          rows="8"
          placeholder="Reason for your thoughts..."
        ></textarea>
        <br />
        <br />
        <center>
          <button className="submit btn">Submit</button>
        </center>
      </form>
    </div>
  );
}
