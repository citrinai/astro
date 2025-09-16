
import React, { useState } from 'react';
import type { BirthDetails } from '../types';

interface BirthDetailsFormProps {
  onSubmit: (details: BirthDetails) => void;
  isLoading: boolean;
}

const BirthDetailsForm: React.FC<BirthDetailsFormProps> = ({ onSubmit, isLoading }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && date && time && place) {
      onSubmit({ name, date, time, place });
    }
  };

  const inputClass = "w-full px-4 py-3 bg-gray-800/50 border border-indigo-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-100 transition-all duration-300 placeholder-gray-500";
  const labelClass = "block text-sm font-medium text-indigo-200 mb-2";

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-indigo-700/50">
      <h2 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Enter Your Birth Details</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className={labelClass}>Full Name</label>
          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className={inputClass} placeholder="e.g., Siddhartha Gautama" />
        </div>
        <div>
          <label htmlFor="date" className={labelClass}>Date of Birth</label>
          <input type="date" id="date" value={date} onChange={e => setDate(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>Time of Birth</label>
          <input type="time" id="time" value={time} onChange={e => setTime(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label htmlFor="place" className={labelClass}>Place of Birth</label>
          <input type="text" id="place" value={place} onChange={e => setPlace(e.target.value)} required className={inputClass} placeholder="e.g., Lumbini, Nepal" />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg disabled:bg-indigo-800 disabled:cursor-not-allowed transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          {isLoading ? 'Consulting the Cosmos...' : 'Generate Kundali'}
        </button>
      </form>
    </div>
  );
};

export default BirthDetailsForm;
