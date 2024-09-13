import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const MentionLegales = () => {
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    type: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const res = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/user`);

        if (res.data.status === "Success") {
          setUser({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            picture: res.data.picture,
            type: res.data.type
          });
        }
      } catch (err) {
        console.error(`Error fetching user: ${err}`);
        setError("Impossible de récupérer les informations de l'utilisateur.");
      }
    };

    const fetchContent = async () => {
      try {

        const res = await axios.get(`${process.env.REACT_APP_SERVER_DOMIN}/getContent/mentions_legales`);

        if (res.data.status === "Success") {
          setContent(res.data.content);
        }
      } catch (err) {
        console.error(`Error fetching content: ${err}`);
        setError("Erreur lors du chargement du contenu.");
      }
    };

    fetchUser();
    fetchContent();
  }, []);

  useEffect(() => {
    if (content) {
      setNewContent(content);
    }
  }, [content]);

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setError(null);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_DOMIN}/content/mentions_legales`, { content: newContent });

      setContent(newContent);
      setIsEditing(false);
    } catch (err) {
      console.error(`Error saving content: ${err}`);
      setError("Erreur lors de la sauvegarde du contenu.");
    } finally {
      setIsSaving(false);
    }
  }, [newContent]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {user.type === 'ADMIN' && isEditing ? (
        <ReactQuill
          value={newContent}
          onChange={setNewContent}
          className="h-60"
        />
      ) : (
        <div dangerouslySetInnerHTML={{ __html: content }} />
      )}

      {user.type === 'ADMIN' && (
        <div className="mt-12">
          {isEditing ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder'}
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
