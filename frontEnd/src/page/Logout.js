import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Logout() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState("");
  
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8080/user")
      .then((res) => {
        if (res.data.Status === "Success") {
            setAuth(true);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setEmail(res.data.email);
            setPicture(res.data.picture);
          
        } else {
          setAuth(false);
          setMessage(res.data.Error);
        }
      })
      .then((err) => console.log(`not Error : ${err}`));
  }, []);

  const handleDelete = () => {
    axios
      .get("http://localhost:8080")
      .then(() => {
        window.location.reload(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-4">
      {auth ? (
        <div>
          <div className="">
            {picture && (
              <img src={`data:image/jpeg;base64,${picture}`} alt="User" />
            )}
          </div>
          <h1>-----------------------------------------------------</h1>
                  <h3>You are authuorized --- {firstName}{lastName}</h3>
          <h3>Your mail --- {email}</h3>
          <button className="btn btn-danger" onClick={handleDelete}>
            Logout
          </button>
        </div>
      ) : (
        <div>
         je vais aller a la page home comment je peux faire ??
        </div>
      )}
    </div>
  );
}

export default Logout;
