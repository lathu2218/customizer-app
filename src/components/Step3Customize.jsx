import { useEffect, useRef } from "react";
import { materials } from "../data";
import "./Step3Customize.css";

/* ── 3D SEAT PREVIEW ── */
function SeatPreview({ selectedMaterial }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const updateColor = () => {
      if (viewer.model && viewer.model.materials) {
        viewer.model.materials.forEach((mat) => {
          if (mat.pbrMetallicRoughness) {
            const hexColor = selectedMaterial?.color || "#111111";
            
            // basic hex to rgb [0-1] conversion
            let r = parseInt(hexColor.slice(1, 3), 16) / 255;
            let g = parseInt(hexColor.slice(3, 5), 16) / 255;
            let b = parseInt(hexColor.slice(5, 7), 16) / 255;
            
            mat.pbrMetallicRoughness.setBaseColorFactor([r, g, b, 1]);
            
            // Adjust roughness/metallic based on material
            if (selectedMaterial && selectedMaterial.id === 'italian') {
              mat.pbrMetallicRoughness.setRoughnessFactor(0.4);
              mat.pbrMetallicRoughness.setMetallicFactor(0.2);
            } else if (selectedMaterial && selectedMaterial.id === 'carbon') {
              mat.pbrMetallicRoughness.setRoughnessFactor(0.6);
              mat.pbrMetallicRoughness.setMetallicFactor(0.5);
            } else {
              mat.pbrMetallicRoughness.setRoughnessFactor(0.5);
              mat.pbrMetallicRoughness.setMetallicFactor(0.1);
            }
          }
        });
      }
    };

    viewer.addEventListener("load", updateColor);
    
    // Also trigger immediately in case it's already loaded
    updateColor();
    // Additional delay to ensure materials are fully ready if loaded from cache
    setTimeout(updateColor, 50);

    return () => {
      viewer.removeEventListener("load", updateColor);
    };
  }, [selectedMaterial]);

  return (
    <div className="preview-wrap fade-in-up">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />

      <div className="preview-label" style={{ zIndex: 10 }}>
        <span className="preview-label-dot" style={{ background: selectedMaterial?.color || "var(--accent)" }} />
        {selectedMaterial?.name || "Select a material"}
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <model-viewer
          ref={viewerRef}
          src="/seat_3.glb"
          alt="Premium Car Seat"
          auto-rotate
          camera-controls
          environment-image="neutral"
          shadow-intensity="1"
          exposure="1"
          style={{ width: '100%', height: '100%', background: 'transparent' }}
        />
      </div>

      <div className="preview-scan" style={{ zIndex: 6, pointerEvents: 'none' }} />
    </div>
  );
}

/* ── SPEC DATA ── */
const SPECS = [
  { label: "Durability", value: "10yr Warranty" },
  { label: "Temperature Range", value: "-30°C to 85°C" },
  { label: "UV Resistance", value: "Grade A+" },
  { label: "Fire Rating", value: "FMVSS 302" },
];

/* ── MAIN COMPONENT ── */
export default function Step3Customize({
  selectedMaterial,
  onSelectMaterial,
  onNext,
  onBack,
}) {

  // Auto-select first Option if none is selected
  useEffect(() => {
    if (!selectedMaterial && materials?.length > 0) onSelectMaterial(materials[0]);
  }, []);

  return (
    <div className="s3-page section-content">
      {/* ── TOP BAR ── */}
      <div className="s3-topbar">
        <div className="s3-topbar-left">
          <div className="s3-kicker">// Step 3 of 5</div>
          <h1 className="s3-title">CUSTOMIZE YOUR <span>SEAT</span></h1>
          <p className="s3-subtitle">Select the material and finish for your interior</p>
        </div>
        <div className="s3-topbar-right">
          {selectedMaterial && (
            <div className="s3-live-preview">
              <div className="s3-live-swatch" style={{ background: selectedMaterial.color }} />
              <div>
                <div className="s3-live-name">{selectedMaterial.name}</div>
                <div className="s3-live-tier">Premium Finish</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="s3-body">
        {/* LEFT — 3D Viewer */}
        <div className="s3-viewer-col">
          <SeatPreview selectedMaterial={selectedMaterial} />
          <div className="s3-viewer-footer">
            <span className="s3-rotate-hint">↻ Auto-rotating preview</span>
          </div>
        </div>

        {/* RIGHT — Controls */}
        <div className="s3-controls-col">
          
          {/* Material selection */}
          <div className="s3-section">
            <div className="s3-section-header">
              <span className="s3-section-label">Material Tier</span>
              <span className="s3-section-count">{materials.length} options</span>
            </div>
            <div className="s3-mat-list">
              {materials.map((m, i) => (
                <div
                  key={m.id}
                  className={`s3-mat-row ${selectedMaterial?.id === m.id ? "active" : ""}`}
                  onClick={() => onSelectMaterial(m)}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="s3-mat-swatch" style={{ background: m.color }} />
                  <div className="s3-mat-info">
                    <span className="s3-mat-name">{m.name}</span>
                    <span className="s3-mat-tag">Premium</span>
                  </div>
                  <div className="s3-mat-check">
                    {selectedMaterial?.id === m.id ? (
                      <span className="s3-check-active">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13L9 17L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="s3-check-empty" />
                    )}
                  </div>
                  <div className="s3-mat-bar" />
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="s3-section" style={{ borderBottom: 'none' }}>
            <div className="s3-section-header">
              <span className="s3-section-label">Specifications</span>
            </div>
            <div className="s3-spec-grid">
              {SPECS.map((s) => (
                <div key={s.label} className="s3-spec-item">
                  <span className="s3-spec-label">{s.label}</span>
                  <span className="s3-spec-value">{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div className="s3-nav">
            <button className="btn-back" onClick={onBack}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <button className="btn-next" onClick={onNext} disabled={!selectedMaterial}>
              Vehicle Overview
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}