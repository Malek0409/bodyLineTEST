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
          const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}signup`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          if (res.data.status === "Success") {
            navigate("/login");
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
    <div className='p-5 md:p-28'>
      <div className='max-w-md bg-white m-auto flex items-center flex-col p-6 '>
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <div className='relative drop-shadow-md overflow-hidden rounded-full  shadow-md'>
            <img src={filePicture ? URL.createObjectURL(filePicture) : loginSignupImage} className='w-full' alt="Profile" />
            <label htmlFor="profilePicture">
              <p className='text-sm absolute bottom-2 w-full text-center cursor-pointer'>Upload</p>
              <input type="file" id="profilePicture" accept="image/*" className='hidden' onChange={handleFileChange} />
            </label>
          </div>
          <label className="text-xl font-medium" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id='firstName'
            name='firstName'
            className='mb-4 h-10 text-xl w-full bg-slate-200 px-2 py-1 rounded outline-none'
            value={data.firstName}
            onChange={handleOnChange}
          />
          <label className="text-xl font-medium" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id='lastName'
            name='lastName'
            className='mb-4 h-10 w-full bg-slate-200 px-2 py-1 rounded text-xl'
            value={data.lastName}
            onChange={handleOnChange}
          />
          <label className="text-xl font-medium" htmlFor="email">Email</label>
          <input
            type="email"
            id='email'
            name='email'
            className='h-10 text-xl mb-4 w-full bg-slate-200 px-2 py-1 rounded'
            value={data.email}
            onChange={handleOnChange}
          />
          <label className="text-xl font-medium" htmlFor="password">Password</label>
          <div className='h-10 text-xl mb-4 flex px-2 py-1 rounded mt-1 mb-2 bg-slate-200'>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              className='w-full bg-slate-200 outline-border'
              value={data.password}
              onChange={handleOnChange}
            />
            <span className='flex items-center text-xl' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <label className="text-xl font-medium" htmlFor="confirmPassword">Confirm Password</label>
          <div className='h-10 text-xl mb-4 flex px-2 py-1 rounded mt-1 mb-2 bg-slate-200'>
            <input
              type={confirmShowPassword ? "text" : "password"}
              id='confirmPassword'
              name='confirmPassword'
              className='w-full bg-slate-200 outline-border'
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span className='flex items-center text-xl' onClick={handleConfirmShowPassword}>
              {confirmShowPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>
          <button className='w-full max-w-[150px] m-auto bg-sky-300 hover:bg-sky-600 cursor-pointer text-2xl font-medium py-2 px-2 rounded-full mt-4'>
            Sign Up
          </button>
        </form>
        <p className='text-left text-sm mt-2 text-xl'>
          Already have an account? <Link to={"/login"} className='text-sky-400 text-xl'>Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup