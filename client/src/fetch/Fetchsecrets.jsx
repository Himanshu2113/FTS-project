import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Fetch = () => {
  const navigate = useNavigate();
  const [secretss, setSecrets] = useState([]);
  const notifyA = (msg) => toast.error(msg);
  useEffect(() => {
    fetch("/api/s", {
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
          setSecrets(data);
        }
        console.log(data);
        // console.log(data);
      });
  }, [navigate]);

  return (
    <div>
      {secretss.map((secret, index) => (
        <div key={secret.id}>
          <h1>
            {index + 1}. {secret.secrets}
          </h1>
        </div>
      ))}
    </div>
  );
};
export default Fetch;
