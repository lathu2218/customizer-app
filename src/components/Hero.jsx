import { useState, useRef, useEffect } from 'react';
import './Hero.css';

import carImage from '../assets/car.png';

const CAR_SRC = carImage;

export default function Hero({ onStart }) {
  const carWrapRef = useRef(null);
  const veilRef    = useRef(null);
  const cursorRef  = useRef(null);
  const dotRef     = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  const handleMouseMove = (e) => {
    const rect = carWrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    const xPct = (x / rect.width)  * 100;
    const yPct = (y / rect.height) * 100;
    if (veilRef.current) {
      // Directly set the radial gradient so the hole follows cursor precisely
      veilRef.current.style.background = `radial-gradient(
        circle 180px at ${xPct}% ${yPct}%,
        transparent 0%,
        rgba(10,10,10,0.25) 45%,
        rgba(10,10,10,0.97) 85%
      )`;
    }
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (veilRef.current) {
      veilRef.current.style.background = 'rgba(10,10,10,0.96)';
    }
  };

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className={`cursor ${hovering ? 'hovering' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />

      {/* Nav — single instance */}
      <nav className="nav">
        <div className="nav-logo">AUTO<span>TRIMX</span></div>
        <div className="nav-label">Automotive Interior Designer</div>
      </nav>

      {/* Hero */}
      <section className="hero">
        {/* Left copy */}
        <div className="hero-copy">
          <div className="hero-kicker">// Craft your drive</div>
          <h1 className="hero-title">
            REDEFINE<br />
            <span>YOUR</span><br />
            INTERIOR
          </h1>
          <p className="hero-sub">
            Custom car seat upholstery crafted for performance, comfort,
            and style. Select your car, choose your materials, book your session.
          </p>
          <button className="cta-btn" onClick={onStart}>
            Start Customizing
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Right: car reveal stage */}
        <div className="hero-stage">
          <div
            className={`car-wrap ${hovering ? 'is-hovering' : ''}`}
            ref={carWrapRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Full dark cover with radial hole at cursor */}
            <div ref={veilRef} className="veil" />

            {/* Frame lines */}
            <div className="reveal-line h rl-top" />
            <div className="reveal-line h rl-bottom" />
            <div className="reveal-line v rl-left" />
            <div className="reveal-line v rl-right" />

            {/* Corner dots */}
            <div className="corner-dot cd-tl" />
            <div className="corner-dot cd-tr" />
            <div className="corner-dot cd-bl" />
            <div className="corner-dot cd-br" />

            {/* Ground glow */}
            <div className="ground-line" />
            <div className="ground-glow" />

            {/* Car */}
            <img
              src={CAR_SRC}
              alt="AutoTrimX Sport"
              className="car-img"
              draggable={false}
            />
          </div>
        </div>
      </section>
    </>
  );
}