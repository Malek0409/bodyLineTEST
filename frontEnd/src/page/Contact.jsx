import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre nom"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="message">Message</label>
          <textarea
            id="message"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Votre message"
            rows="4"
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
