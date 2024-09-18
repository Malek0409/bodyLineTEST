import React, { useEffect, useState } from 'react';
import logoApp from "../assest/logoApp.jpeg";
import { FaUserAlt } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { Link, useLocation } from 'react-router-dom';
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
    picture: '',
    type: ''
  });

  const productCartItemsNumber = useSelector((state) => state.product.cartProductItems);

  const handleShowMenu = () => {
    setShowMenu(prev => !prev);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/user`);
        if (res.data.status === "Success") {
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            picture: res.data.picture,
            type: res.data.type
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
      await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/logout`);
      window.location.reload(true);
    } catch (err) {
      console.log(err);
    }
  };

  const location = useLocation();
  
  return (
    <header
     className='fixed w-full drop-shadow-md shadow-md bg-white z-10'>
      <div className='flex justify-between pr-8 pl-4'>
        <Link to={""}>
          <img src={logoApp} className='h-20 w-32 lg:h-32 lg:w-48' alt="Logo" />
        </Link>

        <div className='hidden lg:flex items-center'>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-lg p-2 w-64 xl:w-80"
          />
        </div>

        <div className='flex items-center gap-4 lg:gap-6 xl:gap-8'>
          <nav className='hidden lg:flex gap-4 xl:gap-6'>
            <Link className='text-lg lg:text-xl xl:text-2xl hover:text-yellow-500 transition-colors duration-300' to={""}>Accueil</Link>
            <Link className='text-lg lg:text-xl xl:text-2xl hover:text-yellow-500 transition-colors duration-300' to={"menu/65c7269a5a9b17e45a15f44f"}>Menu</Link>
            <Link className='text-lg lg:text-xl xl:text-2xl hover:text-yellow-500 transition-colors duration-300' to={"about"}>À propos</Link>
            <Link className='text-lg lg:text-xl xl:text-2xl hover:text-yellow-500 transition-colors duration-300' to={"contact"}>Contact</Link>
          </nav>

        <div className='text-4xl md:text-5xl text-slate-600'>
            <Link to={"cart"}>
              <BsCartFill />
            </Link>
            <div className="text-2xl md:text-1xl absolute top-3 md:top-2 text-white bg-red-500 w-6 text-center rounded-full">
              {productCartItemsNumber?.length || 0}
            </div>
          </div>

          <div className='relative' onClick={handleShowMenu}>
            <div className='border-4 border-solid border-gray-600 p-1 rounded-full cursor-pointer'>
              {user.picture ? (
                <img src={`data:image/jpeg;base64,${user.picture}`} className='h-10 w-10 lg:h-12 lg:w-12 xl:h-14 xl:w-14 rounded-full object-cover' alt="User" />
              ) : (
                <FaUserAlt className='text-gray-600 text-2xl lg:text-3xl' />
              )}
            </div>
            {showMenu && (
              <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-36 p-4 z-20'>
                {user.picture && (
                  <div className="text-gray-800 text-lg font-semibold mb-2">
                    Bonjour {user.firstName} {user.lastName} !
                  </div>
                )}
                {user.type === "ADMIN" && (
                  <>
                    <Link to="newproduct" className="block text-gray-700 py-2 hover:bg-gray-100 rounded-md transition-colors duration-300">
                      Nouveau produit
                    </Link>
                    <Link to="managementproduct" className="block text-gray-700 py-2 hover:bg-gray-100 rounded-md transition-colors duration-300">
                      Gestion produit
                    </Link>
                  </>
                )}
                {user.picture ? (
                  <>
                    <Link to={"account"} className="block text-gray-700 py-2 hover:bg-gray-100 rounded-md transition-colors duration-300">
                      Mon compte
                    </Link>
                    <button onClick={handleDelete} className="block text-gray-700 py-2 hover:bg-gray-100 rounded-md transition-colors duration-300">
                      Déconnecter
                    </button>
                  </>
                ) : (
                  <Link to={"login"} className='block text-gray-700 py-2 hover:bg-gray-100 rounded-md transition-colors duration-300'>
                    Login
                  </Link>
                )}
                <nav className='lg:hidden mt-4'>
                  <Link to={""} className='block py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300'>Accueil</Link>
                  <Link to={"menu/65c7269a5a9b17e45a15f44f"} className='block py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300'>Menu</Link>
                  <Link to={"about"} className='block py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300'>À propos</Link>
                  <Link to={"contact"} className='block py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-300'>Contact</Link>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {(location.pathname === "/" || location.pathname.includes("/menu")) && (
        <div className='bg-gray-100 py-2'>
          <div className='container mx-auto flex flex-wrap justify-center gap-2'>
            {muscles.map((muscle, index) => (
              <button key={index} className='text-sm lg:text-md xl:text-lg py-2 px-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300'>
                {muscle}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
export default Header;

