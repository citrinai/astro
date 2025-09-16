import React, { useState, useMemo } from 'react';

interface KundaliChartProps {
  name: string;
}

// Astrological constants
const PLANETS = {
  Su: 'Sun', Mo: 'Moon', Ma: 'Mars', Me: 'Mercury', Ju: 'Jupiter',
  Ve: 'Venus', Sa: 'Saturn', Ra: 'Rahu', Ke: 'Ketu'
};
const PLANET_KEYS = Object.keys(PLANETS);

const SIGNS = ['Ar', 'Ta', 'Ge', 'Cn', 'Le', 'Vi', 'Li', 'Sc', 'Sg', 'Cp', 'Aq', 'Pi'];

type ChartType = 'D1' | 'D9' | 'D30' | 'D60';

// This map provides the full name for each chart type.
const chartDetails: Record<ChartType, { name: string; description: string }> = {
    D1: { name: 'Rasi', description: 'Main Birth Chart' },
    D9: { name: 'Navamsa', description: 'Spouse & Dharma' },
    D30: { name: 'Trimsamsa', description: 'Misfortunes & Character' },
    D60: { name: 'Shashtyamsa', description: 'Overall Life' },
};
const chartTypes = Object.keys(chartDetails) as ChartType[];

// Aspect definitions
const ASPECT_TYPES = {
    CONJUNCTION: { houses: 0, name: 'Conjunction', color: '#a78bfa' },
    SEXTILE: { houses: 2, name: 'Sextile', color: '#60a5fa' }, // Harmonious
    SQUARE: { houses: 3, name: 'Square', color: '#fb923c' }, // Challenging
    TRINE: { houses: 4, name: 'Trine', color: '#4ade80' }, // Harmonious
    OPPOSITION: { houses: 6, name: 'Opposition', color: '#f87171' }, // Challenging
};

// Planetary Dignity Rules
const DIGNITY_RULES: { [key: string]: { own: string[], exalted: string, debilitated: string } } = {
  Su: { own: ['Le'], exalted: 'Ar', debilitated: 'Li' },
  Mo: { own: ['Cn'], exalted: 'Ta', debilitated: 'Sc' },
  Ma: { own: ['Ar', 'Sc'], exalted: 'Cp', debilitated: 'Cn' },
  Me: { own: ['Ge', 'Vi'], exalted: 'Vi', debilitated: 'Pi' },
  Ju: { own: ['Sg', 'Pi'], exalted: 'Cn', debilitated: 'Cp' },
  Ve: { own: ['Ta', 'Li'], exalted: 'Pi', debilitated: 'Vi' },
  Sa: { own: ['Cp', 'Aq'], exalted: 'Li', debilitated: 'Ar' },
};

type Dignity = 'exalted' | 'ownSign' | 'debilitated' | 'neutral';

const DIGNITY_STYLES: Record<Dignity, { name: string, color: string, symbol: string }> = {
    exalted: { name: 'Exalted', color: '#facc15', symbol: '*' }, // yellow-400
    ownSign: { name: 'Own Sign', color: '#7dd3fc', symbol: '+' }, // sky-300
    debilitated: { name: 'Debilitated', color: '#f87171', symbol: '°' }, // red-400
    neutral: { name: 'Neutral', color: '#e5e7eb', symbol: '' }, // gray-200
};

// Placeholder for real astrological calculations.
// This function generates deterministic, pseudo-random chart data based on a seed (name).
const generateChartData = (seed: string, chartType: ChartType) => {
  let seedNum = 0;
  for (let i = 0; i < seed.length; i++) {
    seedNum += seed.charCodeAt(i);
  }

  // Adjust seed based on chart type for variation
  const chartTypeMultipliers = { D1: 1, D9: 9, D30: 30, D60: 60 };
  seedNum *= chartTypeMultipliers[chartType];
  
  const ascendantSignIndex = (seedNum % 12);
  const planetPositions: { [key: string]: number } = {};
  
  PLANET_KEYS.forEach((planet, index) => {
    // A simple hashing function to place planets in houses 1-12
    const house = ((seedNum + (index + 1) * 37) % 12) + 1;
    planetPositions[planet] = house;
  });

  return { ascendantSignIndex, planetPositions };
};

// Function to calculate aspects based on house positions
const calculateAspects = (planetPositions: { [key: string]: number }) => {
    const aspects: { planet1: string; planet2: string; type: keyof typeof ASPECT_TYPES }[] = [];
    const planets = Object.keys(planetPositions);

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const p1 = planets[i];
            const p2 = planets[j];
            const h1 = planetPositions[p1];
            const h2 = planetPositions[p2];
            const diff = Math.abs(h1 - h2);
            const houseDiff = Math.min(diff, 12 - diff);

            for (const aspectKey in ASPECT_TYPES) {
                const aspect = ASPECT_TYPES[aspectKey as keyof typeof ASPECT_TYPES];
                // Don't draw lines for conjunctions (same house)
                if (houseDiff === aspect.houses && aspect.houses !== 0) { 
                    aspects.push({ planet1: p1, planet2: p2, type: aspectKey as keyof typeof ASPECT_TYPES });
                }
            }
        }
    }
    return aspects;
};

// Function to calculate planetary dignities
const calculateDignities = (planetPositions: { [key: string]: number }, ascendantSignIndex: number) => {
  const dignities: { [key: string]: Dignity } = {};

  for (const planet of PLANET_KEYS) {
    const house = planetPositions[planet];
    if (!house) continue;

    const signIndex = (ascendantSignIndex + house - 1) % 12;
    const sign = SIGNS[signIndex];
    const rules = DIGNITY_RULES[planet];
    
    if (!rules) {
      dignities[planet] = 'neutral';
      continue;
    }

    if (rules.exalted === sign) {
      dignities[planet] = 'exalted';
    } else if (rules.debilitated === sign) {
      dignities[planet] = 'debilitated';
    } else if (rules.own.includes(sign)) {
      dignities[planet] = 'ownSign';
    } else {
      dignities[planet] = 'neutral';
    }
  }
  return dignities;
};

// House layout coordinates within a 100x100 viewBox
const houseCenters: { [key: number]: { x: number, y: number } } = {
  1: { x: 50, y: 25 }, 2: { x: 25, y: 37.5 }, 3: { x: 25, y: 62.5 }, 4: { x: 50, y: 75 },
  5: { x: 62.5, y: 87.5 }, 6: { x: 75, y: 87.5 }, 7: { x: 87.5, y: 75 }, 8: { x: 87.5, y: 62.5 },
  9: { x: 75, y: 37.5 }, 10: { x: 62.5, y: 12.5 }, 11: { x: 37.5, y: 12.5 }, 12: { x: 37.5, y: 37.5 },
};

const signPositions: { [key: number]: { x: number, y: number } } = {
    1: { x: 50, y: 6 }, 2: { x: 10, y: 30 }, 3: { x: 10, y: 70 }, 4: { x: 50, y: 94 },
    5: { x: 70, y: 94 }, 6: { x: 90, y: 94 }, 7: { x: 90, y: 70 }, 8: { x: 90, y: 30 },
    9: { x: 70, y: 6 }, 10: { x: 30, y: 6 }, 11: { x: 10, y: 6 }, 12: { x: 30, y: 30 },
};

interface ChartSVGProps {
    chartData: ReturnType<typeof generateChartData>;
    aspects: ReturnType<typeof calculateAspects>;
    dignities: ReturnType<typeof calculateDignities>;
}

const ChartSVG: React.FC<ChartSVGProps> = ({ chartData, aspects, dignities }) => {
    const { ascendantSignIndex, planetPositions } = chartData;

    const houses = Array.from({ length: 12 }, (_, i) => i + 1);
    const planetsByHouse: { [key: number]: string[] } = {};
    houses.forEach(h => planetsByHouse[h] = []);
    
    planetsByHouse[1].push('As'); // Add ascendant to house 1

    for (const planet in planetPositions) {
        const house = planetPositions[planet];
        if (planetsByHouse[house]) {
            planetsByHouse[house].push(planet);
        }
    }

    return (
        <div className="aspect-square w-full max-w-sm mx-auto relative">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#a5b4fc', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#c4b5fd', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                {/* Main diamond */}
                <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5" />
                {/* Inner lines */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />
                <line x1="50" y1="0" x2="50" y2="100" stroke="url(#lineGradient)" strokeWidth="0.2" />
                <line x1="0" y1="50" x2="50" y2="0" stroke="url(#lineGradient)" strokeWidth="0.2" />
                <line x1="50" y1="0" x2="100" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />
                <line x1="100" y1="50" x2="50" y2="100" stroke="url(#lineGradient)" strokeWidth="0.2" />
                <line x1="50" y1="100" x2="0" y2="50" stroke="url(#lineGradient)" strokeWidth="0.2" />

                {/* Aspect Lines */}
                <g opacity="0.7">
                    {aspects.map(({ planet1, planet2, type }, index) => {
                        const h1 = planetPositions[planet1];
                        const h2 = planetPositions[planet2];
                        if (!h1 || !h2) return null;

                        const pos1 = houseCenters[h1];
                        const pos2 = houseCenters[h2];
                        const color = ASPECT_TYPES[type].color;

                        return (
                            <line
                                key={`aspect-${index}`}
                                x1={pos1.x}
                                y1={pos1.y}
                                x2={pos2.x}
                                y2={pos2.y}
                                stroke={color}
                                strokeWidth="0.3"
                            />
                        );
                    })}
                </g>

                {/* Signs */}
                {houses.map(houseNumber => {
                    const signIndex = (ascendantSignIndex + houseNumber - 1) % 12;
                    const sign = SIGNS[signIndex];
                    const pos = signPositions[houseNumber];
                    return (
                        <text key={`sign-${houseNumber}`} x={pos.x} y={pos.y} fontSize="4" fill="#9ca3af" textAnchor="middle" dominantBaseline="middle" className="font-mono">
                            {sign}
                        </text>
                    );
                })}

                {/* Planets */}
                {houses.map(houseNumber => {
                    const planetsInHouse = planetsByHouse[houseNumber];
                    const center = houseCenters[houseNumber];
                    const numPlanets = planetsInHouse.length;
                    const fontSize = numPlanets > 3 ? 3 : 4;
                    const spacing = numPlanets > 3 ? 3.5 : 4.5;
                    const startY = center.y - ((numPlanets - 1) * spacing) / 2;

                    return planetsInHouse.map((planet, index) => {
                        const isAscendant = planet === 'As';
                         // Treat Ascendant as exalted for color, but don't give it a dignity symbol
                        const dignity: Dignity = isAscendant ? 'exalted' : (dignities[planet] || 'neutral');
                        const style = DIGNITY_STYLES[dignity];
                        const symbol = !isAscendant ? style.symbol : '';
                        return (
                        <text
                            key={`planet-${houseNumber}-${planet}`}
                            x={center.x}
                            y={startY + index * spacing}
                            fontSize={fontSize}
                            fill={style.color}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="font-bold font-mono"
                        >
                            {planet}{symbol}
                        </text>
                    )});
                })}
            </svg>
        </div>
    );
};

const KundaliChart: React.FC<KundaliChartProps> = ({ name }) => {
    const [activeChart, setActiveChart] = useState<ChartType>('D1');

    const chartData = useMemo(() => generateChartData(name, activeChart), [name, activeChart]);
    const aspects = useMemo(() => calculateAspects(chartData.planetPositions), [chartData]);
    const dignities = useMemo(() => calculateDignities(chartData.planetPositions, chartData.ascendantSignIndex), [chartData]);
    
    return (
        <div className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-indigo-700/50 sticky top-8">
            <h3 className="text-xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                Birth Chart for {name}
            </h3>
            
            <div className="flex justify-center mb-4 bg-gray-900/40 rounded-lg p-1">
                {chartTypes.map(chart => (
                    <button
                        key={chart}
                        onClick={() => setActiveChart(chart)}
                        className={`px-3 py-1 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none ${
                            activeChart === chart
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'text-indigo-200 hover:bg-indigo-900/50'
                        }`}
                        aria-label={`Select ${chartDetails[chart].name} chart`}
                    >
                        {chartDetails[chart].name === 'Rasi' ? 'D1 Rasi' : 
                         chartDetails[chart].name === 'Navamsa' ? 'D9 Navamsa' :
                         chartDetails[chart].name === 'Trimsamsa' ? 'D30 Trimsamsa' : 
                         'D60 Shashtyamsa'}
                    </button>
                ))}
            </div>

            <ChartSVG chartData={chartData} aspects={aspects} dignities={dignities} />
            
             <div className="mt-4 space-y-2">
                <div>
                  <p className="text-center text-xs font-bold text-gray-400 mb-1">Dignity Legend</p>
                  <div className="flex justify-center items-center space-x-2 sm:space-x-3 text-xs text-gray-500 flex-wrap">
                      {(Object.keys(DIGNITY_STYLES) as Dignity[]).filter(d => d !== 'neutral').map(dignityKey => {
                          const dignity = DIGNITY_STYLES[dignityKey];
                          return (
                              <div key={dignity.name} className="flex items-center m-0.5">
                                  <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: dignity.color }}></span>
                                  <span>{dignity.name} ({dignity.symbol})</span>
                              </div>
                          );
                      })}
                  </div>
                </div>
                <div>
                    <p className="text-center text-xs font-bold text-gray-400 mb-1">Aspects Legend</p>
                    <div className="flex justify-center items-center space-x-2 sm:space-x-3 text-xs text-gray-500 flex-wrap">
                        {Object.values(ASPECT_TYPES).filter(a => a.houses !== 0).map(aspect => (
                            <div key={aspect.name} className="flex items-center m-0.5">
                                <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: aspect.color }}></span>
                                <span>{aspect.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <p className="text-center text-xs text-gray-500 mt-2">
                This is a dynamically generated representation. Astrological calculations are simulated.
            </p>
        </div>
    );
};

export default KundaliChart;