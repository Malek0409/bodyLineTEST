import React, { useRef, useState } from 'react';
import { FcPrevious, FcNext } from "react-icons/fc";
import HomeCard from '../compoments/HomeCard';
import CardFeature from '../compoments/CardFeature';
import AllProduct from '../compoments/AllProduct';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('machines');
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
    <div className='p-2 md:p-10'>
      <div className='md:flex py-2'>
        <div className='md:w-1/2'>
          <iframe 
            className='w-full h-full md:h-full' 
            src="https://www.youtube.com/embed/your-video-id" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            title="Video Title"
          ></iframe>
        </div>

        <div className='md:w-1/2 flex flex-wrap gap-3 p-12 md:pr-2 justify-center'>
          
            <HomeCard />
         
        </div>
      </div>

      <div className='p-4'>
        <div className='flex w-full items-center'>
          <h2 className='font-bold text-2xl text-slate-800'>MACHINES-------</h2>
          <div className='flex gap-4 ml-auto'>
            <button onClick={preveProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>
              <FcPrevious />
            </button>
            <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'>
              <FcNext />
            </button>
          </div>
        </div>

      <div className="mt-4">
      <select
        className="cursor-pointer p-2 bg-slate-300 rounded"
        value={selectedCategory}
        onChange={handleChange}
      >
        <option value="">Choisir catégorie</option>
        <option value="machines">Machines</option>
        <option value="lastique">Lastique</option>
        <option value="equipement">Équipement</option>
        <option value="barres">Barres</option>
        <option value="alteres">Altères</option>
        <option value="disque">Disque</option>
      </select>
      {selectedCategory && (
        <div className="mt-4">
          <p>Catégorie sélectionnée : {selectedCategory}</p>
        </div>
      )}
    </div>
  

        <div className='flex gap-9 overflow-scroll scroll-smooth transition-all mt-4' ref={slideProductRef}>
          
            
              <CardFeature/>
          
      
           
       {selectedCategory === 'Machine' && (
            <div>Contenu de Lastique</div>
          )}
          {selectedCategory === 'lastique' && (
            <div>Contenu de Lastique</div>
          )}
          {selectedCategory === 'equipement' && (
            <div>Contenu de l'Équipement</div>
          )}
           {selectedCategory === 'barres' && (
            <div>Contenu de Lastique</div>
          )}
          {selectedCategory === 'alteres' && (
            <div>Contenu de l'Équipement</div>
          )}
           {selectedCategory === 'disque' && (
            <div>Contenu de l'Équipement</div>
          )}
        </div>

        <AllProduct heading={"Your Product"} />
      </div>
    </div>
  );
}

export default Home;