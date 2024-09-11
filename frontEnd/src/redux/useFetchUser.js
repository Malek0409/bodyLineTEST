import { useEffect, useState } from 'react';
import axios from 'axios';

/**
 * Hook personnalisé pour récupérer les informations de l'utilisateur depuis une API.
 * 
 * @returns {Object} Un objet contenant les informations de l'utilisateur, 
 * l'état de chargement et les erreurs éventuelles.
 */
const useFetchUser = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    type: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * Fonction asynchrone pour récupérer les informations de l'utilisateur depuis le serveur.
     * 
     * @async
     * @function fetchUser
     */
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user");
        if (res.data.status === "Success") {
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            picture: res.data.picture,
            type: res.data.type
          });
        } else {
          setError('Failed to fetch user information');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};

export default useFetchUser;
