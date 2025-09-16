
import React, { useState, useCallback } from 'react';
import type { BirthDetails, KundaliPrediction } from './types';
import { getAstrologyPrediction } from './services/geminiService';
import Header from './components/Header';
import BirthDetailsForm from './components/BirthDetailsForm';
import Loader from './components/Loader';
import KundaliChart from './components/KundaliChart';
import AIPrediction from './components/AIPrediction';
import StarryBackground from './components/StarryBackground';

const App: React.FC = () => {
  const [birthDetails, setBirthDetails] = useState<BirthDetails | null>(null);
  const [prediction, setPrediction] = useState<KundaliPrediction | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (details: BirthDetails) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setBirthDetails(details);

    try {
      const result = await getAstrologyPrediction(details);
      setPrediction(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate prediction. The stars are not aligned. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setBirthDetails(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 to-indigo-900 text-gray-200 font-sans">
      <StarryBackground />
      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />

        <main className="mt-8">
          {!prediction && !isLoading && !error && (
            <div className="max-w-xl mx-auto">
              <BirthDetailsForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
          )}

          {isLoading && <Loader />}

          {error && !isLoading && (
            <div className="text-center max-w-xl mx-auto bg-red-900/50 border border-red-700 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-300 mb-4">An Error Occurred</h2>
              <p className="text-red-200">{error}</p>
              <button
                onClick={handleReset}
                className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Try Again
              </button>
            </div>
          )}

          {prediction && !isLoading && birthDetails && (
            <div>
              <div className="text-center mb-8">
                <button
                  onClick={handleReset}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  Start New Kundali
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1">
                  <KundaliChart name={birthDetails.name} />
                </div>
                <div className="lg:col-span-2">
                  <AIPrediction prediction={prediction} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
