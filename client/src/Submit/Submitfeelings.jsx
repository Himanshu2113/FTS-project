import React, { useState, useEffect } from "react";
import "../App.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SubmitFeelings() {
  const navigate = useNavigate();
  var [feeling, setFeeling] = useState({
    feelings: "",
    reasonf: "",
  });
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    fetch("https://fts-2avw.onrender.com/api/submitf", {
      headers: {
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

  const handleFeeling = (e) => {
    e.persist();
    setFeeling({ ...feeling, [e.target.name]: e.target.value });
    // console.log(feeling);
  };
  const saveFeeling = (e) => {
    e.preventDefault();
    const data = {
      feelings: feeling.feelings,
      reasonf: feeling.reasonf,
    };
    if (!data.feelings) return notifyA("Please fill all the fields");
    else if (!data.reasonf) {
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
    fetch("http://localhost:3000/api/submitf", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          navigate("/login");
        } else {
          notifyB(data.message);
          navigate("/feelings");
        }
        console.log(data);
      });
  };
  return (
    <div>
      <div className="container">
        <Navbar />
        <form onSubmit={saveFeeling} method="post" action="/api/submitf">
          <textarea
            name="feelings"
            onChange={handleFeeling}
            // className="textArea"
            value={feeling.feelings}
            maxLength={500}
            rows="6"
            placeholder="Write your feelings..."
          ></textarea>
          <br />
          <br />
          <textarea
            name="reasonf"
            onChange={handleFeeling}
            maxLength={500}
            value={feeling.reasonf}
            className="textAbove"
            cols="10"
            rows="8"
            placeholder="Reason for your feelings..."
          ></textarea>
          <br />
          <br />
          <center>
            <button className="btn">Submit</button>
          </center>
        </form>
      </div>
    </div>
  );
}
