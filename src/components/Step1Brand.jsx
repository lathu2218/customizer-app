import { brands } from '../data';
import './Step1Brand.css';

export default function Step1Brand({ selectedBrand, onSelectBrand, onNext }) {
  return (
    <div className="section-content fade-in-up">
      <div className="section-title">
        Choose Your <span>Brand</span>
      </div>
      <p className="section-sub">Select the manufacturer of your vehicle to see available interior options.</p>

      <div className="brand-grid">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className={`brand-card ${selectedBrand === brand.id ? 'selected' : ''}`}
            onClick={() => onSelectBrand(brand.id)}
          >
            {selectedBrand === brand.id && (
              <div className="selected-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            <div className="brand-icon">
              {brand.icon?.includes?.(".png") ? (
                <img src={brand.icon} alt={brand.name} />
              ) : (
                <span>{brand.icon}</span>
              )}
            </div>

            <div className="brand-name">{brand.name}</div>
          </div>
        ))}
      </div>

      <div className="nav-buttons">
        <div /> {/* Placeholder to push the button to the right */}
        <button
          className="btn-next"
          onClick={onNext}
          disabled={!selectedBrand}
        >
          {selectedBrand ? 'Select Model' : 'Select Brand to Continue'}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
