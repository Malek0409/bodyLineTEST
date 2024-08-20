import React, { useEffect, useState } from 'react';
import logoApp from "../assest/logoApp.jpeg";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useSelector } from 'react-redux'


const Header = () => {
  axios.defaults.withCredentials = true;
  const muscles = ["Jambes", "Fesses", "Lombaire", "Dorceaux", "Biceps", "Triceps", "Trapèzes", "Pecteraux", "Epaules"]; 


  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: ''
  });

  const productCartItemsNumber = useSelector((state) => state.product.cartProductItems);

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user");
        if (res.data.status === "Success") {
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            picture: res.data.picture
          });
        } else {
         
        }
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    };

    fetchUser();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.get("http://localhost:8080/logout");
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };
  
 return (
    <header className='fixed w-full drop-shadow-md shadow-md bg-white z-10'>
      <div className='flex justify-between pr-8 pl-4'>
        <Link to={""}>
          <img src={logoApp} className='h-20 w-32 md:h-32 md:w-48' alt="Logo" />
        </Link>

        <div className='flex items-center'>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-700 rounded-lg p-2 sm:w-80 md:w-96"
          />
        </div>

        <div className='flex items-center gap-10 md:gap-7 pb-4 md:pb-4'>
          <nav className='gap-4 md:gap-6 md:text-lg hidden md:flex'>
            <Link className='text-3xl' to={""}>Home</Link>
            <Link className='text-3xl' to={"menu/65c7269a5a9b17e45a15f44f"}>Menu</Link>
            <Link className='text-3xl' to={"about"}>About</Link>
            <Link className='text-3xl' to={"contact"}>Contact</Link>
          </nav>

          <div className='text-4xl md:text-5xl text-slate-600'>
            <Link to={"cart"}>
              <BsCartFill />
              <div className="text-2xl md:text-1xl absolute top-3 md:top-2 text-white bg-red-500 w-6 text-center rounded-full">
                {productCartItemsNumber.length}
              </div>
            </Link>
          </div>

          <div className='text-3xl md:text-4xl text-slate-600' onClick={handleShowMenu}>
            <div className='border-4 border-solid border-slate-600 p-1 rounded-full cursor-pointer'>
              {user.picture ? (
                <img key={user.picture} src={`data:image/jpeg;base64,${user.picture}`} className='h-16 w-16 rounded-full' alt="User" />
              ) : (
                <FaUserAlt />
              )}
           </div>
            {showMenu && (
             <div className='absolute top-30 right-2 bg-white shadow drop-shadow-md flex flex-col'>
                   {console.log("User email:", user.email)}

               {user.email === "malek@gmail.com" && (
                  <Link to={"newproduct"} className='py-2 text-center text-3xl whitespace-nowrap cursor-pointer'>New product</Link>
                )}
                {user.picture ? (
                  <p className='text-3xl py-2 px-2 cursor-pointer text-white bg-red-500' onClick={handleDelete}>Logout--- {user.firstName}{user.lastName}</p>
                ) : (
                  <Link to={"login"} className='text-3xl whitespace-nowrap cursor-pointer py-1 px-3 text-center'>Login</Link>
                )}
                <nav className='text-base md:text-lg flex flex-col min-w-[100px] text-center md:hidden'>
                  <Link to={""} className='px-2 py-1'>Home</Link>
                  <Link to={"menu/65c7269a5a9b17e45a15f44f"} className='px-2 py-1'>Menu</Link>
                  <Link to={"about"} className='px-2 py-1'>About</Link>
                  <Link to={"contact"} className='px-2 py-1'>Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='py-4 bg-gray-100'>
        <div className='flex justify-center gap-4'>
          {muscles.map((muscle, index) => (
            <button key={index} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 h-10 w-32'>
              {muscle}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;

