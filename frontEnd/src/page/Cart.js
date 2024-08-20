import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../compoments/CartProduct'
import emptyCartImage from '../assest/emptyCart.gif'

const Cart = () => {
  
  const productCartItems = useSelector((state) => state.product.cartProductItems)
  const totalPrice = productCartItems.reduce((acc, curr) => acc + parseFloat(curr.total), 0)
  const totalQty = productCartItems.reduce((acc, curr) => acc + parseFloat(curr.qty), 0)
 
  console.log(productCartItems)

  return (
  <div className='p-8 md:p-8'>
    
    <h2 className='text-lg text-slate-800 font-bold md:text-3xl'> Your Cart Product Items</h2>
    {productCartItems.length > 0 ? (
  
    <div className='my-4 flex gap-3'>
        
      <div>
    {productCartItems.map(el => {
    console.log("Product:", el);
    return (
      <CartProduct
        key={el.id}
        id={el.id}
        title={el.title}
        picture={el.picture}
        typeMachine={el.typeMachine}
        qty={el.qty}
        total={el.total}
      />
    );
    })}
      </div>

          
    
      <div className='w-full max-w-sm ml-auto'>
            
        <h2 className='bg-blue-600 text-white p-2 text-lg'>Summary</h2>
        
        <div className='flex w-full py-2 text-lg'>
              
              <p>Total Qty:</p>
              <p className='ml-auto w-32 font-bold'>{totalQty}</p>
        
        </div>
            
        <div className='flex w-full py-2 text-lg'>
            
            <p>Total Price:</p>
            <p className='ml-auto w-32 font-bold'>{totalPrice}</p>
        
        </div>
        
        <button className='bg-red-500 w-full text-lg font-bold py-2 text-white'>Payment</button>
      
      </div>
    
    </div>
      
    ) : (
        
      <div className='flex w-full justify-center items-center flex-col'>
          <img src={ emptyCartImage} className='w-full max-w-sm' alt='Empty Cart' />
          <p className='text-slate-500 text-4xl font-bold'>Empty Cart</p>
      </div>
      )}
  </div>
  )
}

export default Cart