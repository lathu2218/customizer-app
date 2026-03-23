import { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const target = 120;
    const duration = 2500; // 2.5 seconds to reach 120
    const intervalTime = 20; // ms
    const increments = duration / intervalTime;
    const step = target / increments;

    const timer = setInterval(() => {
      setSpeed((prev) => {
        if (prev >= target) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400); // short wait before fade
          return target;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Speedometer ranges from 0 to 120. We map this to 0 to 100 for the SVG dash offset.
  const progressPercent = (speed / 120) * 100;

  return (
    <div className="loading-screen">
      <div className="speedometer-container">
        
        <div className="speedometer-gauge">
          <svg viewBox="0 0 200 100" className="speedometer-svg">
            {/* Background track (half circle) */}
            <path 
              d="M 10,100 A 90,90 0 0,1 190,100" 
              fill="none" 
              stroke="rgba(0, 0, 0, 0.1)" 
              strokeWidth="12" 
              strokeLinecap="round" 
              pathLength="100"
            />
            {/* Active fill (half circle) */}
            <path 
              d="M 10,100 A 90,90 0 0,1 190,100" 
              fill="none" 
              stroke="#000" 
              strokeWidth="12" 
              strokeLinecap="round" 
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progressPercent}
              className="speedometer-fill"
            />
          </svg>
          
          <div className="speedometer-text">
            <span className="speed-number">{Math.floor(speed)}</span>
            <span className="speed-unit">km/h</span>
          </div>
        </div>

        <div className="loading-label">IGNITING ENGINE...</div>

      </div>
    </div>
  );
}
