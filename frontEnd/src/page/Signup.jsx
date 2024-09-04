import React, { useState } from 'react'
import loginSignupImage from "../assest/loginAnimation.gif"
import { BiShow , BiHide } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";


const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "user",
  });

  const [filePicture, setFilePicture] = useState(null);

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const handleConfirmShowPassword = () => {
    setConfirmShowPassword(prev => !prev);
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleFileChange = (e) => 
    setFilePicture(e.target.files[0]);
  

  const handleSubmit = async (e) => {
    console.log("start signUP")
    e.preventDefault();
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profilePicture", filePicture);

    if (data.firstName && data.lastName && data.email && data.password && data.confirmPassword) {
      if (data.password === data.confirmPassword) {
        try {
          const res = await axios.post("http://localhost:8080/signup", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.status === "Success") {
            navigate("/verify-code");
            alert(res.data.status);
          } else {
            alert(res.data.Error);
          }
        } catch (error) {
          alert("Error submitting form");
        }
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("All fields are required");
    }
    
  }

return (
  <div className="bg-gradient-to-br from-sky-100 to-gray-700 min-h-screen flex justify-center items-center">
    <div className=" max-w-lg to-gray-100 shadow-2xl rounded-lg overflow-hidden p-8 m-auto flex items-center flex-col">
      <form className="w-full py-5 flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="relative overflow-hidden rounded-full border-4 border-gray-300 shadow-lg">
          <img
            src={filePicture ? URL.createObjectURL(filePicture) : loginSignupImage}
            className="w-full h-40 object-cover"
            alt="Profile"
          />
          <label
            htmlFor="profilePicture"
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
          >
            Upload
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <label className="text-lg font-semibold text-black" htmlFor="firstName">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="h-12 text-lg w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900"
          value={data.firstName}
          onChange={handleOnChange}
        />

        <label className="text-lg font-semibold text-black" htmlFor="lastName">
          Nom
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="h-12 text-lg w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={data.lastName}
          onChange={handleOnChange}
        />

        <label className="text-lg font-semibold text-black" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="h-12 text-lg w-full bg-gray-200 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          value={data.email}
          onChange={handleOnChange}
        />

        <label className="text-lg font-semibold text-black" htmlFor="password">
          Mot de passe
        </label>
        <div className="h-12 text-lg flex px-4 py-2 rounded-lg bg-gray-200 focus-within:ring-2 focus-within:ring-gray-900">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full bg-transparent outline-none"
            value={data.password}
            onChange={handleOnChange}
          />
          <span
            className="flex items-center text-2xl text-gray-500 cursor-pointer"
            onClick={handleShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>

        <label className="text-lg font-semibold text-black" htmlFor="password">
          Confirme Mot de Passe 
        </label>
        <div className="h-12 text-lg flex px-4 py-2 rounded-lg bg-gray-200 focus-within:ring-2 focus-within:ring-gray-900">
          <input
            type={confirmShowPassword ? "text" : "confirmPassword"}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full bg-transparent outline-none"
            value={data.confirmPassword}
            onChange={handleOnChange}
          />
          <span
            className="flex items-center text-2xl text-gray-500 cursor-pointer"
            onClick={handleConfirmShowPassword}
          >
            {showPassword ? <BiShow /> : <BiHide />}
          </span>
        </div>


        <button className="w-full bg-sky-500 hover:bg-sky-600 text-black text-xl font-semibold py-3 rounded-full transition duration-300 ease-in-out">
          Enregistre
        </button>
      </form>
      <p className="text-center text-black mt-4 text-lg">
        Vous avez déjà un compte ?{" "}
        <Link to={"/login"} className="text-sky-300 hover:text-sky-400">
          Connexion
        </Link>
      </p>
    </div>
  </div>
);


}

export default Signup