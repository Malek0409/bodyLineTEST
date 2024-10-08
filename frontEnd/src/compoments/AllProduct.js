import React, { useState } from 'react';
import CardFeature from './CardFeature';

const AllProduct = ({ heading }) => {
  
  
  
  const [dataFilter] = useState([]);
  const loadingArrayFeature = new Array(1).fill(null);

 

  return (
    <div className='my-20'>
      <h2 className='font-bold text-2xl bg-color-400 text-slate-800 mb-2'>{heading}</h2>
    
      <div className='flex flex-wrap justify-center gap-6'>
        {
          dataFilter.length ? dataFilter.map((product, index) => (
            <CardFeature key={index} product={product} />
          )) : loadingArrayFeature.map((index) => (
            <CardFeature loading="loading..." key={index + "allProduct"} />
          ))
        }
      </div>
    </div>
  );
};

export default AllProduct;