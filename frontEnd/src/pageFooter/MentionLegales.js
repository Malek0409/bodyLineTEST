import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const MentionLegales = () => {
  const [content, setContent] = useState("Ceci est le texte des mentions légales.");
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    picture: '',
    type: ''
  });

  useEffect(() => {
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
        }
      } catch (err) {
        console.log(`Error fetching user: ${err}`);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    console.log("suavegarde")
    try {
      await axios.post("http://localhost:8080/saveContent", { content: newContent });
      setContent(newContent);
      setIsEditing(false);
    } catch (err) {
      console.log(`Error saving content: ${err}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-4">Mentions Légales</h1>

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
