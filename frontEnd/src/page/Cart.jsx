import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CartProduct from '../compoments/CartProduct'
import { setCartItems } from '../redux/productSlice'
import axios from 'axios'
import toast from 'react-hot-toast'


const Cart = () => {
    const dispatch = useDispatch();
    const productCartItems = useSelector((state) => state.product.cartProductItems);
    const totalQty = productCartItems && productCartItems.reduce((acc, curr) => acc + parseFloat(curr.quantite), 0);
    const totalPrice = productCartItems && productCartItems.reduce((acc, curr) => acc + parseFloat(curr.quantite * curr.price), 0);
   
    const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    type:''
  });
    
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
    
   useEffect(() => {
        const fetchCartLine = async () => {
            try {
                const { data } = await axios.get('http://15.237.183.184:8080/getProductToCartLine');
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

    const handlePayment = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/checkout-payment`, {

                userId: 1, 
                items: productCartItems,
            });

            if (res.data.url) {
                toast("Redirecting to payment gateway...");
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error("Erreur lors du paiement :", error);
            toast.error("Erreur lors du paiement !");
        }
    };

 return (
     <div className='p-8 md:p-12'>
            
            <h2 className='text-lg text-slate-800 font-bold md:text-4xl p-16 mt-8'>Vos Produits dans le Panier :</h2>
            {productCartItems && productCartItems.length > 0 ? (
             <div className='my-4 flex gap-3 mt-4'>
                    <div>
                        {productCartItems.map(el => (
                            <CartProduct
                                item={el}
                            />
                        ))}
                    </div>
                    {user ? ( 
                        <div className=''>
                            <h2 className='bg-blue-600 text-white p-2 text-lg'>Résumé</h2>
                            <div className='flex w-full py-2 text-lg'>
                                <p>Total Qty:</p>
                                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                            </div>
                            <div className='flex w-full py-2 text-lg'>
                                <p>Total Prix:</p>
                                <p className='ml-auto w-32 font-bold'>{totalPrice}</p>
                            </div>
                            <button
                                className='bg-red-500 w-full text-lg font-bold py-2 text-white'
                                onClick={handlePayment}
                            >
                                Paiement
                            </button>
                        </div>
                    ) : (
                        <div className='w-full max-w-sm ml-auto'>
                            <h2 className='bg-gray-600 text-white p-2 text-lg'>Veuillez vous connecter pour voir le résumé</h2>
                        </div>
                    )}
                </div>
            ) : (
                <div className='flex w-full justify-center items-center flex-col'>
                    {/* <img src={emptyCartImage} className='w-full max-w-sm' alt='Empty Cart' /> */}
                    <p className='text-slate-500 text-4xl font-bold'>Panier Vide</p>
                </div>
            )}
        </div>
    );
};

export default Cart;