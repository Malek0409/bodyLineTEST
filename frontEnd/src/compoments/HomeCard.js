import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

function HomeCard() {
    const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}getProductByRand/${id}`);
       if (response.data.status === "Success")
         setProduct({
          title: response.data.title,
          price: response.data.price,
          currency: response.data.currency,
          picture: response.data.picture,
         });
       
      } catch (error) {
        console.error('Error fetching the product data', error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className='bg-white p-2 '>
     
         
          {
      product ? (
          <>  
             <Link to={`/menu/${id}`} onClick={()=>window.scrollTo({top:"0",behavior:"smooth"})}>
                      <div className='w-80'>
              <img src={`data:image/jpeg;base64,${product.picture}`} className='max-h-80' alt="" />
              
                  <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{product.title}</h3>
          <h3 className='font-medium text-slate-500 text-center '>{}</h3>
              <h3 className='font-bold  text-center '>{[product.price, product.currency]}</h3>
             </div> 
          </Link>   
          </> 
          
              )
        :
                  <div className='flex justify-center items-center  w-80'>
                      <h3>Loading...</h3>
                   </div>
            }
         
</div> 
  )

}

export default HomeCard
