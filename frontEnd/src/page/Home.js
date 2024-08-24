import React, { useRef, useState } from 'react';
import { FcPrevious, FcNext } from "react-icons/fc";
import CardFeature from '../compoments/CardFeature';
import AllProduct from '../compoments/AllProduct';
import videoFitness from '../assest/videoFitness.mp4';

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
      
     <div className=' p-12 px-0'>
          <video 
            className='w-full h-[800px] object-cover' 
            controls 
            src={videoFitness}
          >
            Your browser does not support the video tag.
          </video>
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