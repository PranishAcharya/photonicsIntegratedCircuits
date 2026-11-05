import React, { useState } from "react";
import Slideshow from "../components/Slideshow";

export const title = "2. Polarization, Waveguide Modes & TE-TM Wave Equations";

/* ============================================================================
   SLIDE 1: Ordinary vs. Extraordinary Waves & Spatial Walk-off (Pages 1 & 2)
   ============================================================================ */
function Slide1SpatialWalkOff() {
  const [crystalType, setCrystalType] = useState("negative"); // "negative" (Calcite/LiNbO3) | "positive" (Quartz/TiO2)
  const [propAngleDeg, setPropAngleDeg] = useState(45); // θ in degrees (0 to 90)
  const crystalLengthMm = 15; // L in mm

  // Refractive indices for uniaxial crystal
  const no = 1.658; // Calcite ordinary
  const ne = crystalType === "negative" ? 1.486 : 1.785; // ne < no (negative) or ne > no (positive)

  // Walk-off angle formula from Page 2:
  // tan(ψ_e) = (no^2 / ne^2) * tan(θ)  =>  α = ψ_e - θ = arctan[(no^2 / ne^2) * tan(θ)] - θ
  const thetaRad = (propAngleDeg * Math.PI) / 180;
  const tanPsiE = (no ** 2 / ne ** 2) * Math.tan(thetaRad);
  const psiERad = Math.atan(tanPsiE);
  const walkOffRad = psiERad - thetaRad;
  const walkOffDeg = +((walkOffRad * 180) / Math.PI).toFixed(2);
  const beamSepMm = +(crystalLengthMm * Math.abs(Math.tan(walkOffRad))).toFixed(2);

  // Poynting vector direction angle
  const rayAngleDeg = +(propAngleDeg + walkOffDeg).toFixed(2);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.1 — O-WAVE, E-WAVE &amp; SPATIAL WALK-OFF (PAGES 1–2)</div>
      <h1 style={s.SlideHeading}>
        Ordinary vs. Extraordinary Waves &amp; Poynting Vector Walk-Off
      </h1>

      <div style={s.Grid2}>
        {/* Left: Theoretical Physics Description */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. O-Wave vs. E-Wave in a Uniaxial Crystal</h3>
          <p style={s.BodyText}>
            In a uniaxial crystal with optical axis <code style={s.Code}>ẑ</code>, light with wavevector{" "}
            <code style={s.Code}>k</code> splits into two distinct eigenmodes:
          </p>
          <div style={s.FormulaBox}>
            • Ordinary (O) Wave: &nbsp; ê_o = (k̂ × ẑ) / sin θ, &nbsp; E_o ∥ D_o ⊥ ẑ
            <br />
            • Extraordinary (E) Wave: &nbsp; ê_e = ê_o × k̂, &nbsp; D_e ∥ ê_e, &nbsp; E_e ∦ D_e!
          </div>
          <ul style={s.List}>
            <li>
              <strong>Ordinary Wave:</strong> Field vector <code style={s.Code}>E_o ∥ D_o</code>. The wavevector{" "}
              <code style={s.Code}>k_o</code> and Poynting energy vector <code style={s.Code}>S_o</code> are collinear (zero walk-off).
            </li>
            <li>
              <strong>Extraordinary Wave:</strong> Because <code style={s.Code}>ε_xx ≠ ε_zz</code>,{" "}
              <strong style={{ color: "#facc15" }}>E_e is tilted away from D_e by angle α</strong>.
            </li>
            <li>
              <strong>Spatial Beam Walk-Off:</strong> Energy flows along the Poynting vector{" "}
              <code style={s.Code}>S = E × H</code> at angle <code style={s.Code}>ψ_e</code>, away from wavefront normal{" "}
              <code style={s.Code}>k</code> (
              <a href="https://www.rp-photonics.com/spatial_walk_off.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics: Spatial Walk-off
              </a>
              ).
            </li>
          </ul>
        </div>

        {/* Right: Walk-off Angle Equation & PBS Prisms */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>2. Walk-Off Angle &amp; Polarization Beam Splitters</h3>
          <div style={s.FormulaBox}>
            Walk-off: &nbsp; α = ψ_e − θ = tan⁻¹[(n_o² / n_e²) · tan θ] − θ
            <br />
            Beam Lateral Shift: &nbsp; d = L · tan α &nbsp; (Length L)
          </div>
          <p style={s.BodyText}>
            This birefringence is harnessed in bulk polarization beam splitters (
            <a href="https://www.rp-photonics.com/polarizers.html" target="_blank" rel="noreferrer" style={s.Link}>
              RP Photonics: Polarizers
            </a>
            ):
          </p>
          <ul style={s.List}>
            <li>
              <strong>Wollaston &amp; Rochon Prisms:</strong> Birefringent crystal wedges divert orthogonal polarizations symmetrically.
            </li>
            <li>
              <strong>Glan–Thompson Prism:</strong> Exploits TIR at a cemented interface to deflect the O-wave by 90° while transmitting the pure E-wave.
            </li>
          </ul>
        </div>
      </div>

      {/* Interactive Ray Walk-off Visualizer */}
      <div style={{ ...s.SimBox, marginTop: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setCrystalType("negative")}
              style={{
                ...s.TabBtn,
                backgroundColor: crystalType === "negative" ? "#2563eb" : "#060a17",
                color: crystalType === "negative" ? "#fff" : "#94a3b8",
              }}
            >
              Negative Uniaxial (n_e &lt; n_o, Calcite: n_o=1.66, n_e=1.49)
            </button>
            <button
              onClick={() => setCrystalType("positive")}
              style={{
                ...s.TabBtn,
                backgroundColor: crystalType === "positive" ? "#2563eb" : "#060a17",
                color: crystalType === "positive" ? "#fff" : "#94a3b8",
              }}
            >
              Positive Uniaxial (n_e &gt; n_o, Rutile: n_o=1.66, n_e=1.79)
            </button>
          </div>
          <div style={{ fontSize: "12.5px", color: "#facc15", fontFamily: "monospace", fontWeight: 700 }}>
            Walk-Off Angle α = {walkOffDeg}° &nbsp;|&nbsp; Lateral Beam Split d = {beamSepMm} mm (over L = {crystalLengthMm} mm)
          </div>
        </div>

        <svg viewBox="0 0 580 165" style={{ width: "100%", height: "155px", background: "#050914", borderRadius: "8px" }}>
          {/* Crystal Block L x H */}
          <rect x="80" y="25" width="380" height="110" fill="rgba(37, 99, 235, 0.12)" stroke="#3b82f6" strokeWidth="2" rx="6" />
          <text x="90" y="44" fill="#94a3b8" fontSize="11">Birefringent Crystal (L = {crystalLengthMm} mm, Optic Axis ∥ z)</text>

          {/* Incident Ray */}
          <line x1="20" y1="80" x2="80" y2="80" stroke="#f8fafc" strokeWidth="3" />
          <text x="22" y="72" fill="#f8fafc" fontSize="10" fontWeight="bold">Input Ray</text>

          {/* Ordinary Ray path S_o ∥ k_o (Straight Blue) */}
          <line x1="80" y1="80" x2="460" y2="80" stroke="#38bdf8" strokeWidth="3" />
          <line x1="460" y1="80" x2="550" y2="80" stroke="#38bdf8" strokeWidth="3" />
          <text x="470" y="74" fill="#38bdf8" fontSize="11" fontWeight="bold">O-Wave (S_o ∥ k)</text>

          {/* Extraordinary Ray path S_e tilted by walk-off angle α (Yellow dashed) */}
          <line
            x1="80"
            y1="80"
            x2="460"
            y2={80 - walkOffDeg * 4}
            stroke="#facc15"
            strokeWidth="3"
            strokeDasharray="5,4"
          />
          <line
            x1="460"
            y1={80 - walkOffDeg * 4}
            x2="550"
            y2={80 - walkOffDeg * 4}
            stroke="#facc15"
            strokeWidth="3"
          />
          <text x="470" y={80 - walkOffDeg * 4 - 6} fill="#facc15" fontSize="11" fontWeight="bold">
            E-Wave (Poynting S_e, α={walkOffDeg}°)
          </text>

          {/* Spatial separation bracket d */}
          <line x1="465" y1="80" x2="465" y2={80 - walkOffDeg * 4} stroke="#ef4444" strokeWidth="2" />
          <text x="472" y={80 - (walkOffDeg * 4) / 2 + 4} fill="#ef4444" fontSize="10" fontWeight="bold">
            d = {beamSepMm} mm
          </text>
        </svg>

        <div style={s.ControlsGrid}>
          <div>
            <label style={s.Label}>
              Wavevector Propagation Angle (θ with respect to optic axis): <strong>{propAngleDeg}°</strong>
            </label>
            <input
              type="range"
              min="5"
              max="85"
              step="1"
              value={propAngleDeg}
              onChange={(e) => setPropAngleDeg(Number(e.target.value))}
              style={s.Slider}
            />
          </div>
          <div>
            <label style={s.Label}>
              Poynting Vector Energy Angle (ψ_e = θ + α): <strong>{rayAngleDeg}°</strong> (Max walk-off occurs near θ ≈ 45°)
            </label>
            <input type="range" min="5" max="85" disabled value={rayAngleDeg} style={{ ...s.Slider, opacity: 0.5 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 2: Waveguide Index Profiles & 5 Channel Geometries (Pages 2 & 3)
   ============================================================================ */
function Slide2WaveguideGeometries() {
  const [wgType, setWgType] = useState("ridge"); // "buried" | "striploaded" | "ridge" | "rib" | "diffused"

  const geometries = {
    buried: {
      name: "1. Buried Channel Waveguide",
      structure: "A high-index rectangular core (n₁) completely surrounded by lower-index cladding (n₂).",
      features: "Offers symmetric 2D optical confinement in both x and y. Very low surface scattering.",
      svgDraw: (
        <g>
          <rect x="130" y="30" width="220" height="100" fill="#1e293b" stroke="#475569" strokeWidth="2" rx="4" />
          <text x="145" y="52" fill="#94a3b8" fontSize="11">Cladding (n₂)</text>
          <rect x="200" y="60" width="80" height="40" fill="rgba(37, 99, 235, 0.4)" stroke="#38bdf8" strokeWidth="2" rx="3" />
          <text x="222" y="85" fill="#38bdf8" fontSize="12" fontWeight="bold">Core (n₁)</text>
          <circle cx="240" cy="80" r="14" fill="rgba(250, 204, 21, 0.5)" />
        </g>
      ),
    },
    striploaded: {
      name: "2. Strip-Loaded Waveguide",
      structure: "A high-index planar film (n₁) loaded from above with a dielectric strip (n₃) where n₁ > n₃ > n₂.",
      features: "The dielectric strip raises local effective index under it, providing lateral confinement without etching through the core.",
      svgDraw: (
        <g>
          <rect x="130" y="80" width="220" height="25" fill="rgba(37, 99, 235, 0.4)" stroke="#38bdf8" strokeWidth="2" />
          <text x="140" y="97" fill="#38bdf8" fontSize="11" fontWeight="bold">Slab Core Film (n₁)</text>
          <rect x="200" y="52" width="80" height="28" fill="#334155" stroke="#facc15" strokeWidth="2" rx="2" />
          <text x="208" y="70" fill="#facc15" fontSize="11" fontWeight="bold">Loading Strip (n₃)</text>
          <rect x="130" y="105" width="220" height="30" fill="#1e293b" stroke="#475569" />
          <text x="140" y="125" fill="#94a3b8" fontSize="10">Substrate (n₂)</text>
          <ellipse cx="240" cy="88" rx="25" ry="10" fill="rgba(250, 204, 21, 0.5)" />
        </g>
      ),
    },
    ridge: {
      name: "3. Ridge / Strip / Wire Waveguide (Silicon Photonics Standard)",
      structure: "Fully etched rectangular core ridge resting directly on an underlying lower-index oxide buffer.",
      features: "Extreme index contrast (Δn ≈ 2.0 in Silicon-on-Insulator) allows sub-micron wire dimensions (450 nm × 220 nm) and sharp <5 μm bends.",
      svgDraw: (
        <g>
          <rect x="130" y="95" width="220" height="40" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="140" y="120" fill="#94a3b8" fontSize="11">SiO₂ Substrate Buffer (n₂ = 1.44)</text>
          <rect x="195" y="45" width="90" height="50" fill="rgba(37, 99, 235, 0.4)" stroke="#38bdf8" strokeWidth="2.5" rx="3" />
          <text x="210" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold">Si Strip (n₁=3.48)</text>
          <ellipse cx="240" cy="70" rx="22" ry="14" fill="rgba(250, 204, 21, 0.6)" />
        </g>
      ),
    },
    rib: {
      name: "4. Rib Waveguide (Partial Etch)",
      structure: "A slab core that is only partially etched to leave a raised central rib pedestal.",
      features: "Lower lateral index step makes it easier to maintain single-mode operation with larger core cross-sections for high optical power handling.",
      svgDraw: (
        <g>
          <rect x="130" y="100" width="220" height="35" fill="#1e293b" stroke="#475569" />
          <text x="140" y="122" fill="#94a3b8" fontSize="11">Substrate (n₂)</text>
          <polygon
            points="130,100 130,85 195,85 195,50 285,50 285,85 350,85 350,100"
            fill="rgba(37, 99, 235, 0.35)"
            stroke="#38bdf8"
            strokeWidth="2"
          />
          <text x="222" y="72" fill="#38bdf8" fontSize="11" fontWeight="bold">Rib Core</text>
          <ellipse cx="240" cy="78" rx="28" ry="14" fill="rgba(250, 204, 21, 0.55)" />
        </g>
      ),
    },
    diffused: {
      name: "5. Diffused Waveguide (Ion-Exchanged / Ti:LiNbO₃)",
      structure: "Formed by diffusing dopants (e.g., Titanium in LiNbO₃ or silver ions in glass) to create a graded-index profile n(x,y).",
      features: "Smooth graded-index transition with no etched sidewalls, resulting in exceptionally low propagation losses (< 0.1 dB/cm).",
      svgDraw: (
        <g>
          <rect x="130" y="40" width="220" height="95" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <text x="140" y="120" fill="#94a3b8" fontSize="11">Substrate (n₂)</text>
          <path d="M 175,40 Q 240,105 305,40 Z" fill="rgba(37, 99, 235, 0.45)" stroke="#facc15" strokeWidth="2" />
          <text x="195" y="62" fill="#facc15" fontSize="11" fontWeight="bold">Diffused Core n(x,y)</text>
          <ellipse cx="240" cy="62" rx="22" ry="12" fill="rgba(250, 204, 21, 0.5)" />
        </g>
      ),
    },
  };

  const active = geometries[wgType];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.2 — WAVEGUIDE STRUCTURES &amp; INDEX PROFILES (PAGE 3)</div>
      <h2 style={s.SlideHeading}>
        Planar Film vs. 5 Channel Waveguide Geometries
      </h2>

      {/* Geometry Selector */}
      <div style={s.TabRow}>
        {[
          { id: "buried", label: "1. Buried Channel" },
          { id: "striploaded", label: "2. Strip-Loaded" },
          { id: "ridge", label: "3. Ridge / Strip / Wire" },
          { id: "rib", label: "4. Rib (Partial Etch)" },
          { id: "diffused", label: "5. Diffused (Ti:LiNbO₃)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setWgType(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: wgType === t.id ? "#2563eb" : "#0f172a",
              color: wgType === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Structure Summary */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{active.name}</h3>
          <p style={s.BodyText}>
            <strong>Geometry:</strong> {active.structure}
          </p>
          <p style={s.BodyText}>
            <strong>Optical Properties:</strong> {active.features}
          </p>
          <div style={s.FormulaBox}>
            2D Channel Requirement: &nbsp; n_core &gt; n_clad1, n_clad2, n_clad3
            <br />
            Modes in 2D Waveguides: Hybrid quasi-TE (q-TE) &amp; quasi-TM (q-TM).
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8", lineHeight: 1.5 }}>
            Because boundaries are non-planar, pure TE/TM modes do not exist in channel waveguides. They are solved numerically via Marcatili's analytical approximation or the Beam Propagation Method (BPM).
          </p>
        </div>

        {/* Right: SVG Cross-Section Render */}
        <div style={s.SimBox}>
          <svg viewBox="0 0 460 160" style={{ width: "100%", height: "155px", background: "#050914", borderRadius: "8px" }}>
            {active.svgDraw}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 3: Ray Optics Model, TIR & Transverse Resonance Condition (Pages 4 & 5)
   ============================================================================ */
function Slide3TransverseResonance() {
  const [bounceAngleDeg, setBounceAngleDeg] = useState(78); // θ inside core (critical angle ~65°)
  const coreThickD = 0.5; // μm (500 nm)
  const n1 = 3.48; // Silicon core
  const n2 = 1.44; // SiO2 cladding
  const lambda0 = 1.55; // μm

  // Critical angle θc = arcsin(n2/n1)
  const thetaCDeg = +((Math.asin(n2 / n1) * 180) / Math.PI).toFixed(1);
  const isTIR = bounceAngleDeg >= thetaCDeg;

  // Wavevector components: k1 = 2π n1 / λ
  const k1 = (2 * Math.PI * n1) / lambda0;
  const thetaRad = (bounceAngleDeg * Math.PI) / 180;
  const kx = +(k1 * Math.cos(thetaRad)).toFixed(2);
  const beta = +(k1 * Math.sin(thetaRad)).toFixed(2);
  const nEff = +(n1 * Math.sin(thetaRad)).toFixed(3);

  // Fresnel reflection phase shift ϕ_TIR for TE mode:
  // tan(ϕ/2) = sqrt(n1^2 sin^2 θ - n2^2) / (n1 cos θ)
  let phiTirDeg = 0;
  if (isTIR) {
    const num = Math.sqrt(n1 ** 2 * Math.sin(thetaRad) ** 2 - n2 ** 2);
    const den = n1 * Math.cos(thetaRad);
    phiTirDeg = 2 * Math.atan(num / den) * (180 / Math.PI);
  }

  // Round trip phase shift: 2 kx d - 2 phi_TIR
  const roundTripPhaseRad = (2 * kx * coreThickD - 2 * ((phiTirDeg * Math.PI) / 180));
  const modeOrderM = (roundTripPhaseRad / (2 * Math.PI)).toFixed(2);
  const isResonant = Math.abs(Math.round(modeOrderM) - modeOrderM) < 0.08 && isTIR;

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.3 — RAY OPTICS &amp; TRANSVERSE RESONANCE (PAGES 4–5)</div>
      <h2 style={s.SlideHeading}>
        TIR, k-Vector Decomposition &amp; The Transverse Resonance Condition
      </h2>

      <div style={s.Grid2}>
        {/* Left: Mathematical Derivation */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Wavevector Components &amp; Round-Trip Phase</h3>
          <div style={s.FormulaBox}>
            k_x = k₁ cos θ = (n₁ω / c) cos θ, &nbsp; β = k_z = k₁ sin θ = (n₁ω / c) sin θ
            <br />
            β² + k_x² = k₁² = (n₁ω / c)², &nbsp; Effective Index: n_eff = n₁ sin θ
          </div>
          <p style={s.BodyText}>
            A guided mode can exist <em>only</em> when repeatedly reflected wavefronts constructively interfere with themselves after one round-trip across core thickness <code style={s.Code}>d</code>:
          </p>
          <div style={s.FormulaBox}>
            Transverse Resonance: &nbsp; 2 k₁ d cos θ − 2 ϕ_TIR(θ) = 2mπ &nbsp; (m = 0, 1, 2...)
          </div>
          <p style={{ fontSize: "12px", color: "#94a3b8" }}>
            Critical angle for TIR: <code style={s.Code}>θ_c = arcsin(n₂/n₁) = {thetaCDeg}°</code>. Rays with <code style={s.Code}>θ &lt; θ_c</code> refract into cladding (radiative loss mode).
          </p>
        </div>

        {/* Right: Interactive Zig-Zag Ray Bouncing Simulation */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: isTIR ? (isResonant ? "#34d399" : "#facc15") : "#f87171" }}>
              {!isTIR ? "✕ Below θ_c: Refraction into Cladding" : isResonant ? `✓ Guided Mode Match: m ≈ ${Math.round(modeOrderM)}` : "TIR Active (Non-Resonant Angle)"}
            </span>
            <span style={{ fontSize: "12px", color: "#38bdf8", fontFamily: "monospace" }}>
              n_eff = {nEff} | β = {beta} μm⁻¹
            </span>
          </div>

          <svg viewBox="0 0 460 160" style={{ width: "100%", height: "155px", background: "#050914", borderRadius: "8px" }}>
            {/* Cladding Top & Bottom */}
            <rect x="0" y="0" width="460" height="40" fill="#0f172a" />
            <text x="15" y="24" fill="#64748b" fontSize="10">Cladding n₂ = 1.44 (SiO₂)</text>
            <rect x="0" y="120" width="460" height="40" fill="#0f172a" />
            <text x="15" y="146" fill="#64748b" fontSize="10">Substrate n₂ = 1.44</text>

            {/* Core Layer */}
            <rect x="0" y="40" width="460" height="80" fill="rgba(37, 99, 235, 0.2)" stroke="#38bdf8" strokeWidth="2" />
            <text x="15" y="85" fill="#38bdf8" fontSize="11" fontWeight="bold">Core n₁ = 3.48 (Si, d = 500 nm)</text>

            {/* Zig-Zag Ray Path */}
            <polyline
              points={`20,80 80,40 160,120 240,40 320,120 400,40 440,80`}
              fill="none"
              stroke={!isTIR ? "#ef4444" : isResonant ? "#34d399" : "#facc15"}
              strokeWidth={isResonant ? 3.5 : 2}
            />
            {/* Wavefront constructive lines */}
            {isResonant && (
              <g stroke="#34d399" strokeWidth="1.5" strokeDasharray="3,3">
                <line x1="80" y1="40" x2="160" y2="120" />
                <line x1="160" y1="120" x2="240" y2="40" />
              </g>
            )}
          </svg>

          <div style={{ marginTop: "10px" }}>
            <label style={s.Label}>
              Ray Internal Angle (θ): <strong>{bounceAngleDeg}°</strong> (Critical θ_c = {thetaCDeg}°) — Round Trip Mode Index: <strong>m = {modeOrderM}</strong>
            </label>
            <input
              type="range"
              min="50"
              max="88"
              step="0.5"
              value={bounceAngleDeg}
              onChange={(e) => setBounceAngleDeg(parseFloat(e.target.value))}
              style={s.Slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 4: TE vs. TM Modes, Standing Waves & Evanescent Field (Pages 5 & 6)
   ============================================================================ */
function Slide4StandingWaveAndEvanescent() {
  const [selectedPol, setSelectedPol] = useState("TE"); // "TE" (s-pol) | "TM" (p-pol)
  const [modeM, setModeM] = useState(0); // 0 (fundamental) | 1 (first higher order)
  const [indexContrast, setIndexContrast] = useState(2.04); // Δn = n1 - n2

  // Decay constant α = sqrt(β^2 - n2^2 k^2)
  const alphaDecay = +(indexContrast * 2.1).toFixed(2);

  // SVG standing wave + evanescent tail
  const buildModeShapePath = () => {
    const pts = [];
    for (let x = -130; x <= 130; x += 3) {
      let amp = 0;
      if (Math.abs(x) <= 50) {
        // Inside Core (-50 to +50): Standing wave
        const phase = (x / 50) * (modeM === 0 ? Math.PI / 2.3 : Math.PI * 0.9);
        amp = modeM === 0 ? Math.cos(phase) : Math.sin(phase);
      } else {
        // Inside Cladding (|x| > 50): Exponential decay
        const dist = Math.abs(x) - 50;
        const edgeVal = modeM === 0 ? Math.cos(Math.PI / 2.3) : Math.sin(Math.PI * 0.9) * Math.sign(x);
        amp = edgeVal * Math.exp((-dist * alphaDecay) / 30);
      }
      const svgX = 230 + amp * 90;
      const svgY = 95 + x;
      pts.push(`${svgX.toFixed(1)},${svgY.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.4 — TE vs. TM STANDING WAVES &amp; EVANESCENT DECAY (PAGES 5–6)</div>
      <h2 style={s.SlideHeading}>
        Standing Wave in Core &amp; Exponential Evanescent Decay in Cladding
      </h2>

      <div style={s.Grid2}>
        {/* Left: Mathematical Formulation */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Upward/Downward Waves &amp; Standing Wave Formation</h3>
          <div style={s.FormulaBox}>
            E_up = E₀ exp[i(hx + βz)], &nbsp; E_down = E₀ exp[i(−hx + βz)]
            <br />
            Core Total: E_t = 2E₀ cos(hx) · exp[i(βz − ωt)] &nbsp; (Standing Wave)
          </div>
          <p style={s.BodyText}>
            At the boundary, Snell's phase matching requires <code style={s.Code}>β = n₁k sin θ₁ = n₂k sin θ₂</code>. Since <code style={s.Code}>θ₁ &gt; θ_c</code>, <code style={s.Code}>β &gt; n₂k</code>, making the transverse wavevector in cladding imaginary:
          </p>
          <div style={s.FormulaBox}>
            k_2x = iα, &nbsp; α = √(β² − n₂² k₀²) &nbsp; (Evanescent Decay Factor)
            <br />
            Upper: E = E₂ exp[−α(x − d/2)] · exp[i(βz − ωt)]
          </div>
          <ul style={s.List}>
            <li>
              <strong>Fundamental Mode (m=0):</strong> Even single cosine peak across core with zero internal nodes. Highest propagation constant <code style={s.Code}>β₀</code>!
            </li>
            <li>
              <strong>Higher Order Mode (m=1):</strong> Odd sine wave with a central null node and lower <code style={s.Code}>β₁ &lt; β₀</code>.
            </li>
          </ul>
        </div>

        {/* Right: Interactive Mode Profile & Evanescent Tail Plot */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
            <button
              onClick={() => setSelectedPol("TE")}
              style={{ ...s.ModeToggleBtn, backgroundColor: selectedPol === "TE" ? "#2563eb" : "#1e293b" }}
            >
              TE (s-polarized: E_y, H_x, H_z)
            </button>
            <button
              onClick={() => setSelectedPol("TM")}
              style={{ ...s.ModeToggleBtn, backgroundColor: selectedPol === "TM" ? "#2563eb" : "#1e293b" }}
            >
              TM (p-polarized: H_y, E_x, E_z)
            </button>
            <button
              onClick={() => setModeM(modeM === 0 ? 1 : 0)}
              style={{ ...s.ModeToggleBtn, backgroundColor: "#059669" }}
            >
              Switch to {modeM === 0 ? "TE₁ / TM₁ (Higher Order)" : "TE₀ / TM₀ (Fundamental)"}
            </button>
          </div>

          <svg viewBox="0 0 460 190" style={{ width: "100%", height: "175px", background: "#050914", borderRadius: "8px" }}>
            {/* Cladding and Core Boundaries */}
            <rect x="20" y="0" width="420" height="45" fill="#0f172a" />
            <text x="30" y="24" fill="#64748b" fontSize="10">Upper Cladding n₂ (Evanescent Tail: e^(-αx))</text>
            <rect x="20" y="145" width="420" height="45" fill="#0f172a" />
            <text x="30" y="168" fill="#64748b" fontSize="10">Lower Cladding n₂ (Evanescent Tail: e^(+αx))</text>

            <rect x="20" y="45" width="420" height="100" fill="rgba(37, 99, 235, 0.2)" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,4" />
            <text x="30" y="70" fill="#38bdf8" fontSize="11" fontWeight="bold">Core n₁ (Standing Wave cos(hx))</text>

            {/* Transverse Mode Curve E_y(x) */}
            <line x1="230" y1="5" x2="230" y2="185" stroke="#334155" />
            <path d={buildModeShapePath()} fill="none" stroke="#facc15" strokeWidth="3" />
            <circle cx="230" cy="45" r="4" fill="#ef4444" />
            <circle cx="230" cy="145" r="4" fill="#ef4444" />
            <text x="330" y="95" fill="#facc15" fontSize="11" fontWeight="bold">
              {selectedPol}_{modeM} Field Profile
            </text>
          </svg>

          <div style={{ marginTop: "8px" }}>
            <label style={s.Label}>
              Core-Cladding Index Contrast (Δn): <strong>{indexContrast.toFixed(2)}</strong> (Higher Δn tightly squashes the evanescent tail!)
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={indexContrast}
              onChange={(e) => setIndexContrast(parseFloat(e.target.value))}
              style={s.Slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 5: Maxwell Wave Equation Matrix & Non-Vanishing Components (Pages 6 & 7)
   ============================================================================ */
function Slide5MaxwellWaveEquations() {
  const [activePolarization, setActivePolarization] = useState("TE");

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.5 — MAXWELL WAVE EQUATIONS FOR PLANAR SLAB (PAGES 6–7)</div>
      <h2 style={s.SlideHeading}>
        Electromagnetic Wave Equations &amp; Field Component Separation
      </h2>

      <div style={s.TabRow}>
        <button
          onClick={() => setActivePolarization("TE")}
          style={{
            ...s.TabBtn,
            backgroundColor: activePolarization === "TE" ? "#2563eb" : "#0f172a",
            color: activePolarization === "TE" ? "#fff" : "#94a3b8",
          }}
        >
          1. Transverse Electric (TE Modes: E_z = 0)
        </button>
        <button
          onClick={() => setActivePolarization("TM")}
          style={{
            ...s.TabBtn,
            backgroundColor: activePolarization === "TM" ? "#2563eb" : "#0f172a",
            color: activePolarization === "TM" ? "#fff" : "#94a3b8",
          }}
        >
          2. Transverse Magnetic (TM Modes: H_z = 0)
        </button>
      </div>

      <div style={s.Grid2}>
        {/* Left: General Vector Wave Equation from Maxwell's Equations */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Maxwell's Curl Equations in Linear Isotropic Media</h3>
          <div style={s.FormulaBox}>
            ∇ × E = −iωμ₀ H, &nbsp; ∇ × H = iωε E
            <br />
            ∇²E + k²E = −∇[(∇ε / ε) · E], &nbsp; k² = ω² μ₀ ε(x)
          </div>
          <p style={s.BodyText}>
            For a 1D planar slab waveguide uniform along <code style={s.Code}>y</code> (<code style={s.Code}>∂/∂y = 0</code>) and propagating along <code style={s.Code}>z</code> (<code style={s.Code}>∂/∂z = iβ</code>), the six coupled Maxwell equations decouple into two independent sets of three components:
          </p>
          <div style={{ display: "flex", gap: "12px", background: "#050914", padding: "10px", borderRadius: "8px", fontFamily: "monospace", fontSize: "12.5px" }}>
            <div style={{ flex: 1, borderRight: "1px solid #1e293b" }}>
              <div style={{ color: "#38bdf8", fontWeight: 700 }}>TE Mode (s-polarized):</div>
              <div>E_y (Non-vanishing E)</div>
              <div>H_x = −(β / ωμ₀) E_y</div>
              <div>H_z = (1 / iωμ₀) ∂E_y/∂x</div>
              <div style={{ color: "#64748b" }}>E_x = E_z = H_y = 0</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#facc15", fontWeight: 700 }}>TM Mode (p-polarized):</div>
              <div>H_y (Non-vanishing H)</div>
              <div>E_x = (β / ωε) H_y</div>
              <div>E_z = −(1 / iωε) ∂H_y/∂x</div>
              <div style={{ color: "#64748b" }}>H_x = H_z = E_y = 0</div>
            </div>
          </div>
        </div>

        {/* Right: Second-Order 1D Differential Equations */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>
            {activePolarization === "TE" ? "TE Scalar Wave Equation" : "TM Scalar Wave Equation"}
          </h3>
          {activePolarization === "TE" ? (
            <div>
              <div style={s.FormulaBox}>
                ∂²E_y / ∂x² + (k² − β²) E_y = 0
                <br />
                Inside Core (k₁² &gt; β²): E_y(x) = B cos(hx) + C sin(hx)
                <br />
                Inside Cladding (k₂² &lt; β²): E_y(x) = A exp(−α|x|)
              </div>
              <ul style={s.List}>
                <li><code style={s.Code}>h = √(k₁² − β²)</code> is the oscillatory transverse wavevector.</li>
                <li><code style={s.Code}>α = √(β² − k₂²)</code> is the cladding decay constant.</li>
                <li>Guided mode existence condition: <code style={s.Code}>k₂ &lt; β &lt; k₁</code>.</li>
              </ul>
            </div>
          ) : (
            <div>
              <div style={s.FormulaBox}>
                ∂²H_y / ∂x² + (k² − β²) H_y = (1/ε)(∂ε/∂x)(∂H_y/∂x)
                <br />
                Core: H_y(x) = B cos(hx) + C sin(hx)
                <br />
                Cladding: H_y(x) = A exp(−α|x|)
              </div>
              <ul style={s.List}>
                <li>Due to the discontinuity of permittivity <code style={s.Code}>ε(x)</code> at the boundary, the normal electric field <code style={s.Code}>E_x</code> jumps across the interface!</li>
                <li>However, displacement <code style={s.Code}>D_x = ε E_x</code> remains strictly continuous.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 6: Normalized Waveguide Parameters (V, b), Cutoff & Mode Count (Page 8)
   ============================================================================ */
function Slide6NormalizedParameters() {
  const [coreWidthD, setCoreWidthD] = useState(0.45); // μm (450 nm)
  const [wavelengthUm, setWavelengthUm] = useState(1.55); // μm
  const n1 = 3.48; // Silicon
  const n2 = 1.44; // SiO2

  // V-number V = (2π d / λ) * sqrt(n1^2 - n2^2) = (2π d / λ) * NA
  const na = Math.sqrt(n1 ** 2 - n2 ** 2);
  const vNumber = +(((2 * Math.PI * coreWidthD) / wavelengthUm) * na).toFixed(2);

  // Number of supported TE modes in symmetric slab M = ceil(V / π)
  const numModes = Math.max(1, Math.ceil(vNumber / Math.PI));
  const isSingleMode = vNumber < Math.PI;

  // Normalized propagation constant b = (neff^2 - n2^2)/(n1^2 - n2^2)
  // Approximate analytical b for fundamental mode b0 ≈ 1 - (1.143 / V)^2 for V > 1.5
  const bFundamental = vNumber > 1.2 ? Math.min(0.96, Math.max(0.05, 1 - (1.3 / vNumber) ** 1.8)).toFixed(3) : 0.04;
  const nEff0 = +Math.sqrt(n2 ** 2 + bFundamental * (n1 ** 2 - n2 ** 2)).toFixed(3);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.6 — NORMALIZED PARAMETERS V &amp; b, CUTOFF &amp; MODE COUNT (PAGE 8)</div>
      <h2 style={s.SlideHeading}>
        Normalized Frequency (V), Guide Index (b) &amp; The Dispersion Chart
      </h2>

      <div style={s.Grid2}>
        {/* Left: Universal Parameter Definitions */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Normalized V-Number &amp; b-Parameter</h3>
          <div style={s.FormulaBox}>
            V = (2π d / λ) √(n₁² − n₂²) = (ωd / c) · NA
            <br />
            b = (β² − k₂²) / (k₁² − k₂²) = (n_eff² − n₂²) / (n₁² − n₂²) &nbsp; (0 ≤ b ≤ 1)
          </div>
          <div style={s.FormulaBox}>
            Eigenvalue Equation: &nbsp; tan[(hd − mπ)/2] = √(V² − h²d²) / (hd)
            <br />
            Mode Cutoff (b → 0, α → 0): &nbsp; V_c = mπ &nbsp; (m = 0, 1, 2...)
          </div>
          <ul style={s.List}>
            <li>
              <strong>Cut-Off Condition:</strong> When propagating angle reaches the critical angle <code style={s.Code}>θ = θ_c</code>, <code style={s.Code}>β = k₂</code>, <code style={s.Code}>b = 0</code>.
            </li>
            <li>
              <strong>Number of Guided Modes:</strong>{" "}
              <code style={s.Code}>M = ⌈V / π⌉</code> (for symmetric slab).
            </li>
            <li>
              <strong>Single-Mode Condition (Page 9):</strong>{" "}
              <code style={s.Code}>V &lt; π ≈ 3.14</code>. Only the fundamental mode exists!
            </li>
          </ul>
        </div>

        {/* Right: Interactive b-V Dispersion Curve Chart (Recreates Page 8 Chart) */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: isSingleMode ? "#34d399" : "#facc15" }}>
              V = {vNumber} &nbsp;({isSingleMode ? "Strictly Single-Mode" : `Multimode: Supports ${numModes} Modes`})
            </span>
            <span style={{ fontSize: "12px", color: "#38bdf8", fontFamily: "monospace" }}>
              b₀ ≈ {bFundamental} | n_eff ≈ {nEff0}
            </span>
          </div>

          <svg viewBox="0 0 460 160" style={{ width: "100%", height: "155px", background: "#050914", borderRadius: "8px" }}>
            {/* Grid & Axes */}
            <line x1="45" y1="130" x2="430" y2="130" stroke="#475569" strokeWidth="1.5" />
            <text x="435" y="134" fill="#94a3b8" fontSize="11" fontWeight="bold">V</text>
            <line x1="45" y1="130" x2="45" y2="15" stroke="#475569" strokeWidth="1.5" />
            <text x="30" y="20" fill="#94a3b8" fontSize="11" fontWeight="bold">b</text>

            <text x="25" y="134" fill="#64748b" fontSize="10">0</text>
            <text x="25" y="30" fill="#64748b" fontSize="10">1.0</text>

            {/* Dispersion Curve for m = 0 (TE0) */}
            <path d="M 45,130 Q 95,55 420,28" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="145" y="60" fill="#38bdf8" fontSize="11" fontWeight="bold">m = 0 (TE₀)</text>

            {/* Dispersion Curve for m = 1 (Cutoff at V = π ≈ 140px) */}
            <path d="M 145,130 Q 210,65 420,38" fill="none" stroke="#facc15" strokeWidth="2.5" />
            <text x="235" y="70" fill="#facc15" fontSize="11" fontWeight="bold">m = 1 (TE₁)</text>
            <line x1="145" y1="125" x2="145" y2="135" stroke="#facc15" strokeWidth="2" />
            <text x="135" y="146" fill="#facc15" fontSize="10">V=π</text>

            {/* Dispersion Curve for m = 2 (Cutoff at V = 2π ≈ 245px) */}
            <path d="M 245,130 Q 305,75 420,48" fill="none" stroke="#34d399" strokeWidth="2.5" />
            <text x="325" y="80" fill="#34d399" fontSize="11" fontWeight="bold">m = 2 (TE₂)</text>
            <line x1="245" y1="125" x2="245" y2="135" stroke="#34d399" strokeWidth="2" />
            <text x="235" y="146" fill="#34d399" fontSize="10">V=2π</text>

            {/* Active V indicator line */}
            <line
              x1={Math.min(420, 45 + vNumber * 32)}
              y1="15"
              x2={Math.min(420, 45 + vNumber * 32)}
              y2="130"
              stroke="#ef4444"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <circle cx={Math.min(420, 45 + vNumber * 32)} cy={130 - bFundamental * 105} r="5" fill="#ef4444" />
          </svg>

          <div style={s.ControlsGrid}>
            <div>
              <label style={s.Label}>
                Core Thickness (d): <strong>{Math.round(coreWidthD * 1000)} nm</strong>
              </label>
              <input
                type="range"
                min="0.15"
                max="1.2"
                step="0.05"
                value={coreWidthD}
                onChange={(e) => setCoreWidthD(parseFloat(e.target.value))}
                style={s.Slider}
              />
            </div>
            <div>
              <label style={s.Label}>
                Wavelength (λ): <strong>{wavelengthUm.toFixed(2)} μm</strong>
              </label>
              <input
                type="range"
                min="1.20"
                max="1.65"
                step="0.05"
                value={wavelengthUm}
                onChange={(e) => setWavelengthUm(parseFloat(e.target.value))}
                style={s.Slider}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 7: 2D Channel Waveguides, Marcatili's Method & 2D Mode Blobs (Pages 9–11)
   ============================================================================ */
function Slide7Marcatili2DModes() {
  const [selectedMode, setSelectedMode] = useState("E00"); // "E00" | "E01" | "E10" | "E11"

  const modes = {
    E00: {
      name: "E₀₀ (Fundamental Quasi-TE / Quasi-TM)",
      lobes: "Single symmetric central intensity blob.",
      desc: "Zero transverse nulls in both x and y. Standard operating mode for Silicon Photonics transceivers.",
      svg: (
        <g>
          <ellipse cx="230" cy="75" rx="45" ry="32" fill="rgba(56, 189, 248, 0.75)" filter="blur(3px)" />
          <ellipse cx="230" cy="75" rx="20" ry="14" fill="#ffffff" />
          <text x="218" y="79" fill="#0284c7" fontSize="12" fontWeight="bold">+</text>
        </g>
      ),
    },
    E01: {
      name: "E₀₁ Mode (Dipole in y)",
      lobes: "Two distinct lobes separated by a nodal line along the horizontal y-axis.",
      desc: "Odd mode in y with opposite phases (+ and −), representing the first higher-order transverse mode.",
      svg: (
        <g>
          <ellipse cx="185" cy="75" rx="28" ry="30" fill="rgba(56, 189, 248, 0.75)" filter="blur(2px)" />
          <text x="180" y="80" fill="#ffffff" fontSize="14" fontWeight="bold">+</text>
          <ellipse cx="275" cy="75" rx="28" ry="30" fill="rgba(248, 113, 113, 0.75)" filter="blur(2px)" />
          <text x="270" y="80" fill="#ffffff" fontSize="16" fontWeight="bold">−</text>
          <line x1="230" y1="20" x2="230" y2="130" stroke="#facc15" strokeDasharray="3,3" />
        </g>
      ),
    },
    E10: {
      name: "E₁₀ Mode (Dipole in x)",
      lobes: "Two distinct lobes separated by a nodal line along the vertical x-axis.",
      desc: "Odd mode in x with opposite phases (+ top, − bottom).",
      svg: (
        <g>
          <ellipse cx="230" cy="48" rx="42" ry="20" fill="rgba(56, 189, 248, 0.75)" filter="blur(2px)" />
          <text x="226" y="52" fill="#ffffff" fontSize="14" fontWeight="bold">+</text>
          <ellipse cx="230" cy="102" rx="42" ry="20" fill="rgba(248, 113, 113, 0.75)" filter="blur(2px)" />
          <text x="226" y="106" fill="#ffffff" fontSize="16" fontWeight="bold">−</text>
          <line x1="160" y1="75" x2="300" y2="75" stroke="#facc15" strokeDasharray="3,3" />
        </g>
      ),
    },
    E11: {
      name: "E₁₁ Mode (Quadrupole 2×2 Lobes)",
      lobes: "Four distinct intensity quadrants alternating in phase (+, −, +, −).",
      desc: "Higher-order hybrid mode occurring in multi-mode rectangular cores.",
      svg: (
        <g>
          <ellipse cx="190" cy="50" rx="25" ry="18" fill="rgba(56, 189, 248, 0.75)" />
          <text x="186" y="54" fill="#ffffff" fontSize="12" fontWeight="bold">+</text>
          <ellipse cx="270" cy="50" rx="25" ry="18" fill="rgba(248, 113, 113, 0.75)" />
          <text x="266" y="54" fill="#ffffff" fontSize="14" fontWeight="bold">−</text>
          <ellipse cx="190" cy="100" rx="25" ry="18" fill="rgba(248, 113, 113, 0.75)" />
          <text x="186" y="104" fill="#ffffff" fontSize="14" fontWeight="bold">−</text>
          <ellipse cx="270" cy="100" rx="25" ry="18" fill="rgba(56, 189, 248, 0.75)" />
          <text x="266" y="104" fill="#ffffff" fontSize="12" fontWeight="bold">+</text>
          <line x1="230" y1="20" x2="230" y2="130" stroke="#facc15" strokeDasharray="3,3" />
          <line x1="150" y1="75" x2="310" y2="75" stroke="#facc15" strokeDasharray="3,3" />
        </g>
      ),
    },
  };

  const active = modes[selectedMode];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.7 — 2D MARCATILI METHOD &amp; MODE FIELD BLOBS (PAGES 9–11)</div>
      <h2 style={s.SlideHeading}>
        2D Scalar Wave Equation, Marcatili's 5 Regions &amp; Mode Profiles
      </h2>

      {/* Mode Selector Tabs */}
      <div style={s.TabRow}>
        {[
          { id: "E00", label: "E₀₀ (Single Blob)" },
          { id: "E01", label: "E₀₁ (Dipole in y: + −)" },
          { id: "E10", label: "E₁₀ (Dipole in x: + / −)" },
          { id: "E11", label: "E₁₁ (Quadrupole 4-Lobes)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedMode(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: selectedMode === t.id ? "#2563eb" : "#0f172a",
              color: selectedMode === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Marcatili's 5-Region Model Derivation */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Marcatili's Analytical Separation of Variables</h3>
          <div style={s.FormulaBox}>
            ∂²Ψ/∂x² + ∂²Ψ/∂y² + [k₀² n²(x,y) − β²] Ψ = 0
            <br />
            Separation: Ψ(x,y) = X(x) · Y(y) &nbsp;⇒&nbsp; β² = k₀² n₁² − k_x² − k_y²
          </div>
          <ul style={s.List}>
            <li>
              <strong>Region 1 (Core a × b):</strong> Standing waves along both axes:{" "}
              <code style={s.Code}>X(x) = A cos(k_x x + ϕ_x)</code>, <code style={s.Code}>Y(y) = B cos(k_y y + ϕ_y)</code>.
            </li>
            <li>
              <strong>Regions 2, 3, 4, 5 (Cladding):</strong> Exponential decays:{" "}
              <code style={s.Code}>e^(−γ₃ x)</code>, <code style={s.Code}>e^(γ₂ x)</code>, <code style={s.Code}>e^(−γ₄ y)</code>, <code style={s.Code}>e^(γ₅ y)</code>.
            </li>
            <li>
              <strong>Corner Regions:</strong> Neglected in Marcatili's model because field decay is strong enough that corner power is negligible for well-guided modes.
            </li>
          </ul>
        </div>

        {/* Right: Interactive 2D Mode Blob Cross-Section (Page 10) */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
            <span style={{ fontSize: "12.5px", fontWeight: 700, color: "#38bdf8" }}>
              {active.name}
            </span>
            <span style={{ fontSize: "11px", color: "#facc15" }}>
              Marcatili 2D Cross-Section (a × b Core)
            </span>
          </div>

          <svg viewBox="0 0 460 150" style={{ width: "100%", height: "145px", background: "#050914", borderRadius: "8px" }}>
            {/* 5 Regions Grid Lines from Page 9 & 10 */}
            <line x1="140" y1="10" x2="140" y2="140" stroke="#334155" strokeWidth="1.5" />
            <line x1="320" y1="10" x2="320" y2="140" stroke="#334155" strokeWidth="1.5" />
            <line x1="10" y1="35" x2="450" y2="35" stroke="#334155" strokeWidth="1.5" />
            <line x1="10" y1="115" x2="450" y2="115" stroke="#334155" strokeWidth="1.5" />

            {/* Region Labels */}
            <text x="60" y="25" fill="#64748b" fontSize="10">Region 5</text>
            <text x="215" y="25" fill="#64748b" fontSize="10">Region 3 (n₃)</text>
            <text x="370" y="25" fill="#64748b" fontSize="10">Region 4</text>
            <text x="60" y="80" fill="#64748b" fontSize="10">Region 5 (n₅)</text>
            <text x="370" y="80" fill="#64748b" fontSize="10">Region 4 (n₄)</text>
            <text x="215" y="132" fill="#64748b" fontSize="10">Region 2 (n₂)</text>

            {/* Core Box (Region 1) */}
            <rect x="140" y="35" width="180" height="80" fill="rgba(37, 99, 235, 0.15)" stroke="#38bdf8" strokeWidth="2" />
            <text x="148" y="52" fill="#38bdf8" fontSize="10" fontWeight="bold">Region 1: Core n₁</text>

            {/* Mode Field Lobe Rendering */}
            {active.svg}
          </svg>
          <p style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "8px" }}>
            {active.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 8: Web Literature Grounding & Chapter 2 Mastery Quiz
   ============================================================================ */
function Slide8WebReferencesAndQuiz() {
  const [showAnswers, setShowAnswers] = useState(false);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 2.8 — GROUNDED WEB REFERENCES &amp; CHAPTER 2 CHECK</div>
      <h2 style={s.SlideHeading}>
        Authoritative Literature &amp; Numerical Waveguide Quiz
      </h2>

      <div style={s.Grid2}>
        {/* Left: Verified Grounded Web References */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Curated Research &amp; Encyclopedia Grounding</h3>
          <ul style={s.List}>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/spatial_walk_off.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics: Spatial Walk-off
              </a>
              : Rigorous derivation of energy flow divergence between Poynting vector <code style={s.Code}>S</code> and wavevector <code style={s.Code}>k</code> in extraordinary waves.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/polarizers.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics: Polarizers &amp; Beam Splitters
              </a>
              : Operating principles of Wollaston, Rochon, and Glan–Thompson polarizing prisms.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/v_number.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics: V-Number &amp; Normalized Frequency
              </a>
              : Single-mode cutoffs and mode power confinement fractions in dielectric waveguides.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.semanticscholar.org/paper/Dielectric-rectangular-waveguide-and-directional-Marcatili/9a6b93f24d14949a59cd5c3f1e6f6e6fe8d7e14e" target="_blank" rel="noreferrer" style={s.Link}>
                Marcatili (1969) Bell System Technical Journal
              </a>
              : Seminal paper deriving the 5-region analytical solution for rectangular integrated optical waveguides and directional couplers.
            </li>
          </ul>
        </div>

        {/* Right: Self-Assessment Quiz */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Chapter 2 Self-Assessment Quiz</h3>
          <ol style={{ ...s.List, marginBottom: "12px" }}>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q1 (Walk-off):</strong> Why does the Ordinary wave experience zero walk-off, while the Extraordinary wave walks off by angle α?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q2 (Single-Mode Limit):</strong> For a symmetric silicon slab (<code style={s.Code}>n₁ = 3.48</code>, <code style={s.Code}>n₂ = 1.44</code>) at <code style={s.Code}>λ = 1.55 μm</code>, what is the maximum core thickness <code style={s.Code}>d_max</code> for single-mode operation (<code style={s.Code}>V &lt; π</code>)?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q3 (Marcatili Blobs):</strong> How many internal nodal lines and lobes are present in an <code style={s.Code}>E₁₁</code> mode?
            </li>
          </ol>

          <button onClick={() => setShowAnswers(!showAnswers)} style={s.ModeToggleBtn}>
            {showAnswers ? "Hide Worked Solutions" : "Reveal Worked Solutions"}
          </button>

          {showAnswers && (
            <div style={{ marginTop: "10px", padding: "10px", background: "#060a17", borderRadius: "8px", fontSize: "12px", color: "#cbd5e1", lineHeight: 1.55 }}>
              <div>• <strong>A1:</strong> For the O-wave, <code style={s.Code}>E ∥ D</code>, so <code style={s.Code}>S = E × H ∥ k</code>. For the E-wave, the tensor anisotropy tilts <code style={s.Code}>E</code> from <code style={s.Code}>D</code> by <code style={s.Code}>α</code>, so <code style={s.Code}>S</code> tilts from <code style={s.Code}>k</code> by <code style={s.Code}>α</code>.</div>
              <div>• <strong>A2:</strong> <code style={s.Code}>V = (2π d / λ) √(n₁² − n₂²) &lt; π  ⇒  d &lt; λ / (2 NA) = 1.55 / (2 × 3.167) ≈ 0.245 μm (245 nm)</code>. Standard SOI uses 220 nm!</div>
              <div>• <strong>A3:</strong> 2 nodal lines (1 horizontal, 1 vertical) creating 4 distinct quadrants (quadrupole).</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WaveguideModesAndTETMSection() {
  return (
    <Slideshow
      slides={[
        Slide1SpatialWalkOff,
        Slide2WaveguideGeometries,
        Slide3TransverseResonance,
        Slide4StandingWaveAndEvanescent,
        Slide5MaxwellWaveEquations,
        Slide6NormalizedParameters,
        Slide7Marcatili2DModes,
        Slide8WebReferencesAndQuiz,
      ]}
    />
  );
}

/* ============================================================================
   SHARED DARK-NAVY PRESENTATION STYLES
   ============================================================================ */
const s = {
  Tag: {
    color: "#facc15",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "8px",
  },
  SlideHeading: {
    fontSize: "25px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "12px",
  },
  BodyText: {
    fontSize: "13px",
    color: "#cbd5e1",
    lineHeight: 1.55,
    marginBottom: "10px",
  },
  Code: {
    color: "#facc15",
    fontFamily: "monospace",
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    padding: "1px 5px",
    borderRadius: "4px",
  },
  Link: {
    color: "#38bdf8",
    textDecoration: "underline",
    fontWeight: 600,
  },
  TabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "14px",
  },
  TabBtn: {
    padding: "7px 12px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  Grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
    alignItems: "start",
  },
  Card: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "16px",
  },
  CardTitle: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#38bdf8",
    marginBottom: "8px",
  },
  FormulaBox: {
    backgroundColor: "#060a17",
    border: "1px solid #1e3a8a",
    color: "#facc15",
    fontFamily: "monospace",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    marginBottom: "10px",
    lineHeight: 1.5,
  },
  List: {
    color: "#cbd5e1",
    fontSize: "12.5px",
    lineHeight: 1.6,
    paddingLeft: "18px",
  },
  SimBox: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "14px",
  },
  ControlsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px",
    marginTop: "10px",
  },
  Label: {
    display: "block",
    fontSize: "12px",
    color: "#cbd5e1",
    marginBottom: "4px",
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
    fontSize: "11.5px",
    fontWeight: 600,
    cursor: "pointer",
  },
};