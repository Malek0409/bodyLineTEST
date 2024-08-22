import React, { useEffect, useState } from "react";
import axios from "axios";

const Account = () => {

    const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    picture: "",
    });

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:8080/user");
    //             if (res.data.status === "Success") {
    //                 setUser({
    //                 firstName: res.data.firstName,
    //                 lastName: res.data.lastName,
    //                 email: res.data.email,
    //                 picture: res.data.picture,
    //                 });
    //             }
    //             } catch (err) {
    //                 console.log(`Error: ${err}`);
    //             }
    //     };

    // fetchUser();
    // }, []);
    useEffect(() => {
    const fetchUser = async () => {
        try {
            console.log("Fetching user data...");

            const res = await axios.get("http://localhost:8080/user");
            console.log("Response received:", res);

            if (res.data.status === "Success") {
                console.log("User data fetch successful:", res.data);

                setUser({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    picture: res.data.picture,
                });

                console.log("User state updated:", {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
                    picture: res.data.picture,
                });
            } else {
                console.log("User data fetch failed:", res.data);
            }
        } catch (err) {
            console.log(`Error: ${err}`);
        }
    };

    fetchUser();
}, []);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas");
    return;
  }
    console.log(password)
    console.log(confirmPassword)
  try {
    const formData = new FormData();
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('picture', user.picture);

    const res = await axios.put("http://localhost:8080/updateUser", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
      console.log(res)
console.log("User it's updated:", {
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    email: res.data.email,
    picture: res.data.picture,
                    password: res.data.password
                });
    if (res.data.status === "Success") {
      alert("Vos informations ont été mises à jour avec succès !");
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Une erreur est survenue lors de la mise à jour");
  }
};
 
const handleDeleteAccount = async () => {
  try {
    const res = await axios.post("http://localhost:8080/deactivateUser");

    if (res.data.status === "Account deactivated successfully") {
      alert("Votre compte a été désactivé.");
    }
  } catch (err) {
    console.log(`Error: ${err}`);
    alert("Une erreur est survenue lors de la désactivation du compte.");
  }

  setShowModal(false);
};


  return (
    <div className="container mx-auto p-24">
      <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Prénom</label>
          <input
            type="text"
            value={user.firstName}
            onChange={(e) =>
              setUser({ ...user, firstName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nom</label>
          <input
            type="text"
            value={user.lastName}
            onChange={(e) =>
              setUser({ ...user, lastName: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Photo</label>
          <div className="flex items-center">
            <img
              src={user.picture}
              alt="user profile"
              className="w-16 h-16 rounded-full mr-4"
            />
            <button
              type="button"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Changer la photo
            </button>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Nouveau mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Confirmer le mot de passe</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-x-16">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Enregistrer les modifications
          </button>
          <button
            type="button" 
            onClick={() => setShowModal(true)}
            className="px-8 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Suppression du compte
          </button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Êtes-vous sûr de vouloir supprimer votre compte ?
            </h2>
            <p className="mb-4">Cette action est irréversible.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;