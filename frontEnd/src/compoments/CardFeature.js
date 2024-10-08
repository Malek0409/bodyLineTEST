import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCartProductItemps } from '../redux/productSlice';
import useFetchProducts from '../redux/useFetchProducts';
import useFetchUser from '../redux/useFetchUser'
const CardFeature = ({ selectedCategory }) => {
  const dispatch = useDispatch();
  const { products, loading } = useFetchProducts();
  const { user } = useFetchUser(); 

  const handleAddCartProduct = (product) => {
    if (!user || !user.email) {
      alert("Vous devez être connecté pour ajouter un produit au panier");
      window.location = "/signup";
      return;
    }

    dispatch(addCartProductItemps({ product }));
  };


  
  const filteredProducts = selectedCategory
    ? products.filter(product => product.typeMachine === selectedCategory)
    : products;

  return (
    <div className='flex flex-wrap justify-center'>
      {filteredProducts.length > 0 ? filteredProducts.map((product) => (
        <div key={product.id} className='max-w-[280px] bg-white p-4 m-2 cursor-pointer'>
          <Link to={`/menu/${product.id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
            <img src={`data:image/jpeg;base64,${product.picture}`} className='h-60 w-80' alt='' />
            <h3 className='font-semibold text-slate-600 capitalize text-lg text-center py-2'>{product.title}</h3>
            <h3 className='font-medium text-slate-500 text-center '>{product.typeMachine}</h3>
            <h3 className='font-bold text-center py-4 '>{`${product.price} ${product.currency}`}</h3>
          </Link>
          <button
            className='flex justify-center items-center bg-yellow-500 rounded w-48 h-12 hover:bg-yellow-600 mx-auto'
            onClick={() => handleAddCartProduct(product)}
          >
            Add Product
          </button>
        </div>
      )) : (
        <div className='min-h-[200px] flex justify-center items-center'>
          <h3>{loading}</h3>
        </div>
      )}
    </div>
  );
};

export default memo(CardFeature);
