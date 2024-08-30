import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-800 text-white py-16'>
            <div className='container mx-auto flex flex-col md:flex-row items-center justify-between'>
               

                <ul className='flex flex-col md:flex-row text-center md:text-left space-y-4 md:space-y-0 md:space-x-8 text-sm md:text-base'>
                    <li>
                        <Link to={"mentions-legales"} className='hover:text-yellow-500 transition-colors duration-300'>Mentions légales</Link>
                    </li>
                    <li>
                        <Link to={"conditions-generales"} className='hover:text-yellow-500 transition-colors duration-300'>Conditions Générales</Link>
                    </li>
                    <li>
                        <Link to={"Politique-de-confidentialite"} className='hover:text-yellow-500 transition-colors duration-300'>Politique de confidentialité</Link>
                    </li>
                    <li>
                        <Link to={"donnees-personnelles"} className='hover:text-yellow-500 transition-colors duration-300'>Données personnelles</Link>
                    </li>
                    <li>
                        <Link to={"gestion-cookies"} className='hover:text-yellow-500 transition-colors duration-300'>Gestion des cookies</Link>
                    </li>
                    <li>
                        <Link to={"accessibilite"} className='hover:text-yellow-500 transition-colors duration-300'>Accessibilité : non conforme</Link>
                    </li>
                    <li>
                        <Link to={"aide-faq-contact"} className='hover:text-yellow-500 transition-colors duration-300'>Aide / FAQ / Contact</Link>
                    </li>
                    <li>
                        <a href="mailto:bodyLine@gmail.com" className='hover:text-yellow-500 transition-colors duration-300'>Signaler une vulnérabilité</a>
                    </li>
                </ul>
            </div>

            <div className='mt-8 text-center text-sm text-gray-400'>
                &copy; {new Date().getFullYear()} MyFitness. Tous droits réservés.
            </div>
        </footer>
    );
}

export default Footer;