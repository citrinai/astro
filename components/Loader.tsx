
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 border-4 border-indigo-500/50 rounded-full"></div>
        <div className="absolute inset-0 border-t-4 border-yellow-300 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-t-2 border-purple-400 rounded-full animate-spin" style={{ animationDelay: '0.1s' }}></div>
      </div>
      <p className="mt-6 text-lg text-indigo-200 animate-pulse">
        Calculating planetary positions and decoding your destiny...
      </p>
    </div>
  );
};

export default Loader;
