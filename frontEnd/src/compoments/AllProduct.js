import React, { useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import useFetchProducts from '../redux/useFetchProducts';

const AllProduct = ({ heading }) => {
  const { products, loading } = useFetchProducts();
  const [filterBy, setFilterBy] = useState('');
  const [dataFilter, setDataFilter] = useState([]);

  const categoryList = products ? [...new Set(products.map(p => p.nameMuscle))] : [];
  const loadingArrayFeature = new Array(1).fill(null);

  const handleFilterProduct = (nameMuscle) => {
    setFilterBy(nameMuscle);
    const filteredProducts = products.filter(product => product.nameMuscle.toLowerCase() === nameMuscle.toLowerCase());
    setDataFilter(filteredProducts);
  };

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl bg-color-400 text-slate-800 mb-2'>{heading}</h2>
      <div className='flex gap-6 justify-center overflow-scroll scrollbar-none'>
        {
          loading ? (
            <div className='min-h-[200px] flex justify-center items-center'>
              <p>Loading...</p>
            </div>
          ) : loadingArrayFeature.map((nameMuscle, index) => (
            <FilterProduct
              key={index}
              nameMuscle={nameMuscle}
              onClick={() => handleFilterProduct(nameMuscle)}
            />
          ))
        }
      </div>
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