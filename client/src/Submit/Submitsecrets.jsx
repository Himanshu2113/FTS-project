import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function SubmitSecrets() {
  const navigate = useNavigate();
  const [secret, setSecret] = useState({
    secrets: "",
  });

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    fetch("/api/submits", {
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

  const handleSecret = (e) => {
    e.persist();
    setSecret({ ...secret, [e.target.name]: e.target.value });
    // console.log(secret);
  };
  const saveSecret = (e) => {
    e.preventDefault();
    const data = {
      secrets: secret.secrets,
    };
    if (!data.secrets) return notifyA("Please fiil all the fields");
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
    fetch("http://localhost:3000/api/submits", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          navigate("/login");
        } else {
          notifyB(data.message);
          navigate("/secrets");
        }
        console.log(data);
      });
  };
  return (
    <div className="submit-div container">
      <Navbar />
      <form onSubmit={saveSecret} method="post" action="/api/submits">
        <textarea
          name="secrets"
          onChange={handleSecret}
          maxLength={500}
          value={secret.secrets}
          className="textArea sec"
          // cols="10"
          // rows="8"
          placeholder="Write your secret..."
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
