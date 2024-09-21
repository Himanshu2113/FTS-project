import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Feelings from "./pages/Feelings";
import Thoughts from "./pages/Thoughts";
import Secrets from "./pages/Secrets";
import Error from "./pages/Error";
import SubmitFeelings from "./Submit/Submitfeelings";
import SubmitThoughts from "./Submit/Submitthoughts";
import SubmitSecrets from "./Submit/Submitsecrets";
import Login from "../src/Submit/Login";
import Register from "../src/Submit/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./store/auth";
import { Logout } from "./pages/Logout";
// import Modal from "./components/Modal";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <div>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/feelings" element={<Feelings />} />
          <Route exact path="/thoughts" element={<Thoughts />} />
          <Route exact path="/secrets" element={<Secrets />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/submitfeelings" element={<SubmitFeelings />} />
          <Route exact path="/submitthoughts" element={<SubmitThoughts />} />
          <Route exact path="/submitsecrets" element={<SubmitSecrets />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer theme="dark" />
        {/* <Modal /> */}
      </div>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
