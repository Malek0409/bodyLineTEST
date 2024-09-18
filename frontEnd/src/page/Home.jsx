import React, { useEffect, useRef, useState } from 'react';
import { FcPrevious, FcNext } from "react-icons/fc";
import CardFeature from '../compoments/CardFeature';
import AllProduct from '../compoments/AllProduct';
import videoFitness from '../assest/videoFitness.mp4';
import CookieConsent from '../compoments/cookiesConsent';
import { setCartItems } from '../redux/productSlice'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  
  
  const dispatch = useDispatch()
     useEffect(() => {
        const fetchCartLine = async () => {
            try {
                const { data } = await axios.get('http://localhost:8080/getProductToCartLine');
                if (data.cartItems) {
                    dispatch(setCartItems(data.cartItems));
    
                } else {
                    toast.error('No items found in cart.');
                }
            } catch (err) {
                console.error(`Error: ${err}`);
                toast.error('Error fetching cart items.');
            }
        };

        fetchCartLine();
    }, []);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const slideProductRef = useRef();

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 270;
  };

  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 270;
  };

  return (
   <div className='p-4 md:p-8 lg:p-16'>
  <div className='px-0'>
    <video 
      className='w-full h-64 object-cover' 
      controls 
      src={videoFitness}
    >
      Your browser does not support the video tag.
    </video>
  </div>

      <div className='py-4'>
  <div className='flex flex-col md:flex-row items-center justify-between'>
    <h2 className='font-bold text-xl md:text-2xl lg:text-3xl text-slate-800'>
      Nos Produits par Catégorie
    </h2>
    <div className='flex gap-4 mt-4 md:mt-0 p-4'>
      <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded'>
        <FcPrevious />
      </button>
      <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-2 rounded'>
        <FcNext />
      </button>
    </div>
  </div>

  <div className="mt-2">
    <select
      className="cursor-pointer p-2 bg-slate-300 rounded md:w-auto"
      value={selectedCategory}
      onChange={handleChange}
    >
      <option value="">Choisir catégorie</option>
      <option value="machine">Machine</option>
      <option value="lastique">Lastique</option>
      <option value="equipement">Équipement</option>
      <option value="barres">Barres</option>
      <option value="alteres">Altères</option>
      <option value="disque">Disque</option>
    </select>
    {selectedCategory && (
      <div className="mt-2">
        <p className="text-lg">Catégorie sélectionnée : {selectedCategory}</p>
      </div>
    )}
  </div>

        <div className='flex gap-4 overflow-x-auto scroll-smooth mt-6' ref={slideProductRef}>
          <CardFeature selectedCategory={selectedCategory} />
        </div>

        <div className="mt-10">
          <AllProduct heading={"Votre Produit"} />
        </div>
      </div>

      <CookieConsent />
    </div>
  );
}

export default Home;
