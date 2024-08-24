import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AllProduct from '../compoments/AllProduct';
import { addCartProductItemps } from '../redux/productSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const { filterby } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getProduct/${filterby}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product data', error);
      }
    };

    fetchProduct();
  }, [filterby]);

  const handleAddCartProduct = () => {
    dispatch(addCartProductItemps(product));
  };

  if (!product) return <div>Loading...nice</div>;

  return (
    <div className='p-2 md:p-4'>
      <div className='max-w-3xl bg-white m-auto md:flex'>
        <div className='w-1/2 max-w-lg overflow-hidden'>
          <img src={`data:image/jpeg;base64,${product.picture}`} alt={product.title} className='hover:scale-105 transition-all' />
        </div>
        <div className='flex flex-col gap-1 w-80'>
          <h3 className='font-semibold text-slate-600 text-center capitalize text-4xl md:text-4xl py-2'>
            {product.title}
          </h3>
          <h3 className='font-medium text-slate-500 text-center md:text-4xl'>
            {product.typeMachine}
          </h3>
          <h3 className='font-bold text-red-600 text-center md:text-4xl py-4'>
            {product.price} {product.currency}
          </h3>
          <div className='flex gap-3 py-4'>
            <button className='bg-yellow-500 py-2 mt-2 rounded w-16 h-10 hover:bg-yellow-600'>
              Buy
            </button>
            <button onClick={handleAddCartProduct} className='bg-yellow-500 py-2 mt-2 rounded w-36 h-10 hover:bg-yellow-600'>
              Add Product
            </button>
          </div>
          <div>
            <p className='text-slate-500 font-medium'>Description :</p>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
      <AllProduct heading={"Related Product"} />
    </div>
  );
};

export default Menu;