
import React from 'react';
import { StarIcon } from './IconComponents';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center">
        <StarIcon className="w-10 h-10 text-yellow-400 animate-pulse" />
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-indigo-400 ml-4">
          AI Kundali Navigator
        </h1>
      </div>
      <p className="mt-4 text-lg text-indigo-200 max-w-2xl mx-auto">
        Unlock the secrets of the cosmos. Enter your birth details to generate your Vedic Kundali and receive personalized AI-driven astrological insights.
      </p>
    </header>
  );
};

export default Header;
