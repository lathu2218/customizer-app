import './Hero.css';

export default function Hero({ onStart }) {
  return (
    <section className="hero">
      <div className="hero-copy full">
        
        <div className="hero-kicker">
          <span className="kicker-square"></span> CRAFT YOUR DRIVE
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

        <button className="hero-cta" onClick={onStart}>
          START CUSTOMIZING
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </section>
  );
}