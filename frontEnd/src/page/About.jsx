import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">À propos de nous</h2>
        <p className="text-gray-700 mb-4">
          Bienvenue sur notre site de vente de matériels de musculation. Nous sommes passionnés par la condition physique et déterminés à fournir les meilleurs équipements pour aider nos clients à atteindre leurs objectifs de fitness.
        </p>
        <p className="text-gray-700 mb-4">
          Notre mission est de rendre les équipements de musculation de haute qualité accessibles à tous, que vous soyez un débutant cherchant à améliorer votre santé ou un athlète expérimenté visant de nouvelles performances.
        </p>
        <p className="text-gray-700 mb-4">
          Nous sélectionnons soigneusement chaque produit pour garantir qu'il répond à nos normes élevées en termes de durabilité, de fonctionnalité et de performance. Votre satisfaction est notre priorité et nous nous engageons à fournir un service client exceptionnel.
        </p>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Notre équipe</h3>
        <p className="text-gray-700 mb-4">
          Nous sommes une équipe de professionnels dévoués et passionnés par le fitness. Avec des années d'expérience dans l'industrie, nous sommes ici pour vous conseiller et vous aider à choisir les équipements qui répondent le mieux à vos besoins.
        </p>
        <h3 className="text-2xl font-semibold mb-4 text-gray-900">Pourquoi nous choisir ?</h3>
        <ul className="list-disc list-inside text-gray-700 mb-4">
          <li>Produits de haute qualité</li>
          <li>Service client exceptionnel</li>
          <li>Prix compétitifs</li>
          <li>Livraison rapide et fiable</li>
        </ul>
        <p className="text-gray-700">
          Merci de nous faire confiance pour vos besoins en matériels de musculation. Nous sommes impatients de vous aider à atteindre vos objectifs de fitness.
        </p>
      </div>
    </div>
  );
};

export default About;