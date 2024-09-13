import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/verify-code`, { email, code });

      if (res.data.status === "Success") {
        alert("Code vérifié avec succès !");
        navigate("/login"); 
      } else {
        alert(res.data.Error || "Erreur lors de la vérification du code.");
      }
    } catch (error) {
      alert("Erreur lors de la soumission du formulaire.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Vérifiez votre e-mail</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <input
          type="text"
          placeholder="Code de confirmation"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Vérifiez
        </button>
      </form>
      <p className="mt-4 text-center text-red-500">Veuillez vérifier votre dossier de spam si vous ne trouvez pas le code.</p>
    </div>
  );
};

export default VerifyCode;
