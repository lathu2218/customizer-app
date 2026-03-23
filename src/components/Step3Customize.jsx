import { useEffect, useRef } from "react";
import * as THREE from "three";
import { materials } from "../data";
import "./Step3Customize.css";

/* ── 3D SEAT PREVIEW ── */
function SeatPreview({ selectedMaterial }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const W = el.clientWidth || 800;
    const H = el.clientHeight || 600;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(36, W / H, 0.1, 100);
    camera.position.set(0, 1.4, 8);
    camera.lookAt(0, 0.8, 0);

    // Lighting — dramatic and moody
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(5, 9, 6);
    key.castShadow = true;
    scene.add(key);

    const fill = new THREE.DirectionalLight(0x45a29e, 0.6);
    fill.position.set(-4, 2, -3);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x66fcf1, 0.8);
    rim.position.set(0, -2, -6);
    scene.add(rim);

    // Ground reflection plane
    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.8,
      metalness: 0.2,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.15;
    ground.receiveShadow = true;
    scene.add(ground);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedMaterial?.color || "#111111"),
      roughness: 0.4,
      metalness: 0.15,
    });
    stateRef.current.mat = mat;

    const addBox = (w, h, d, x, y, z) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    };

    // Seat base
    addBox(2.4, 0.32, 1.8, 0, 0, 0.35);
    // Backrest
    addBox(2.4, 2.8, 0.28, 0, 1.54, -0.56);
    // Headrest
    addBox(1.4, 0.65, 0.28, 0, 3.05, -0.58);
    // Armrest left
    addBox(0.22, 0.22, 1.8, -1.24, 0.07, 0.35);
    // Armrest right
    addBox(0.22, 0.22, 1.8, 1.24, 0.07, 0.35);
    // Seat legs
    addBox(0.12, 0.2, 0.12, -0.9, -0.18, -0.45);
    addBox(0.12, 0.2, 0.12, 0.9, -0.18, -0.45);
    addBox(0.12, 0.2, 0.12, -0.9, -0.18, 0.95);
    addBox(0.12, 0.2, 0.12, 0.9, -0.18, 0.95);

    // Glow plane behind seat
    const glowGeo = new THREE.PlaneGeometry(4, 5);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x66fcf1,
      transparent: true,
      opacity: 0.04,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, 1.5, -1.5);
    scene.add(glow);

    let frameId;
    let angle = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      angle += 0.003;
      camera.position.x = Math.sin(angle) * 3.5;
      camera.position.z = Math.cos(angle) * 3.5 + 5.5;
      camera.position.y = 1.6;
      camera.lookAt(0, 1.0, 0);
      renderer.render(scene, camera);
    };
    animate();
    stateRef.current.frameId = frameId;
    stateRef.current.renderer = renderer;

    const onResize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);
    stateRef.current.onResize = onResize;

    return () => {
      cancelAnimationFrame(stateRef.current.frameId);
      window.removeEventListener("resize", stateRef.current.onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (stateRef.current.mat) {
      stateRef.current.mat.color.set(selectedMaterial?.color || "#111111");
    }
  }, [selectedMaterial]);

  return (
    <div className="preview-wrap fade-in-up" ref={mountRef}>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      <div className="preview-label">
        <span className="preview-label-dot" style={{ background: selectedMaterial?.color || "var(--accent)" }} />
        {selectedMaterial?.name || "Select a material"}
      </div>
      <div className="preview-scan" />
    </div>
  );
}

/* ── SPEC DATA ── */
const SPECS = [
  { label: "Durability",        value: "10yr Warranty" },
  { label: "Temperature Range", value: "-30°C to 85°C"  },
  { label: "UV Resistance",     value: "Grade A+"        },
  { label: "Fire Rating",       value: "FMVSS 302"       },
];

/* ── MAIN COMPONENT ── */
export default function Step3Customize({ selectedMaterial, onSelectMaterial, onNext, onBack }) {
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
              <span className="s3-section-label">Material</span>
              <span className="s3-section-count">{materials.length} options</span>
            </div>

            <div className="s3-mat-list">
              {materials.map((m, i) => (
                <div
                  key={m.id}
                  className={`s3-mat-row ${selectedMaterial?.id === m.id ? "active" : ""}`}
                  onClick={() => onSelectMaterial(m)}
                  style={{ animationDelay: `${i * 0.06}s` }}
                >
                  <div className="s3-mat-swatch" style={{ background: m.color }} />
                  <div className="s3-mat-info">
                    <span className="s3-mat-name">{m.name}</span>
                    <span className="s3-mat-tag">Premium</span>
                  </div>
                  <div className="s3-mat-check">
                    {selectedMaterial?.id === m.id
                      ? <span className="s3-check-active">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      : <span className="s3-check-empty" />
                    }
                  </div>
                  <div className="s3-mat-bar" />
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          <div className="s3-section">
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
                <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back
            </button>
            <button className="btn-next" onClick={onNext} disabled={!selectedMaterial}>
              Book Appointment
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}