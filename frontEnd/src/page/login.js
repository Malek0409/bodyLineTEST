import React, { useState } from 'react'

import loginSignupImage from "../assest/loginAnimation.gif"
import { BiShow , BiHide } from "react-icons/bi"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useDispatch } from "react-redux"
import { loginRedux } from '../redux/userSlice'


import {  } from 'react-redux'

const Login = () => {
   
  const [showPassword, setShowPassword] = useState(false)
  
  const [data, setData] = useState({
    email: "",
    password: "",
  })
  
  const navigate = useNavigate()
  
  const handleShowPassword = () => {
    setShowPassword(preve => !preve)
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  axios.defaults.withCredentials = true;
 
  const handleSubmit = async (e) => {
    e.preventDefault();
     console.log("test", data)
      try {
        const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}login`, data);
        console.log("test", data)
        console.log(res)
        if (res.data.status === "Success") {
          console.log("its sucess")
          
                setTimeout(() => {
                  navigate("/");
                  window.location.reload(true);
                }, 1000);
        } else {
          console.log("it,s not sucess")
                alert(res.data.Error);
            }
      } catch (err) {
            console.error("Error during login request: ", err);
        }
  };
  
  return (
    <div className='  p-5 md:p-40  '>
   
      <div className=' max-w-md bg-white m-auto flex items-center flex-col p-4'>
        
        
        <div className='w-32 h-25 overflow-hidden rounded-full drop-shadow-md shadow-md'>
          <img src={loginSignupImage} className='w-full' alt="Login Animation"/>
        </div>
        
        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          
          <label className="text-xl font-medium" htmlFor="email">Email</label>
          <input
            type="email"
            id='email'
            name='email'
            autocomplete="current-email"
            className='mb-4 h-10 text-xl mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded'
            value={data.email}
            onChange={handleOnChange}/>
          
            <label className="text-xl font-medium" htmlFor="password">Password</label>
            <div className='mb-4 h-10 text-xl flex px-2 py-1 rounded mt-1 mb-2 bg-slate-200 '>
              <input
              type={showPassword ? "text" : "password"}
              id='password'
              name='password'
              autocomplete="current-password"
              className=' w-full bg-slate-200 outline-border '
              value={data.password}
              onChange={handleOnChange}/>
              <span className='flex items-center text-xl' onClick={handleShowPassword}>{showPassword ? <BiShow /> : <BiHide />}</span>
            </div>
          
          
            <button className=' w-full max-w-[150px]  m-auto bg-sky-300 hover:bg-sky-600 
            cursor-pointer text-2xl font-medium py-2 px-2 rounded-full mt-4 '>Login</button>
       
        </form>
        <p className='text-left text-sm mt-2 text-xl'>Don't have account ? <Link to={"/signup"} className='text-sky-400 text-xl'>Login</Link></p>
    
      </div> 
    
    </div >
  )
}

export default Login
