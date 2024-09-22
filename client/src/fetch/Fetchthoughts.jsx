import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Fetch = () => {
  const navigate = useNavigate();
  const [thoughtss, setThoughts] = useState([]);
  const notifyA = (msg) => toast.error(msg);
  // const notifyB = (msg) => toast.success(msg);
  useEffect(() => {
    fetch("https://fts-2avw.onrender.com/api/t", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
          navigate("/login");
        } else {
          setThoughts(data);
        }
        console.log(data);
      });
  }, [navigate]);
  return (
    <div>
      {thoughtss.map((thought, index) => (
        <div key={thought.id}>
          <h1>
            {index + 1}. {thought.thoughts}
          </h1>
          <h2>{thought.reasont}</h2>
        </div>
      ))}
    </div>
  );
};
export default Fetch;
