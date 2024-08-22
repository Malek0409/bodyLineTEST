import React, { useState, useEffect } from 'react';

const MentionLegales = ({ userType }) => {
  const [content, setContent] = useState("Ceci est le texte des mentions légales.");
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);

  useEffect(() => {
    // On pourrait récupérer le contenu des mentions légales à partir d'une API ou d'une base de données ici
    // setContent(fetchedContent);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setContent(newContent);
    setIsEditing(false);
    // Ici, vous pouvez envoyer la mise à jour à une API ou à une base de données
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>
      
      {userType === 'ADMIN' && isEditing ? (
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
      ) : (
        <p className="text-lg">{content}</p>
      )}

      {userType === 'ADMIN' && (
        <div className="mt-4">
          {isEditing ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
            >
              Sauvegarder
            </button>
          ) : (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleEdit}
            >
              Modifier
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MentionLegales;
