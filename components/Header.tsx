import React from 'react';

// Using a crown icon as a placeholder for the logo, inspired by the image.
const CrownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M13.19 4.47a.75.75 0 00-1.112-1.023l-3.5 3.182-.82-1.434a.75.75 0 00-1.298.75l1.25 2.188a.75.75 0 001.299-.75l-.174-.304 3.5-3.182zM12 2.25a.75.75 0 01.75.75v.516a.75.75 0 01-1.5 0v-.516a.75.75 0 01.75-.75zm4.925 2.22a.75.75 0 011.112-1.023l3.5 3.182-.174-.304a.75.75 0 111.299.75l1.25 2.188a.75.75 0 01-1.298.75l-.82-1.434-3.5 3.182a.75.75 0 01-1.112-1.024zM12 12.022c.863 0 1.684-.234 2.403-.654a.75.75 0 01.815 1.255 9.002 9.002 0 01-6.436 0 .75.75 0 01.815-1.255A7.502 7.502 0 0012 12.022zM3.75 13.5a.75.75 0 000 1.5h16.5a.75.75 0 000-1.5H3.75zM12 15.75a7.5 7.5 0 00-7.22 5.143.75.75 0 001.44.414A6 6 0 0112 17.25a6 6 0 015.78 4.057.75.75 0 001.44-.414A7.5 7.5 0 0012 15.75z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center">
        <CrownIcon className="w-10 h-10 text-yellow-400" />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-indigo-400 ml-4">
          KundaliPulse
        </h1>
      </div>
      <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
        Unlock the secrets of the cosmos. Enter your birth details to generate your Vedic Kundali and receive personalized AI-driven astrological insights.
      </p>
    </header>
  );
};

export default Header;
