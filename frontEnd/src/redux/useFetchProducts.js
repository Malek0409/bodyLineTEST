import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Hook personnalisé pour récupérer la liste des produits depuis une API.
 * 
 * @returns {Object} Un objet contenant les produits, l'état de chargement 
 * et les erreurs éventuelles.
 */
const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fonction asynchrone pour récupérer les produits depuis le serveur.
     * 
     * @async
     * @function fetchProducts
     */
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://api.bodyline.site/getProduct`);

        if (response.data.status === "Success") {
          setProducts(response.data.products);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useFetchProducts;