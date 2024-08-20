import React from 'react';
import { TbPlus, TbMinus } from 'react-icons/tb';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { decreaseQty, deleteCartProductItemps, increaseQty } from '../redux/productSlice';
import useFetchProducts from '../redux/useFetchProducts';

function CartProduct({ id, qty, total }) {
  const dispatch = useDispatch();
  const { products, loading } = useFetchProducts();


  const product = products.find((product) => product.id === id);
  if (!product) return <div>{loading}</div>;

  return (
    <div className='bg-slate-200 max-w-4xl p-2 flex gap-6 rounded border-2 border-slate-300'>
      <div className='p-3 bg-white rounded overflow-hidden'>
        <img src={`data:image/jpeg;base64,${product.picture}`} className='h-70 w-80 object-cover' alt='' />
      </div>
      <div className='flex flex-col gap-1 rounded w-full'>
        <div className='flex justify-between'>
          <h3 className='font-semibold text-slate-600 capitalize text-4xl md:text-4xl py-2'>
            {product.title}
          </h3>
          <div className='cursor-pointer text-slate-700 hover:text-red-500' onClick={() => dispatch(deleteCartProductItemps(id))}>
            <AiFillDelete className='w-6 h-6' />
          </div>
        </div>
        <h3 className='font-medium text-slate-500 md:text-4xl'>{product.typeMachine}</h3>
        <h3 className='font-bold text-red-600 md:text-4xl py-4'>{product.price} {product.currency}</h3>
        <div className='flex justify-between'>
          <div className='flex gap-3 py-4 items-center'>
            <button className='bg-slate-300 py-1 mt-2 rounded hover:bg-slate-500 text-2xl p-1' onClick={() => dispatch(increaseQty(id))}>
              <TbPlus />
            </button>
            <p className='text-2xl font-semibold p-1'>{qty}</p>
            <button className='bg-slate-300 hover:bg-slate-500 py-1 mt-2 rounded text-2xl p-1' onClick={() => dispatch(decreaseQty(id))}>
              <TbMinus />
            </button>
          </div>
          <div className='flex gap-3 font-bold items-center text-slate-700'>
            <p>Total:</p>
            <p>{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProduct;