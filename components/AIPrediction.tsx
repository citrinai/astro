
import React from 'react';
import type { KundaliPrediction } from '../types';
import { PersonalityIcon, CareerIcon, RelationshipsIcon, HealthIcon, RemediesIcon } from './IconComponents';

interface AIPredictionProps {
  prediction: KundaliPrediction;
}

const PredictionCard: React.FC<{ title: string; content: string; icon: React.ReactNode }> = ({ title, content, icon }) => (
  <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-indigo-700/50 transform transition-all duration-300 hover:border-indigo-500 hover:shadow-indigo-500/20 hover:scale-[1.02]">
    <div className="flex items-center mb-4">
      <div className="text-indigo-400 mr-4">{icon}</div>
      <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{title}</h3>
    </div>
    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{content}</p>
  </div>
);

const AIPrediction: React.FC<AIPredictionProps> = ({ prediction }) => {
  return (
    <div className="space-y-6">
      <PredictionCard title="Personality" content={prediction.personality} icon={<PersonalityIcon />} />
      <PredictionCard title="Career & Finance" content={prediction.career} icon={<CareerIcon />} />
      <PredictionCard title="Relationships & Love" content={prediction.relationships} icon={<RelationshipsIcon />} />
      <PredictionCard title="Health & Wellness" content={prediction.health} icon={<HealthIcon />} />
      <PredictionCard title="Cosmic Remedies" content={prediction.remedies} icon={<RemediesIcon />} />
    </div>
  );
};

export default AIPrediction;
