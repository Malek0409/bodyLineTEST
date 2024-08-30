

import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center">
          <p className="m-0">Ce site utilise des cookies pour améliorer votre expérience. En continuant à naviguer,
              vous acceptez notre
              <a href="/privacy-policy" className="underline">politique de confidentialité</a>.</p>
      <button
        onClick={handleAccept}
        className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
      >
        Accepter
      </button>
    </div>
  );
};

export default CookieConsent;
