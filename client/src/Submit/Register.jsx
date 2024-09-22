import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  var [user, setUser] = useState({
    email: "",
    password: "",
  });
  // var [shows, setShow] = useState("True");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const handleUser = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // const show = () => {
  //   setShow(!shows);
  //   return;
  // };
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex =
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,20}$/;
  const saveUser = (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      password: user.password,
    };
    if (!data.email) {
      notifyA("Please fill all the fields");
      return;
    } else if (!emailRegex.test(data.email)) {
      notifyA("Invalid Email");
      return;
    } else if (!data.password) {
      notifyA("Please fill all the fields");
      return;
    } else if (!passRegex.test(user.password)) {
      notifyA(
        "Password must include atleast 8 characters in which there should be 2 uppercase letters, 3 lowercase letters, 2 numbers, and 1 special characters"
      );
      return;
    }

    const serializedBody = JSON.stringify(data);
    const fetchOptions = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: serializedBody,
    };
    fetch("https://fts-2avw.onrender.com/api/register", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          storeTokenInLS(data.token);
          // localStorage.setItem("token", data.token);
          notifyB(data.message);
          navigate("/home");
        }
        console.log(data);
      });
  };

  return (
    <div>
      {/* <div classNameName="authenticate">
        <center>
          <form onSubmit={saveUser} method="post" action="/api/register">
            <h1>Register</h1>
            <label>Email : </label>
            <input
              onChange={handleUser}
              placeholder="Enter your email"
              name="email"
              type="email"
              classNameName="input"
              autoComplete="off"
            ></input>
            <br />
            <br />
            <label>Password : </label>
            <input
              onChange={handleUser}
              placeholder="Enter your password"
              name="password"
              type={shows ? "password" : "text"}
              classNameName="input"
              autoComplete="off"
            ></input>
            <button onClick={show} classNameName="buttons">
              {shows ? "Show" : "Hide"}
            </button>
            <br />
            <br />
            <button classNameName="buttons">Register</button>
          </form>
          <br />
          <p>OR</p>
          <h3>
            Already have an account ?<Link to="/login">Login</Link>
          </h3>
        </center>
      </div> */}
      <Navbar />
      <div className="form">
        <form onSubmit={saveUser} method="post" action="/api/register">
          <h1 className="h3 mb-3 fw-normal" style={{ textAlign: "center" }}>
            Register
          </h1>
          <div className="form-floating">
            <input
              onChange={handleUser}
              placeholder="Enter your email"
              name="email"
              type="email"
              // classNameName="input"
              autoComplete="off"
              className="form-control"
              id="floatingInput"
              // placeholder="name@example.com"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <br />
          <div className="form-floating">
            <input
              onChange={handleUser}
              placeholder="Enter your password"
              name="password"
              // type={shows ? "password" : "text"}
              // classNameName="input"
              autoComplete="off"
              type="password"
              className="form-control"
              id="floatingPassword"
              // placeholder="Password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          {/* <br /> */}
          {/* <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" /> Remember me
            </label>
          </div> */}
          {/* <br /> */}
          <br />
          <button className="btn btn-primary w-100 py-2" type="submit">
            Sign up
          </button>
          <br />
          <br />
          <br />
          <br />
          <h3 className="foot" style={{ textAlign: "center" }}>
            Already have an account ?<Link to="/login">Login</Link>
          </h3>
        </form>
      </div>
    </div>
  );
}
