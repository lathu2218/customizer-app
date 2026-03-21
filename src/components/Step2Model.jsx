import { brands, models } from '../data';
import './Step2Model.css';

export default function Step2Model({ selectedBrand, selectedModel, onSelectModel, onNext, onBack }) {
  const brand = brands.find((b) => b.id === selectedBrand);
  const availableModels = models[selectedBrand] || [];

  return (
    <div className="model-page">
      {/* Header */}
      <div className="model-header">
        <div className="model-header-left">
          <div className="model-kicker">// Select Configuration</div>
          <h1 className="model-title">
            Choose Your <span>Model</span>
          </h1>
          <p className="model-sub">
            {brand ? `${availableModels.length} models available for ${brand.name}` : 'Choose from available models'}
          </p>
        </div>
        <div className="model-header-right">
          <div className="model-count">
            <span className="count-num">{availableModels.length}</span>
            <span className="count-label">Models</span>
          </div>
        </div>
      </div>

      {/* Full-width Model Cards */}
      <div className="model-list">
        {availableModels.map((model, index) => (
          <div
            key={model.id}
            className={`model-row ${selectedModel?.id === model.id ? 'selected' : ''}`}
            onClick={() => onSelectModel(model)}
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            {/* Index number */}
            <div className="row-index">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Model name */}
            <div className="row-name">
              <span className="name-text">{model.name}</span>
              {selectedModel?.id === model.id && (
                <span className="selected-pill">Selected</span>
              )}
            </div>

            {/* Divider line */}
            <div className="row-divider" />

            {/* Year */}
            <div className="row-meta">
              <span className="meta-label">Year</span>
              <span className="meta-value">{model.year}</span>
            </div>

            {/* Seats */}
            <div className="row-meta">
              <span className="meta-label">Seats</span>
              <span className="meta-value">{model.seats}</span>
            </div>

            {/* Arrow */}
            <div className="row-arrow">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Hover accent bar */}
            <div className="row-accent" />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="model-nav">
        <button className="btn-back" onClick={onBack}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>

        <div className="nav-center">
          {selectedModel && (
            <span className="nav-selection">
              <span className="nav-sel-label">Selected:</span>
              <span className="nav-sel-value">{selectedModel.name}</span>
            </span>
          )}
        </div>

        <button
          className="btn-next"
          onClick={onNext}
          disabled={!selectedModel}
        >
          Next: Customize
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}