import React, { useState } from "react";
import Slideshow from "../components/Slideshow";

export const title = "1. Waveguide Propagation & Boundary Conditions";

// SLIDE 1: Architecture Overview (matching your screenshot)
function Slide1() {
  return (
    <div style={{ maxWidth: "780px" }}>
      <div style={s.Tag}>⚡ PHOTONICS INTEGRATED CIRCUITS</div>
      <h1 style={s.Title}>Build slides, drop them in sections</h1>
      <p style={s.Subtitle}>
        Each chapter is a file in <code style={s.Code}>sections/</code>. Inside a chapter,
        you compose slide components and pass them to{" "}
        <code style={s.Code}>Slideshow</code>. No App.jsx changes needed.
      </p>
    </div>
  );
}

// SLIDE 2: Helmholtz Wave Equation & Slab Waveguide Regions
function Slide2() {
  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.1 — ELECTROMAGNETIC THEORY</div>
      <h2 style={s.SlideHeading}>1D Slab Waveguide & Helmholtz Wave Equation</h2>
      <p style={{ ...s.Subtitle, marginBottom: "24px" }}>
        Light confinement in a 3-layer dielectric waveguide (<code style={s.Code}>n₁ &gt; n₂, n₃</code>) is governed by Maxwell's equations reduced to the 1D Helmholtz equation in each layer:
      </p>

      <div style={s.Grid2}>
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Governing Wave Equation (TE Mode)</h3>
          <div style={s.FormulaBox}>
            ∂²E_y / ∂x² + (k₀² nᵢ² - β²) E_y(x) = 0
          </div>
          <ul style={s.List}>
            <li><strong>Core Region (|x| ≤ d/2):</strong> Transverse wavevector <code style={s.Code}>κ = √(k₀²n₁² - β²)</code> gives oscillatory standing wave <code style={s.Code}>cos(κx)</code>.</li>
            <li><strong>Cladding Region (|x| &gt; d/2):</strong> Decay constant <code style={s.Code}>γ = √(β² - k₀²n₂²)</code> gives evanescent tail <code style={s.Code}>exp(-γ|x|)</code>.</li>
          </ul>
        </div>

        <div style={s.Card}>
          <h3 style={s.CardTitle}>2. Electromagnetic Boundary Conditions</h3>
          <div style={s.FormulaBox}>
            E_y(x) and ∂E_y / ∂x continuous at x = ±d/2
          </div>
          <ul style={s.List}>
            <li>Tangential electric field <code style={s.Code}>E_y</code> and magnetic field <code style={s.Code}>H_z ∝ ∂E_y/∂x</code> must match continuously across the core-cladding boundary.</li>
            <li>Leads to the transcendental eigenvalue equation: <code style={s.Code}>tan(κ d / 2) = γ / κ</code> (even TE modes).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// SLIDE 3: Interactive Waveguide Mode & Evanescent Boundary Simulator
function Slide3() {
  const [nCore, setNCore] = useState(3.48);
  const [nClad, setNClad] = useState(1.44);
  const [coreThickness, setCoreThickness] = useState(220); // nm
  const [modeOrder, setModeOrder] = useState(0); // 0 = TE0, 1 = TE1

  const deltaN = Math.max(0.1, nCore - nClad);
  const gammaDecay = (deltaN * 1.8).toFixed(2);
  const vNumber = (
    (Math.PI * (coreThickness / 1000) / 1.55) *
    Math.sqrt(nCore * nCore - nClad * nClad)
  ).toFixed(2);

  // Generate SVG path for the transverse electric field E_y(y) across cladding-core-cladding
  const buildModeProfilePath = () => {
    const points = [];
    const halfCorePx = (coreThickness / 500) * 45;
    for (let y = -110; y <= 110; y += 2) {
      let amp = 0;
      if (Math.abs(y) <= halfCorePx) {
        const phase = (y / halfCorePx) * (modeOrder === 0 ? Math.PI / 2.4 : Math.PI * 0.88);
        amp = modeOrder === 0 ? Math.cos(phase) : Math.sin(phase);
      } else {
        const dist = Math.abs(y) - halfCorePx;
        const edgePhase = modeOrder === 0 ? Math.PI / 2.4 : Math.PI * 0.88;
        const edgeVal = modeOrder === 0 ? Math.cos(edgePhase) : Math.sin(edgePhase) * Math.sign(y);
        amp = edgeVal * Math.exp((-dist * deltaN) / 22);
      }
      const svgX = 360 + amp * 75;
      const svgY = 125 + y;
      points.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
    }
    return "M " + points.join(" L ");
  };

  const halfCorePx = (coreThickness / 500) * 45;

  return (
    <div>
      <div style={s.Tag}>⚡ INTERACTIVE VISUAL INTERPRETATION</div>
      <h2 style={s.SlideHeading}>Interactive Wave Propagation & Boundary Matching</h2>

      <div style={s.SimBox}>
        <svg viewBox="0 0 600 250" style={{ width: "100%", height: "230px", background: "#050914", borderRadius: "10px" }}>
          {/* Cladding & Core Layers */}
          <text x="18" y="30" fill="#64748b" fontSize="11">Upper Cladding (n₂ = {nClad}) — Evanescent Decay: e^(-γx)</text>
          <text x="18" y="235" fill="#64748b" fontSize="11">Lower Substrate (n₂ = {nClad}) — Boundary Continuity at x = ±d/2</text>

          {/* Waveguide Core Strip */}
          <rect
            x="15"
            y={125 - halfCorePx}
            width="570"
            height={halfCorePx * 2}
            fill="rgba(37, 99, 235, 0.16)"
            stroke="#3b82f6"
            strokeDasharray="5,4"
          />
          <text x="22" y={125 - halfCorePx + 16} fill="#60a5fa" fontSize="11" fontWeight="bold">
            Core Channel (n₁ = {nCore}, d = {coreThickness} nm)
          </text>

          {/* Propagating Wave Along z-axis */}
          <path
            d={`M 30,125 Q 75,${125 - halfCorePx * 0.8} 120,125 T 210,125 T 300,125`}
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
          />
          <text x="80" y="118" fill="#38bdf8" fontSize="11">k_z = β (Guided Wave)</text>

          {/* Reference Axis for Transverse Mode Profile E_y(x) */}
          <line x1="360" y1="15" x2="360" y2="235" stroke="#334155" strokeWidth="1" />
          <text x="370" y="28" fill="#facc15" fontSize="11" fontWeight="bold">
            Transverse Field E_y(x) ({modeOrder === 0 ? "TE₀ Even" : "TE₁ Odd"})
          </text>

          {/* Mode Profile Curve */}
          <path d={buildModeProfilePath()} fill="none" stroke="#facc15" strokeWidth="3" />

          {/* Boundary Condition Dots at x = +d/2 and x = -d/2 */}
          <circle cx="360" cy={125 - halfCorePx} r="4" fill="#ef4444" />
          <circle cx="360" cy={125 + halfCorePx} r="4" fill="#ef4444" />
        </svg>

        {/* Live Sliders */}
        <div style={s.ControlsGrid}>
          <div>
            <label style={s.Label}>Core Index (n₁): {nCore}</label>
            <input type="range" min="1.8" max="3.8" step="0.05" value={nCore} onChange={(e) => setNCore(parseFloat(e.target.value))} style={s.Slider} />
          </div>
          <div>
            <label style={s.Label}>Cladding Index (n₂): {nClad}</label>
            <input type="range" min="1.0" max="1.7" step="0.05" value={nClad} onChange={(e) => setNClad(parseFloat(e.target.value))} style={s.Slider} />
          </div>
          <div>
            <label style={s.Label}>Channel Thickness (d): {coreThickness} nm</label>
            <input type="range" min="150" max="500" step="10" value={coreThickness} onChange={(e) => setCoreThickness(Number(e.target.value))} style={s.Slider} />
          </div>
          <div>
            <label style={s.Label}>Mode Order: {modeOrder === 0 ? "TE₀ (Fundamental)" : "TE₁ (First Higher)"}</label>
            <button
              onClick={() => setModeOrder((m) => (m === 0 ? 1 : 0))}
              style={s.ModeToggleBtn}
            >
              Switch to {modeOrder === 0 ? "TE₁" : "TE₀"}
            </button>
          </div>
        </div>

        <div style={s.MetricsBar}>
          <span>Normalized Frequency (V-Number): <strong>{vNumber}</strong> {vNumber < 3.14 ? "(Single-Mode)" : "(Multi-Mode)"}</span>
          <span>Cladding Decay Rate (γ): <strong>{gammaDecay} μm⁻¹</strong></span>
        </div>
      </div>
    </div>
  );
}

export default function WaveguidePropagationSection() {
  return <Slideshow slides={[Slide1, Slide2, Slide3]} />;
}

const s = {
  Tag: {
    color: "#facc15",
    fontSize: "13px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "14px",
  },
  Title: {
    fontSize: "48px",
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.15,
    marginBottom: "20px",
  },
  SlideHeading: {
    fontSize: "30px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "10px",
  },
  Subtitle: {
    fontSize: "18px",
    color: "#94a3b8",
    lineHeight: 1.6,
  },
  Code: {
    color: "#facc15",
    fontFamily: "monospace",
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  Grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  Card: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "20px",
  },
  CardTitle: {
    fontSize: "16px",
    fontWeight: 700,
    color: "#38bdf8",
    marginBottom: "12px",
  },
  FormulaBox: {
    backgroundColor: "#060a17",
    border: "1px solid #1e3a8a",
    color: "#facc15",
    fontFamily: "monospace",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "12px",
  },
  List: {
    color: "#cbd5e1",
    fontSize: "14px",
    lineHeight: 1.65,
    paddingLeft: "18px",
  },
  SimBox: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "18px",
    marginTop: "12px",
  },
  ControlsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "14px",
    marginTop: "14px",
  },
  Label: {
    display: "block",
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "6px",
  },
  Slider: {
    width: "100%",
    accentColor: "#2563eb",
    cursor: "pointer",
  },
  ModeToggleBtn: {
    padding: "6px 12px",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  MetricsBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "14px",
    paddingTop: "10px",
    borderTop: "1px solid #1e293b",
    fontSize: "13px",
    color: "#cbd5e1",
  },
};
