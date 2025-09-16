
import React from 'react';

interface KundaliChartProps {
  name: string;
}

const KundaliChart: React.FC<KundaliChartProps> = ({ name }) => {
    const planets = ['As', 'Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'];
    // Simple non-random placement for consistency
    const positions = [
        { top: '45%', left: '45%' }, // As
        { top: '15%', left: '15%' }, // Su
        { top: '15%', left: '75%' }, // Mo
        { top: '75%', left: '15%' }, // Ma
        { top: '75%', left: '75%' }, // Me
        { top: '15%', left: '45%' }, // Ju
        { top: '45%', left: '15%' }, // Ve
        { top: '75%', left: '45%' }, // Sa
        { top: '45%', left: '75%' }, // Ra
        { top: '30%', left: '60%' }, // Ke
    ];

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-indigo-700/50 sticky top-8">
      <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
        Birth Chart for {name}
      </h3>
      <div className="aspect-square w-full max-w-sm mx-auto relative">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Main diamond */}
          <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
          {/* Inner lines */}
          <line x1="0" y1="50" x2="100" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="0" x2="50" y2="100" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="0" y1="50" x2="50" y2="0" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="0" x2="100" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="100" y1="50" x2="50" y2="100" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <line x1="50" y1="100" x2="0" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#a5b4fc', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#c4b5fd', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
        </svg>
         <div className="absolute inset-0">
          {planets.map((planet, index) => (
            <span
              key={planet}
              className="absolute text-xs font-mono text-yellow-300 transform -translate-x-1/2 -translate-y-1/2"
              style={positions[index]}
            >
              {planet}
            </span>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 mt-4">This is a stylized representation for visual purposes.</p>
    </div>
  );
};

export default KundaliChart;
