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
      const res = await axios.post("http://localhost:8080/verify-code", { email, code });
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Vérifiez votre e-mail</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Code de confirmation"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Vérifiez
          </button>
        </form>
        <p className="mt-4 text-center text-red-500">Veuillez vérifier votre dossier de spam si vous ne trouvez pas le code.</p>
      </div>
    </div>
  );
};

export default VerifyCode;
