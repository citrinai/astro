
import React from 'react';

// Memoize this component as it's purely presentational and doesn't need to re-render
const StarryBackground = React.memo(() => {
  const starStyle = (size: number, top: string, left: string, animationDuration: string, animationDelay: string = '0s') => ({
    width: `${size}px`,
    height: `${size}px`,
    top,
    left,
    animation: `twinkle ${animationDuration} infinite alternate`,
    animationDelay,
  });

  const stars = [
    starStyle(3, '20%', '10%', '1.5s'),
    starStyle(2, '15%', '80%', '2s'),
    starStyle(1, '5%', '30%', '2.5s'),
    starStyle(2, '80%', '90%', '1.8s'),
    starStyle(3, '90%', '20%', '2.2s'),
    starStyle(1, '30%', '50%', '3s', '0.5s'),
    starStyle(2, '50%', '70%', '1.7s', '1s'),
    starStyle(1, '60%', '15%', '2.8s'),
    starStyle(2, '40%', '95%', '2.3s', '0.2s'),
    starStyle(3, '75%', '50%', '1.9s', '0.8s'),
    starStyle(1, '95%', '60%', '2.6s'),
    starStyle(2, '10%', '5%', '2.1s', '0.3s'),
    starStyle(1, '65%', '85%', '3.2s', '0.6s'),
    starStyle(3, '55%', '35%', '1.6s'),
  ];
  
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <style>
        {`
          @keyframes twinkle {
            0% { opacity: 0.3; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
      {stars.map((style, i) => (
        <div
          key={i}
          className="absolute bg-gray-300 rounded-full"
          style={style}
        />
      ))}
    </div>
  );
});

export default StarryBackground;
