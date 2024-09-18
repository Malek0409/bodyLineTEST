import React, { useState } from 'react'
import loginSignupImage from "../assest/profilSilver.jpg"
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
          const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/signup`, formData, {
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
  <div className="p-5 md:p-5 min-h-screen flex items-center justify-center bg-gray-100">
    <div className='bg-white flex items-center flex-col p-4 ' style={{ width: '450px', height: '800px' }}>
      
          <div className="relative overflow-hidden rounded-full border-4 border-gray-300 shadow-lg w-32 h-25">
          <img
            src={filePicture ? URL.createObjectURL(filePicture) : loginSignupImage}
            className="w-full object-cover"
            alt="Profile"
          />
          <label
            htmlFor="profilePicture"
          className="absolute inset-0 flex items-center justify-center text-black font-bold text-sm
          cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-300"
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
      <form className="w-full py-5 flex flex-col space-y-4" onSubmit={handleSubmit}>
    

        <label className="text-lg font-semibold text-black" htmlFor="firstName">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          value={data.email}
          onChange={handleOnChange}
        />

        <label className="text-lg font-semibold text-black" htmlFor="password">
          Mot de passe
        </label>
        <div className="flex">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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
        <div className="flex">
          <input
            type={confirmShowPassword ? "text" : "confirmPassword"}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
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

       
        <button className="justify-center hover:bg-yellow-600 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-md  ">
          Enregistre
          </button>
         
      </form>
      <p className="text-center text-black mt-4 text-lg">
        Vous avez déjà un compte ?{" "}
        <Link to={"/login"} className="font-semibold">
          Connexion
        </Link>
      </p>
    </div>
  </div>
);


}

export default Signup