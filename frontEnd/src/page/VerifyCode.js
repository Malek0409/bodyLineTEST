import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const [email, setEmail] = useState(''); 
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/verify-code`, { email, code });

      if (res.data.status === 'Succès') {
        alert('Compte vérifié ! Vous pouvez maintenant vous connecter.');
        navigate('/login');
      } else {
        alert('Code de vérification invalide');
      }
    } catch (error) {
      alert('Erreur lors de la vérification du code');
    }
  };

  return (
    <div>
      <h2>Vérifiez Votre Email</h2>
      <input
        type="text"
        placeholder="Entrez le code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleVerify}>Vérifier</button>
    </div>
  );
};

export default VerifyCode;
