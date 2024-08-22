import React, { useState } from 'react';
import { TiDelete } from "react-icons/ti";

const UnavailableProduct = ({ productId, onConfirmDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    onConfirmDelete(productId);  
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button 
        className="absolute top-2 left-2 text-red-600 hover:text-red-800 focus:outline-none"
        onClick={handleDeleteClick}
      >
        <TiDelete size={60} />
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="mb-4">Voulez-vous vraiment supprimer ce produit ?</p>
            <div className="flex justify-center space-x-4">
              <button 
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                onClick={handleCancel}
              >
                Annuler
              </button>
              <button 
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UnavailableProduct;