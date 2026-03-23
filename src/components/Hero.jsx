import { useEffect } from 'react';
import './Hero.css';

export default function Hero({ onStart }) {

  // Load model-viewer web component via CDN
  useEffect(() => {
    if (!customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero">

        {/* Left copy */}
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="pulse-dot"></span> Craft your drive
          </div>
          <h1 className="hero-title">
            REDEFINE<br />
            <span>YOUR</span><br />
            INTERIOR
          </h1>
          <p className="hero-sub">
            Premium car seat upholstery crafted for performance, comfort,
            and absolute style. Select your car, choose your materials,
            and book your session in minutes.
          </p>
          <button className="btn-next hero-cta" onClick={onStart}>
            Start Customizing
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right: 3D car stage */}
        <div className="hero-stage">
          <div className="car-wrap">

            {/* 3D Porsche Model */}
            <model-viewer
              src="/porche_911.glb"
              alt="Porsche 911 Carrera 4S"
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="30deg"
              camera-controls
              exposure="1"
              environment-image="neutral"
              camera-orbit="45deg 80deg 5m"
              style={{
                width: '100%',
                height: '100vh',
                minHeight: '500px',
                background: 'transparent',
                '--poster-color': 'transparent',
                outline: 'none',
                border: 'none',
                position: 'relative',
                zIndex: 1,
              }}
            />

          </div>
        </div>

      </section>
    </>
  );
}