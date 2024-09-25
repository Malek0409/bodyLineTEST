import React, { useState } from 'react'
import loginSignupImage from "../assest/profilSilver.jpg"
import { BiShow, BiHide } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null);

  const key = "6LdMZk4qAAAAAPy4XQDXNFYCwkdmlnEoPXiHOOoG"

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
      const res = await axios.post(`https://api.bodyline.site/login`, {

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
    <div className='p-5 md:p-5 min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white flex items-center flex-col p-4 ' style={{ width: '450px', height: '600px' }}>
        <div className='w-32 h-25 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={loginSignupImage} alt="Login Animation" className='w-full' />
        </div>
        
        <h2 className='text-center text-2xl font-bold'>Welcome</h2>
        
        <form className='space-y-4 w-96 py-3 flex flex-col' onSubmit={handleSubmit}>
          <div>
            <label className='block text-gray-700  md:text-lg font-medium mb-1' htmlFor="email">Email</label>
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
            <label className='block text-gray-700  md:text-lg font-medium mb-1' htmlFor="password">mot de passe</label>
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
              <span className='absolute right-0 top-3 flex items-center cursor-pointer' onClick={handleShowPassword}>
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
            className='flex items-center justify-center w-96 hover:bg-yellow-600 bg-yellow-500 text- font-semibold py-2 px-4 rounded-md'
            type="submit"
          >
            Connecter
          </button>
        </form>

        <p className='text-sm mt-4 text-center font-bold'>
          Vous n'avez pas de compte ? <Link to={"/signup"} className='font-semibold text-yellow-500'>Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}

export default Login
