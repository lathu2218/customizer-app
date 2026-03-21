import { brands } from '../data';
import './Step1Brand.css';

export default function Step1Brand({ selectedBrand, onSelectBrand, onNext }) {
  return (
    <div className="section-content">
      <div className="section-title">
        Choose Your <span>Brand</span>
      </div>
      <p className="section-sub">Select the manufacturer of your vehicle</p>

      <div className="brand-grid">
  {brands.map((brand) => (
    <div
      key={brand.id}
      className={`brand-card ${selectedBrand === brand.id ? 'selected' : ''}`}
      onClick={() => onSelectBrand(brand.id)}
    >
      {selectedBrand === brand.id && (
        <div className="selected-badge"></div>
      )}

      {/* ✅ ONLY THIS */}
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
        <div />
        <button
          className="btn-next"
          onClick={onNext}
          disabled={!selectedBrand}
        >
          {selectedBrand ? 'Select Model' : 'Select Brand to Continue'}
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
