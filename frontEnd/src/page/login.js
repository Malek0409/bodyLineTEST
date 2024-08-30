import React, { useState } from 'react'
import loginSignupImage from "../assest/loginAnimation.gif"
import { BiShow, BiHide } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null);

  const key = "6LddtC0qAAAAAJt7bWJlNnfUoIzhLIskfyicD4s8"

  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const handleShowPassword = () => {
    setShowPassword(prev => !prev)
  }
  
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  
  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  }

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please verify that you are not a robot.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/login", {
        ...data,
        recaptcha: captchaValue
      });

      if (res.data.status === "Success") {
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1000);
      } else {
        alert(res.data.Error);
      }
    } catch (err) {
      console.error("Error during login request: ", err);
    }
  };

  return (
    <div className='flex items-center justify-center bg-gray-100 '>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md p-8 m-24'>
        <div className='flex justify-center mb-6'>
          <img src={loginSignupImage} alt="Login Animation" className='w-24 h-24 rounded-full shadow-md' />
        </div>
        
        <h2 className='text-2xl font-bold text-gray-800 mb-6 text-center'>Login</h2>
        
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label className='block text-gray-700 text-lg font-medium mb-1' htmlFor="email">Email</label>
            <input
              type="email"
              id='email'
              name='email'
              autoComplete="current-email"
              className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              value={data.email}
              onChange={handleOnChange}
              required
            />
          </div>
          
          <div>
            <label className='block text-gray-700 text-lg font-medium mb-1' htmlFor="password">Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                id='password'
                name='password'
                autoComplete="current-password"
                className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 pr-10'
                value={data.password}
                onChange={handleOnChange}
                required
              />
              <span className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer' onClick={handleShowPassword}>
                {showPassword ? <BiShow className='text-gray-600' /> : <BiHide className='text-gray-600' />}
              </span>
            </div>
          </div>

          <div className='mb-4'>
            <ReCAPTCHA
              sitekey={key}
              onChange={handleCaptchaChange}
            />
          </div>

          <button 
            className='w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out'
            type="submit"
          >
            Login
          </button>
        </form>

        <p className='text-gray-600 text-sm mt-4 text-center'>
          Don't have an account? <Link to={"/signup"} className='text-sky-500 font-semibold'>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login
