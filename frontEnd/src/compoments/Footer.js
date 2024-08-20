import logoApp from "../assest/logoApp.jpeg";
import { Link } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    return (
        <footer className='pr-8 pl-8 w-full bg-white'>
            <div className='flex flex-col md:flex-row justify-between items-center py-4'>
                <Link to={""}>
                    <img src={logoApp} className='h-20 w-32 md:h-32 md:w-48' alt="Logo" />
                </Link>

                <ul className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm'>
                    <li>
                        <Link to="/conditions-generales" className='text-blue-500 hover:underline'>Conditions Générales</Link>
                    </li>
                    <li>
                        <Link to="/mentions-legales" className='text-blue-500 hover:underline'>Mentions légales</Link>
                    </li>
                    <li>
                        <Link to="/donnees-personnelles" className='text-blue-500 hover:underline'>Données personnelles</Link>
                    </li>
                    <li>
                        <Link to="/gestion-cookies" className='text-blue-500 hover:underline'>Gestion des cookies</Link>
                    </li>
                    <li>
                        <Link to="/accessibilite" className='text-blue-500 hover:underline'>Accessibilité : non conforme</Link>
                    </li>
                    <li>
                        <Link to="/aide-faq-contact" className='text-blue-500 hover:underline'>Aide / FAQ / Contact</Link>
                    </li>
                    <li>
                        <a href="mailto:support@example.com" className='text-blue-500 hover:underline'>Signaler une vulnérabilité</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;