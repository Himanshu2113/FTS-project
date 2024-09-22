import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Fetch = () => {
  const navigate = useNavigate();
  const [feelingss, setFeelings] = useState([]);
  const notifyA = (msg) => toast.error(msg);
  useEffect(() => {
    fetch("https://fts-2avw.onrender.com/api/f", {
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
          setFeelings(data);
        }
        console.log(data);
        // console.log(data);
      });
  }, [navigate]);
  return (
    <div>
      {feelingss.map((feeling, index) => (
        <div key={index}>
          <h1>
            {index + 1}. {feeling.feelings}
          </h1>
          <h2>{feeling.reasonf}</h2>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Fetch;
