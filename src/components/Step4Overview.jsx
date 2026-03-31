import { useEffect, useRef } from "react";
import "./Step4Overview.css";

/* ── 3D OVERVIEW PREVIEW ── */
function OverviewPreview({ selectedMaterial }) {
  const viewerRef = useRef(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const updateColor = () => {
      if (viewer.model && viewer.model.materials) {
        viewer.model.materials.forEach((mat) => {
          // Log material name to help debugging if needed
          // console.log("Overview Material Name:", mat.name);
          
          const matName = mat.name ? mat.name.toLowerCase() : "";
          
          // Only update materials that look like they belong to a seat
          if (
            matName.includes("seat") || 
            matName.includes("mottled") ||
            matName.includes("cockpit_seat")
          ) {
            
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
          }
        });
      }
    };

    viewer.addEventListener("load", updateColor);
    
    // Also trigger immediately in case it's already loaded
    updateColor();
    // Additional delay to ensure materials are fully ready if loaded from cache
    setTimeout(updateColor, 50);
    setTimeout(updateColor, 500); // 3D models can be slow to parse materials sometimes

    return () => {
      viewer.removeEventListener("load", updateColor);
    };
  }, [selectedMaterial]);

  return (
    <div className="overview-preview-wrap fade-in-up">
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />

      <div className="preview-label" style={{ zIndex: 10 }}>
        <span className="preview-label-dot" style={{ background: selectedMaterial?.color || "var(--accent)" }} />
        {selectedMaterial?.name ? `${selectedMaterial.name} Interior` : "Default Interior"}
      </div>

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
        <model-viewer
          ref={viewerRef}
          src="/polo.glb"
          alt="VW Polo 3D Model"
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

/* ── MAIN COMPONENT ── */
export default function Step4Overview({
  selectedMaterial,
  onNext,
  onBack,
}) {
  return (
    <div className="s4-overview-page section-content">
      {/* ── TOP BAR ── */}
      <div className="s4-overview-topbar">
        <div className="s4-overview-topbar-left">
          <div className="s4-overview-kicker">// Step 4 of 6</div>
          <h1 className="s4-overview-title">FINAL <span>OVERVIEW</span></h1>
          <p className="s4-overview-subtitle">Review your custom seating within the full vehicle</p>
        </div>
        <div className="s4-overview-topbar-right">
          {selectedMaterial && (
            <div className="s4-overview-live-preview">
              <div className="s4-overview-live-swatch" style={{ background: selectedMaterial.color }} />
              <div>
                <div className="s4-overview-live-name">{selectedMaterial.name}</div>
                <div className="s4-overview-live-tier">Applied to Vehicle</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN BODY ── */}
      <div className="s4-overview-body">
        {/* LEFT — 3D Viewer */}
        <div className="s4-overview-viewer-col">
          <OverviewPreview selectedMaterial={selectedMaterial} />
          <div className="s4-overview-viewer-footer">
            <span className="s4-overview-rotate-hint">↻ Interactive 3D vehicle preview</span>
          </div>
        </div>

        {/* RIGHT — Summary */}
        <div className="s4-overview-controls-col">
          
          <div className="s4-overview-section">
            <div className="s4-overview-section-header">
              <span className="s4-overview-section-label">Your Configuration</span>
            </div>
            
            <div className="s4-overview-summary-card">
               <div className="summary-item">
                  <span className="summary-lbl">Vehicle</span>
                  <span className="summary-val">VW Polo GTI</span>
               </div>
               <div className="summary-divider" />
               <div className="summary-item">
                  <span className="summary-lbl">Seat Finish</span>
                  <span className="summary-val" style={{ color: selectedMaterial?.color || 'var(--accent)'}}>
                     {selectedMaterial?.name || "Premium Leather"}
                  </span>
               </div>
               <div className="summary-item">
                  <span className="summary-lbl">Package</span>
                  <span className="summary-val">Autotrimx Signature</span>
               </div>
            </div>
            
            <p className="s4-overview-desc">
               Your chosen interior finish has been digitally applied to the vehicle model. You can rotate and zoom to inspect the interior before confirming your booking.
            </p>
          </div>

          {/* Nav */}
          <div className="s4-overview-nav">
            <button className="btn-back" onClick={onBack}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
            <button className="btn-next" onClick={onNext}>
              Proceed to Booking
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
