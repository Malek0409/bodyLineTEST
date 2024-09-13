import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updatedProduct } from '../redux/productSlice';
import useFetchProducts from '../redux/useFetchProducts';
import axios from 'axios';
import UnavailableProduct from '../compoments/unavailableProducts';

const CardFeatureUpdate = () => {
  const [unavailableProducts, setUnavailableProducts] = useState({});
  const dispatch = useDispatch();
  const { products, loading } = useFetchProducts();
  const [editedProducts, setEditedProducts] = useState({});

  const handleInputChange = (productId, field, value) => {
    setEditedProducts({
      ...editedProducts,
      [productId]: {
        ...editedProducts[productId],
        [field]: value,
      }
    });
  };

  const handleUpdateProduct = async (product) => {
    try {
      const updatedProductData = {
        ...product,
        ...editedProducts[product.id],
        typeMachine: product.typeMachine,
        title: product.title,
      };

      const formData = new FormData();
      formData.append('id', updatedProductData.id);
      formData.append('price', updatedProductData.price);
      formData.append('unitNumber', updatedProductData.unitNumber);
      formData.append('title', updatedProductData.title);
      formData.append('typeMachine', updatedProductData.typeMachine);


      const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/updateProduct`, formData, {


        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      console.log(res.data);

      if (res.data.status === "Success") {
        dispatch(updatedProduct({ product: updatedProductData }));
        alert("Le produit a été mis à jour avec succès !");
      } else {
        console.error("Failed to update product");
        alert("Échec de la mise à jour du produit.");
      }
    } catch (err) {
      console.log(`Error: ${err}`);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  const handleConfirmDelete = (productId) => {
    setUnavailableProducts({
      ...unavailableProducts,
      [productId]: true,
    });
  };

  return (
    <div className='flex flex-wrap justify-center'>
      {products.length > 0 ? products.map((product) => (
        <div
          key={product.id}
          className={`relative max-w-[280px] p-4 m-2 ${unavailableProducts[product.id] ? 'bg-gray-300 opacity-50' : 'bg-white'}`}
        >
          <div className="relative">
            <Link to={`/menu/${product.id}`} onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}>
              <img src={`data:image/jpeg;base64,${product.picture}`} className='h-60 w-80' alt='' />
            </Link>
            
            <UnavailableProduct 
              productId={product.id} 
              onConfirmDelete={handleConfirmDelete} 
            />

          </div>
          <h3 className='font-semibold text-slate-600 capitalize text-lg text-center py-2 w-full border-b'>{product.title}</h3>
          <h3 className='font-medium text-slate-500 text-center'>{product.typeMachine}</h3>
          <div className="flex items-center">
            <input
              type="text"
              value={editedProducts[product.id]?.price || product.price}
              onChange={(e) => handleInputChange(product.id, 'price', e.target.value)}
              className='font-bold text-center py-4 w-full border-b'
              disabled={unavailableProducts[product.id]}
            />
            <span className='mx-2'>{editedProducts[product.id]?.currency || product.currency}</span>
          </div>
            
          <div className="flex items-center">
            <input
              type="text"
              value={editedProducts[product.id]?.unitNumber || product.unitNumber}
              onChange={(e) => handleInputChange(product.id, 'unitNumber', e.target.value)}
              className='font-bold text-center py-4 w-full border-b'
              disabled={unavailableProducts[product.id]}
            />
            <span className='mx-2'>QT</span>
          </div>
         
          <button
            className={`flex justify-center items-center rounded w-48 h-12 mx-auto ${
              unavailableProducts[product.id] ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={() => handleUpdateProduct(product)}
            disabled={unavailableProducts[product.id]}
          >
            Update Product
          </button>

          {unavailableProducts[product.id] && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-xl">
              Non disponible
            </div>
          )}
        </div>
      )) : (
        <div className='min-h-[200px] flex justify-center items-center'>
          <h3>{loading}</h3>
        </div>
      )}
    </div>
  );
};

export default CardFeatureUpdate;