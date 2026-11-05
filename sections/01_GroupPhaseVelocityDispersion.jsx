import React, { useState } from "react";
import Slideshow from "../components/Slideshow";

export const title = "1. Phase & Group Velocity, Dispersion & Anisotropic Media";

/* ============================================================================
   SLIDE 1: Monochromatic Light, Phase Velocity, Wave Packets & Group Velocity
   (Covers PDF Pages 1 & 2 + RP Photonics Theoretical Reference)
   ============================================================================ */
function Slide1PhaseVsGroupVelocity() {
  const [dispRegime, setDispRegime] = useState("normal"); // "none" | "normal" | "anomalous"
  const [nPhase, setNPhase] = useState(1.45); // Refractive index n(ω)
  const [zPos, setZPos] = useState(35); // Propagation snapshot slider (0 to 100)

  // dn/dω term: ω * (dn/dω) = -λ * (dn/dλ)
  const omegaDnDomega =
    dispRegime === "none" ? 0.0 : dispRegime === "normal" ? 0.25 : -0.25;
  const nGroup = +(nPhase + omegaDnDomega).toFixed(3);

  const c0 = 300000; // km/s
  const vPhase = Math.round(c0 / nPhase);
  const vGroup = Math.round(c0 / nGroup);

  // Build SVG wave packet path: E(z) = 4E cos(dk*z - dw*t) * cos(k0*z - w0*t)
  const buildEnvelopePath = (sign) => {
    const pts = [];
    const envCenter = 60 + (zPos / 100) * 340 * (1.45 / nGroup);
    for (let x = 20; x <= 560; x += 4) {
      const env = Math.exp(-((x - envCenter) ** 2) / (2 * 52 ** 2));
      const y = 95 - sign * env * 58;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  };

  const buildCarrierWavePath = () => {
    const pts = [];
    const envCenter = 60 + (zPos / 100) * 340 * (1.45 / nGroup);
    const carrierShift = (zPos / 100) * 340 * (1.45 / nPhase);
    for (let x = 20; x <= 560; x += 2) {
      const env = Math.exp(-((x - envCenter) ** 2) / (2 * 52 ** 2));
      const carrier = Math.cos((x - carrierShift) * 0.36);
      const y = 95 - env * carrier * 58;
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.1 — PHASE VELOCITY vs. GROUP VELOCITY </div>
      <h1 style={s.SlideHeading}>
        Monochromatic Waves, Wave Packets & Dispersion Regimes
      </h1>

      {/* Theoretical Description First */}
      <div style={s.Grid2}>
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Monochromatic Wave & Phase Velocity (v_p)</h3>
          <p style={s.BodyText}>
            A monochromatic light wave of single angular frequency <code style={s.Code}>ω</code>{" "}
            travels with constant amplitude <code style={s.Code}>E₀</code>:
          </p>
          <div style={s.FormulaBox}>
            E(z, t) = E₀ exp[i(kz − ωt)], &nbsp; ϕ = kz − ωt = const
            <br />
            dϕ = k dz − ω dt = 0 &nbsp;⇒&nbsp; v_p = dz/dt = ω / k = c₀ / n(ω)
          </div>
          <ul style={s.List}>
            <li>
              <strong>Propagation Constant:</strong>{" "}
              <code style={s.Code}>k = n k₀ = n(ω/c₀) = 2πn / λ₀</code>.
            </li>
            <li>
              <strong>Normal Dispersion:</strong>{" "}
              <code style={s.Code}>dn/dω &gt; 0</code> (<code style={s.Code}>dn/dλ &lt; 0</code>) — blue light experiences a higher index <code style={s.Code}>n</code> than red light.
            </li>
            <li>
              <strong>Anomalous Dispersion:</strong>{" "}
              <code style={s.Code}>dn/dω &lt; 0</code> (<code style={s.Code}>dn/dλ &gt; 0</code>).
            </li>
          </ul>
        </div>

        <div style={s.Card}>
          <h3 style={s.CardTitle}>2. Wave Packet Superposition & Group Velocity (v_g)</h3>
          <p style={s.BodyText}>
            Superposing two waves with closely spaced frequencies{" "}
            <code style={s.Code}>ω₁,₂ = ω₀ ± dω</code> and wavenumbers{" "}
            <code style={s.Code}>k₁,₂ = k₀ ± dk</code> produces a modulated beat wave:
          </p>
          <div style={s.FormulaBox}>
            E_pseudo = 4E cos(z·dk − t·dω) · cos(k₀z − ω₀t)
            <br />
            v_g = dω / dk = c₀ / n_g, &nbsp; n_g = n − λ(dn/dλ) = n + ω(dn/dω)
          </div>
          <p style={s.BodyText}>
            Here <code style={s.Code}>cos(k₀z − ω₀t)</code> is the fast{" "}
            <strong style={{ color: "#38bdf8" }}>carrier wave</strong> moving at{" "}
            <code style={s.Code}>v_p</code>, while{" "}
            <code style={s.Code}>cos(z·dk − t·dω)</code> is the{" "}
            <strong style={{ color: "#facc15" }}>pulse envelope</strong> carrying energy &amp; information at{" "}
            <code style={s.Code}>v_g</code> (
            <a
              href="https://www.rp-photonics.com/group_velocity.html"
              target="_blank"
              rel="noreferrer"
              style={s.Link}
            >
              RP Photonics: Group Velocity
            </a>
            ).
          </p>
        </div>
      </div>

      {/* Interactive Wave Packet & Dispersion Simulator */}
      <div style={{ ...s.SimBox, marginTop: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", marginBottom: "10px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "none", label: "Non-Dispersive (dn/dω = 0 → v_g = v_p)" },
              { id: "normal", label: "Normal Dispersion (dn/dω > 0 → v_g < v_p)" },
              { id: "anomalous", label: "Anomalous (dn/dω < 0 → v_g > v_p)" },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setDispRegime(b.id)}
                style={{
                  ...s.TabBtn,
                  backgroundColor: dispRegime === b.id ? "#2563eb" : "#060a17",
                  color: dispRegime === b.id ? "#fff" : "#94a3b8",
                }}
              >
                {b.label}
              </button>
            ))}
          </div>
          <div style={{ fontSize: "12px", color: "#cbd5e1", fontFamily: "monospace" }}>
            n = {nPhase.toFixed(2)} | n_g = {nGroup} | v_p = {vPhase.toLocaleString()} km/s | v_g = {vGroup.toLocaleString()} km/s
          </div>
        </div>

        <svg viewBox="0 0 580 185" style={{ width: "100%", height: "160px", background: "#050914", borderRadius: "8px" }}>
          <line x1="20" y1="95" x2="560" y2="95" stroke="#1e293b" strokeWidth="1.5" />
          {/* Upper & Lower Envelope */}
          <path d={buildEnvelopePath(1)} fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="5,4" />
          <path d={buildEnvelopePath(-1)} fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="5,4" />
          {/* High-Frequency Carrier Wave */}
          <path d={buildCarrierWavePath()} fill="none" stroke="#38bdf8" strokeWidth="2.2" />

          <text x="24" y="24" fill="#facc15" fontSize="11" fontWeight="bold">
            ── Dashed Envelope: cos(z·dk − t·dω) travels at v_g = {vGroup.toLocaleString()} km/s
          </text>
          <text x="24" y="172" fill="#38bdf8" fontSize="11" fontWeight="bold">
            ── Solid Carrier: cos(k₀z − ω₀t) travels at v_p = {vPhase.toLocaleString()} km/s
          </text>
        </svg>

        <div style={s.ControlsGrid}>
          <div>
            <label style={s.Label}>
              Propagate Wave Packet in Time (t): <strong>{zPos}%</strong> (Watch carrier crests slide inside envelope!)
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={zPos}
              onChange={(e) => setZPos(Number(e.target.value))}
              style={s.Slider}
            />
          </div>
          <div>
            <label style={s.Label}>
              Base Refractive Index n(ω₀): <strong>{nPhase.toFixed(2)}</strong>
            </label>
            <input
              type="range"
              min="1.30"
              max="3.50"
              step="0.05"
              value={nPhase}
              onChange={(e) => setNPhase(parseFloat(e.target.value))}
              style={s.Slider}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 2: Group Velocity Dispersion (GVD) & Chromatic Pulse Broadening
   (Covers PDF Pages 2 & 3 + Numerical Fiber Calculator)
   ============================================================================ */
function Slide2GVDAndChromaticBroadening() {
  const [gvdSign, setGvdSign] = useState("positive"); // "positive" (d2k/dw2 > 0) | "negative" (d2k/dw2 < 0)
  const [fiberLenKm, setFiberLenKm] = useState(25); // L in km
  const [dispParamMag, setDispParamMag] = useState(17); // |D_λ| in ps/(km·nm)
  const [spectralWidthNm, setSpectralWidthNm] = useState(2.0); // Δλ in nm

  // In Page 3: d²k/dω² > 0 corresponds to D_λ < 0 (Normal dispersion: Red arrives first)
  // d²k/dω² < 0 corresponds to D_λ > 0 (Anomalous dispersion: Blue arrives first)
  const dLambdaSigned = gvdSign === "positive" ? -dispParamMag : dispParamMag;
  const deltaTauPs = +(fiberLenKm * dispParamMag * spectralWidthNm).toFixed(1);

  const redArrivalX = gvdSign === "positive" ? 445 : 335;
  const greenArrivalX = 390;
  const blueArrivalX = gvdSign === "positive" ? 335 : 445;

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.2 — GROUP VELOCITY DISPERSION (GVD) 
      </div>
      <h2 style={s.SlideHeading}>
        GVD, Chromatic Dispersion Parameter (D_λ) &amp; Pulse Broadening
      </h2>

      {/* Theoretical Description First */}
      <div style={s.Grid2}>
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Group Velocity Dispersion (GVD) &amp; Regimes</h3>
          <div style={s.FormulaBox}>
            GVD ≡ β₂ = d²k / dω² = d/dω (1 / v_g) ≠ 0
            <br />
            Dimensionless: D_dim = c · ω · (d²k/dω²) = (2πc² / λ) · (d²k/dω²)
          </div>
          <ul style={s.List}>
            <li>
              <strong>Positive GVD (<code style={s.Code}>d²k/dω² &gt; 0, D_λ &lt; 0</code>):</strong>{" "}
              <span style={{ color: "#f87171", fontWeight: 700 }}>Longer λ (Red)</span> travels{" "}
              <em>faster</em> than <span style={{ color: "#60a5fa", fontWeight: 700 }}>shorter λ (Blue)</span>. Red arrives first!
            </li>
            <li>
              <strong>Negative GVD (<code style={s.Code}>d²k/dω² &lt; 0, D_λ &gt; 0</code>):</strong>{" "}
              <span style={{ color: "#60a5fa", fontWeight: 700 }}>Shorter λ (Blue)</span> travels{" "}
              <em>faster</em> than <span style={{ color: "#f87171", fontWeight: 700 }}>longer λ (Red)</span>. Blue arrives first!
            </li>
          </ul>
        </div>

        <div style={s.Card}>
          <h3 style={s.CardTitle}>2. Chromatic Dispersion (D_λ) &amp; Delay Spread (Δτ)</h3>
          <div style={s.FormulaBox}>
            D_λ = −(2πc / λ²)(d²k / dω²) = −(λ / c)(d²n / dλ²) &nbsp;[ps/(km·nm)]
            <br />
            Δτ = dτ/dλ · Δλ = L · [d(1/v_g)/dλ] · Δλ = L · D_λ · Δλ
          </div>
          <p style={s.BodyText}>
            Since <code style={s.Code}>1/v_g = n_g / c</code>, differentiating with respect to{" "}
            <code style={s.Code}>λ</code> gives{" "}
            <code style={s.Code}>D_λ = (1/c)(dn_g/dλ)</code> where{" "}
            <code style={s.Code}>n_g = n − λ(dn/dλ)</code> (
            <a
              href="https://www.rp-photonics.com/chromatic_dispersion.html"
              target="_blank"
              rel="noreferrer"
              style={s.Link}
            >
              RP Photonics: Chromatic Dispersion
            </a>
            ).
          </p>
        </div>
      </div>

      {/* Interactive Red/Green/Blue Pulse Arrival & Numerical Broadening Lab */}
      <div style={{ ...s.SimBox, marginTop: "14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => setGvdSign("positive")}
              style={{
                ...s.TabBtn,
                backgroundColor: gvdSign === "positive" ? "#2563eb" : "#060a17",
                color: gvdSign === "positive" ? "#fff" : "#94a3b8",
              }}
            >
              Case A: d²k/dω² &gt; 0 (Normal: Red λ₀+δλ Arrives First)
            </button>
            <button
              onClick={() => setGvdSign("negative")}
              style={{
                ...s.TabBtn,
                backgroundColor: gvdSign === "negative" ? "#2563eb" : "#060a17",
                color: gvdSign === "negative" ? "#fff" : "#94a3b8",
              }}
            >
              Case B: d²k/dω² &lt; 0 (Anomalous: Blue λ₀−δλ Arrives First)
            </button>
          </div>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#facc15", fontFamily: "monospace" }}>
            Pulse Spread Δτ = L · |D_λ| · Δλ = {deltaTauPs} ps
          </div>
        </div>

        {/* SVG Recreation of Page 2 Bottom Diagram */}
        <svg viewBox="0 0 580 175" style={{ width: "100%", height: "160px", background: "#050914", borderRadius: "8px" }}>
          {/* Input Narrow Rectangular Pulse */}
          <polyline points="20,60 45,60 45,22 70,22 70,60 95,60" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <text x="22" y="16" fill="#94a3b8" fontSize="10" fontWeight="bold">Input Pulse</text>

          {/* Optical Fiber Cylinder of Length L */}
          <rect x="115" y="26" width="175" height="34" rx="6" fill="rgba(37, 99, 235, 0.2)" stroke="#38bdf8" strokeWidth="2" />
          <text x="150" y="47" fill="#38bdf8" fontSize="12" fontWeight="bold">Optical Fibre (L = {fiberLenKm} km)</text>

          {/* Broadened Output Rectangular Pulse */}
          <polyline
            points={`325,60 345,60 345,30 ${345 + Math.min(180, 35 + deltaTauPs * 0.15)},30 ${345 + Math.min(180, 35 + deltaTauPs * 0.15)},60 555,60`}
            fill="none"
            stroke="#facc15"
            strokeWidth="2.5"
          />
          <text x="345" y="20" fill="#facc15" fontSize="10" fontWeight="bold">
            Broadened Output (Δτ = {deltaTauPs} ps)
          </text>

          {/* Spectral Component Timing Tracks (Red, Green, Blue) */}
          {/* Red Track */}
          <line x1="30" y1="92" x2="540" y2="92" stroke="#334155" strokeDasharray="3,3" />
          <text x="25" y="88" fill="#f87171" fontSize="11" fontWeight="bold">λ₀ + δλ (Red)</text>
          <line x1={redArrivalX} y1="74" x2={redArrivalX} y2="96" stroke="#f87171" strokeWidth="4" />
          <text x={redArrivalX - 28} y="70" fill="#f87171" fontSize="10">
            {gvdSign === "positive" ? "Arrives 1st →" : "Arrives Last"}
          </text>

          {/* Green Track */}
          <line x1="30" y1="126" x2="540" y2="126" stroke="#334155" strokeDasharray="3,3" />
          <text x="25" y="122" fill="#4ade80" fontSize="11" fontWeight="bold">λ₀ (Green)</text>
          <line x1={greenArrivalX} y1="108" x2={greenArrivalX} y2="130" stroke="#4ade80" strokeWidth="4" />

          {/* Blue Track */}
          <line x1="30" y1="160" x2="540" y2="160" stroke="#334155" strokeDasharray="3,3" />
          <text x="25" y="156" fill="#60a5fa" fontSize="11" fontWeight="bold">λ₀ − δλ (Blue)</text>
          <line x1={blueArrivalX} y1="142" x2={blueArrivalX} y2="164" stroke="#60a5fa" strokeWidth="4" />
          <text x={blueArrivalX - 28} y="140" fill="#60a5fa" fontSize="10">
            {gvdSign === "negative" ? "Arrives 1st →" : "Arrives Last"}
          </text>
        </svg>

        {/* Numerical Calculator Sliders */}
        <div style={s.ControlsGrid}>
          <div>
            <label style={s.Label}>Fibre Length (L): <strong>{fiberLenKm} km</strong></label>
            <input type="range" min="1" max="100" value={fiberLenKm} onChange={(e) => setFiberLenKm(Number(e.target.value))} style={s.Slider} />
          </div>
          <div>
            <label style={s.Label}>Dispersion |D_λ|: <strong>{dispParamMag} ps/(km·nm)</strong> (D_λ = {dLambdaSigned})</label>
            <input type="range" min="1" max="40" value={dispParamMag} onChange={(e) => setDispParamMag(Number(e.target.value))} style={s.Slider} />
          </div>
          <div>
            <label style={s.Label}>Source Spectral Width (Δλ): <strong>{spectralWidthNm.toFixed(1)} nm</strong></label>
            <input type="range" min="0.2" max="10.0" step="0.2" value={spectralWidthNm} onChange={(e) => setSpectralWidthNm(parseFloat(e.target.value))} style={s.Slider} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 3: Isotropic vs. Anisotropic Order & 3×3 Permittivity Tensor
   (Covers PDF Page 4 & Page 5 Top)
   ============================================================================ */
function Slide3IsotropicAnisotropicAndTensor() {
  const [matClass, setMatClass] = useState("crystal"); // "amorphous" | "poly" | "crystal" | "liquidcrystal"
  const [diagonalized, setDiagonalized] = useState(false);
  const [eField, setEField] = useState([1.0, 0.5, 0.2]);

  const matInfo = {
    amorphous: {
      group: "Isotropic — Gases, Liquids & Amorphous Solids (Glass)",
      order: "Zero positional order, zero orientational order (random molecules in space).",
      optical: "Scalar permittivity ε: refractive index n is identical in every direction.",
    },
    poly: {
      group: "Isotropic (Macroscopically) — Polycrystalline Solids",
      order: "Microscopic crystalline grains with random domain orientations.",
      optical: "Anisotropic within each grain, but averages out macroscopically unless grains scatter light.",
    },
    crystal: {
      group: "Anisotropic — Single Crystals (e.g., LiNbO₃, Quartz, Calcite)",
      order: "Strict 3D periodic atomic lattice with directional bond stiffness (d_x ≠ d_y ≠ d_z).",
      optical: "Second-rank tensor ε_ij: refractive index depends on E-field polarization direction.",
    },
    liquidcrystal: {
      group: "Anisotropic — Liquid Crystals (Nematic Rod-Like Molecules)",
      order: "Random molecular positions, but strong long-range orientational alignment.",
      optical: "Strong tunable birefringence controlled by low-voltage electric fields.",
    },
  };

  // Sample 3x3 relative permittivity tensor (general vs diagonalized)
  const tensorGeneral = [
    [4.9, 0.6, 0.2],
    [0.6, 4.2, 0.3],
    [0.2, 0.3, 3.6],
  ];
  const tensorDiag = [
    [5.2, 0.0, 0.0],
    [0.0, 4.0, 0.0],
    [0.0, 0.0, 3.5],
  ];
  const activeMat = diagonalized ? tensorDiag : tensorGeneral;

  // Compute D_i = sum_j eps_ij E_j
  const dVec = [0, 1, 2].map((i) =>
    (
      activeMat[i][0] * eField[0] +
      activeMat[i][1] * eField[1] +
      activeMat[i][2] * eField[2]
    ).toFixed(2)
  );

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.3 — POSITIONAL ORDER &amp; 3×3 PERMITTIVITY TENSOR </div>
      <h2 style={s.SlideHeading}>
        Isotropic vs. Anisotropic Order &amp; Second-Rank Tensor D_i = Σ ε_ij E_j
      </h2>

      {/* Material Order Selector Tabs */}
      <div style={s.TabRow}>
        {[
          { id: "amorphous", label: "1. Amorphous / Liquid (Isotropic)" },
          { id: "poly", label: "2. Polycrystalline Grains" },
          { id: "crystal", label: "3. Periodic Crystal (Anisotropic)" },
          { id: "liquidcrystal", label: "4. Liquid Crystal (Orientational Order)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setMatClass(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: matClass === t.id ? "#2563eb" : "#0f172a",
              color: matClass === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Microstructure Diagram & Order Explanation */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{matInfo[matClass].group}</h3>
          <p style={s.BodyText}>
            <strong>Molecular Order:</strong> {matInfo[matClass].order}
            <br />
            <strong>Optical Consequence:</strong> {matInfo[matClass].optical}
          </p>

          <svg viewBox="0 0 360 115" style={{ width: "100%", height: "110px", background: "#050914", borderRadius: "8px", marginTop: "8px" }}>
            {matClass === "amorphous" &&
              [
                [45, 30], [95, 75], [140, 25], [190, 85], [240, 40], [295, 70], [70, 50], [215, 55], [315, 30],
              ].map(([cx, cy], idx) => (
                <circle key={idx} cx={cx} cy={cy} r="7" fill="#38bdf8" opacity="0.8" />
              ))}

            {matClass === "poly" && (
              <g>
                <polygon points="20,15 130,15 110,95 20,95" fill="none" stroke="#facc15" strokeWidth="2" />
                <line x1="35" y1="30" x2="115" y2="30" stroke="#38bdf8" />
                <line x1="30" y1="55" x2="110" y2="55" stroke="#38bdf8" />
                <polygon points="135,15 245,20 230,95 115,95" fill="none" stroke="#facc15" strokeWidth="2" />
                <line x1="150" y1="25" x2="210" y2="85" stroke="#34d399" />
                <line x1="175" y1="25" x2="230" y2="80" stroke="#34d399" />
                <polygon points="250,20 340,15 340,95 235,95" fill="none" stroke="#facc15" strokeWidth="2" />
                <line x1="265" y1="85" x2="325" y2="25" stroke="#f87171" />
                <text x="125" y="108" fill="#facc15" fontSize="10">Polycrystalline Grain Boundaries</text>
              </g>
            )}

            {matClass === "crystal" && (
              <g>
                {[30, 62, 94].map((y) =>
                  [55, 110, 165, 220, 275].map((x) => (
                    <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#34d399" />
                  ))
                )}
                <text x="55" y="18" fill="#facc15" fontSize="10"> Lattice spacing d_x ≠ d_y → Anisotropic ε_ij</text>
              </g>
            )}

            {matClass === "liquidcrystal" && (
              <g>
                {[30, 60, 90].map((y) =>
                  [60, 125, 190, 255, 310].map((x, idx) => (
                    <ellipse key={`${x}-${y}`} cx={x + (idx % 2) * 6} cy={y} rx="5" ry="13" fill="#38bdf8" />
                  ))
                )}
                <text x="55" y="16" fill="#facc15" fontSize="10">Orientational Order (Aligned Rod Molecules)</text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Interactive 3x3 Tensor Matrix Multiplication & Diagonalization */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#38bdf8" }}>
              P = ε₀ χ E &nbsp;|&nbsp; D_i = Σ_j ε_ij E_j
            </span>
            <button
              onClick={() => setDiagonalized(!diagonalized)}
              style={{
                ...s.ModeToggleBtn,
                backgroundColor: diagonalized ? "#059669" : "#2563eb",
              }}
            >
              {diagonalized ? "✓ Diagonalized (Principal Axes v_i)" : "Diagonalize Matrix → diag(ε₁, ε₂, ε₃)"}
            </button>
          </div>

          {/* Visual 3x3 Matrix Equation [D] = [eps][E] */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "#050914", padding: "12px", borderRadius: "8px", fontFamily: "monospace", fontSize: "13px" }}>
            {/* D Vector */}
            <div style={s.MatrixBracket}>
              <div>D₁ = <span style={{ color: "#34d399" }}>{dVec[0]}</span></div>
              <div>D₂ = <span style={{ color: "#34d399" }}>{dVec[1]}</span></div>
              <div>D₃ = <span style={{ color: "#34d399" }}>{dVec[2]}</span></div>
            </div>
            <span>=</span>
            {/* 3x3 Permittivity Matrix */}
            <div style={s.MatrixBracket}>
              {activeMat.map((row, rIdx) => (
                <div key={rIdx} style={{ display: "flex", gap: "12px" }}>
                  {row.map((val, cIdx) => (
                    <span
                      key={cIdx}
                      style={{
                        color: rIdx === cIdx ? "#facc15" : val === 0 ? "#475569" : "#38bdf8",
                        fontWeight: rIdx === cIdx ? 700 : 400,
                      }}
                    >
                      {val.toFixed(1)}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <span>×</span>
            {/* E Column Vector */}
            <div style={s.MatrixBracket}>
              <div>E₁ = <span style={{ color: "#38bdf8" }}>{eField[0].toFixed(1)}</span></div>
              <div>E₂ = <span style={{ color: "#38bdf8" }}>{eField[1].toFixed(1)}</span></div>
              <div>E₃ = <span style={{ color: "#38bdf8" }}>{eField[2].toFixed(1)}</span></div>
            </div>
          </div>

          <p style={{ fontSize: "12px", color: "#94a3b8", marginTop: "10px", lineHeight: 1.5 }}>
            {diagonalized
              ? "In the Principal Dielectric Axis frame (eigenvectors v_i), off-diagonal terms vanish and D_i = ε_i E_i scales cleanly along each axis!"
              : "In general coordinates, off-diagonal terms (ε₁₂, ε₁₃, ...) couple E₁ into D₂ and D₃, meaning D and E are NOT parallel (E₁ ≠ E₂)."}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 4: Reciprocity & The 4 Fundamental Symmetry Cases of Permittivity Tensor
   (Covers PDF Pages 5 & 6 + Optical Isolator Diagram)
   ============================================================================ */
function Slide4ReciprocityAndFourSymmetryCases() {
  const [caseId, setCaseId] = useState("lossless"); // "lossless" | "lossgain" | "chiral" | "nonreciprocal"

  const cases = {
    lossless: {
      title: "Case 1: Non-Magnetic Material WITHOUT Loss or Gain",
      symmetry: "Symmetric (ε_ij = ε_ji) AND Hermitian (ε_ij = ε_ji*)",
      math: "ε_ij = ε_ij* = ε_ji = ε_ji*  ⇒  All ε_ij are Purely REAL",
      eigenvalues: "Eigenvalues ε_i are REAL | Eigenvectors v_i are REAL (Linear normal modes)",
      reciprocity: "Reciprocal (Case I Source→Detector ≡ Case II Detector←Source)",
      matrixRows: [
        ["4.80", "0.35", "0.00"],
        ["0.35", "4.20", "0.00"],
        ["0.00", "0.00", "3.60"],
      ],
      isReciprocal: true,
    },
    lossgain: {
      title: "Case 2: Non-Magnetic Material WITH Loss or Gain",
      symmetry: "Symmetric (ε_ij = ε_ji) but NOT Hermitian (ε_ij ≠ ε_ji*)",
      math: "ε_ij = ε_ji,  Im(ε_ij) ≠ 0  ⇒  Complex Symmetric Tensor",
      eigenvalues: "Eigenvalues ε_i are COMPLEX (Im part = absorption loss α or laser gain g)",
      reciprocity: "Reciprocal (Symmetric tensor obeys Lorentz reciprocity)",
      matrixRows: [
        ["4.80 + 0.15i", "0.20 + 0.05i", "0.00"],
        ["0.20 + 0.05i", "4.20 + 0.12i", "0.00"],
        ["0.00", "0.00", "3.60 + 0.10i"],
      ],
      isReciprocal: true,
    },
    chiral: {
      title: "Case 3: Non-Magnetic but Optically Active (Chiral) Medium",
      symmetry: "NOT Symmetric (ε_ij ≠ ε_ji), Hermitian if Lossless (ε_ij = ε_ji*)",
      math: "ε_xy = −ε_yx = +i·g  (Antisymmetric imaginary off-diagonal coupling)",
      eigenvalues: "Eigenvalues ε_i: REAL if lossless (COMPLEX if loss/gain) | Eigenvectors: COMPLEX (Circular polarization!)",
      reciprocity: "Reciprocal (Natural optical rotation reverses sign on reflection)",
      matrixRows: [
        ["4.50", "+0.18i", "0.00"],
        ["−0.18i", "4.50", "0.00"],
        ["0.00", "0.00", "4.50"],
      ],
      isReciprocal: true,
    },
    nonreciprocal: {
      title: "Case 4: Non-Reciprocal Media (Magneto-Optic / External B-Field)",
      symmetry: "NOT Symmetric (ε_ij ≠ ε_ji) — Gyrotropic Faraday Effect",
      math: "ε_xy = −ε_yx = +i·ε_g(B₀)  (Breaks Time-Reversal Symmetry)",
      eigenvalues: "Enables Magneto-Optic Devices & Optical Isolators (Blocks backward reflection R_f!)",
      reciprocity: "NON-RECIPROCAL (Forward T_r passes, Backward R_f is blocked ✕)",
      matrixRows: [
        ["4.90", "+i·ε_g(B₀)", "0.00"],
        ["−i·ε_g(B₀)", "4.90", "0.00"],
        ["0.00", "0.00", "4.75"],
      ],
      isReciprocal: false,
    },
  };

  const active = cases[caseId];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.4 — RECIPROCITY &amp; TENSOR SYMMETRY CASES </div>
      <h2 style={s.SlideHeading}>
        Hermiticity, Reciprocity &amp; Magneto-Optic Non-Reciprocal Isolators
      </h2>

      {/* 4 Symmetry Case Tabs */}
      <div style={s.TabRow}>
        {[
          { id: "lossless", label: "1. Lossless Reciprocal (Hermitian)" },
          { id: "lossgain", label: "2. With Loss / Gain (Complex)" },
          { id: "chiral", label: "3. Optically Active (Complex Eigenvectors)" },
          { id: "nonreciprocal", label: "4. Non-Reciprocal (Magneto-Optic Isolator)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setCaseId(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: caseId === t.id ? "#2563eb" : "#0f172a",
              color: caseId === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Detailed Tensor Audit Card */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{active.title}</h3>
          <div style={s.FormulaBox}>{active.math}</div>
          <ul style={s.List}>
            <li>
              <strong>Tensor Symmetry:</strong> {active.symmetry}
            </li>
            <li>
              <strong>Eigenvalues &amp; Eigenvectors:</strong> {active.eigenvalues}
            </li>
            <li>
              <strong>Reciprocity Status:</strong>{" "}
              <span style={{ color: active.isReciprocal ? "#38bdf8" : "#f87171", fontWeight: 700 }}>
                {active.reciprocity}
              </span>
            </li>
          </ul>

          {/* Representative 3x3 Tensor Matrix */}
          <div style={{ marginTop: "12px", background: "#050914", padding: "10px 14px", borderRadius: "8px", fontFamily: "monospace", fontSize: "12.5px" }}>
            <div style={{ color: "#94a3b8", fontSize: "11px", marginBottom: "4px" }}>Representative 3×3 Permittivity Tensor ε:</div>
            {active.matrixRows.map((row, idx) => (
              <div key={idx} style={{ display: "flex", justifyContent: "space-around", color: "#facc15", padding: "2px 0" }}>
                <span>{row[0]}</span>
                <span>{row[1]}</span>
                <span>{row[2]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual Diagram of Reciprocal vs Non-Reciprocal Isolator (Page 5 & 6) */}
        <div style={s.SimBox}>
          <h3 style={s.CardTitle}>
            Visual Ray Test: Reciprocal vs. Non-Reciprocal System
          </h3>
          <svg viewBox="0 0 420 205" style={{ width: "100%", height: "195px", background: "#050914", borderRadius: "8px" }}>
            {/* Top Sketch: Reciprocal System */}
            <text x="20" y="24" fill="#38bdf8" fontSize="11" fontWeight="bold">
              Reciprocal System (ε_ij = ε_ji): Source ⇄ Detector Symmetric
            </text>
            <rect x="150" y="36" width="110" height="44" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="4" />
            <text x="166" y="62" fill="#e2e8f0" fontSize="11">Reciprocal</text>
            {/* Input Ray */}
            <line x1="40" y1="48" x2="150" y2="48" stroke="#34d399" strokeWidth="2.5" />
            <text x="65" y="42" fill="#34d399" fontSize="10">i/p ──►</text>
            {/* Transmitted Ray Tr */}
            <line x1="260" y1="48" x2="375" y2="48" stroke="#34d399" strokeWidth="2.5" />
            <text x="300" y="42" fill="#34d399" fontSize="10">T_r ──►</text>
            {/* Reflected Ray Rf travels back */}
            <line x1="375" y1="68" x2="260" y2="68" stroke="#facc15" strokeWidth="2" />
            <line x1="150" y1="68" x2="40" y2="82" stroke="#facc15" strokeWidth="2" />
            <text x="50" y="96" fill="#facc15" fontSize="10">◄── R_f travels back freely</text>

            {/* Bottom Sketch: Non-Reciprocal Optical Isolator */}
            <text x="20" y="128" fill="#f87171" fontSize="11" fontWeight="bold">
              Non-Reciprocal System (ε_ij ≠ ε_ji): Magneto-Optic Isolator
            </text>
            <rect
              x="150"
              y="140"
              width="110"
              height="46"
              fill={caseId === "nonreciprocal" ? "rgba(220, 38, 38, 0.2)" : "#1e293b"}
              stroke="#f87171"
              strokeWidth="2"
              rx="4"
            />
            <text x="162" y="166" fill="#ffffff" fontSize="11" fontWeight="bold">MO Isolator</text>
            {/* Forward Ray */}
            <line x1="40" y1="152" x2="150" y2="152" stroke="#34d399" strokeWidth="2.5" />
            <line x1="260" y1="152" x2="375" y2="152" stroke="#34d399" strokeWidth="2.5" />
            <text x="300" y="146" fill="#34d399" fontSize="10">T_r Passes ──►</text>
            {/* Backward Ray Blocked with X */}
            <line x1="375" y1="174" x2="260" y2="174" stroke="#f87171" strokeWidth="2.5" />
            <text x="300" y="190" fill="#f87171" fontSize="10">◄── R_f</text>
            <text x="195" y="182" fill="#f87171" fontSize="18" fontWeight="bold">✕</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 5: Principal Refractive Indices, Impermeability Tensor & Index Ellipsoid
   (Covers PDF Pages 7, 8 Top & Page 9 Bottom)
   ============================================================================ */
function Slide5IndexEllipsoidAndCrystals() {
  const [nx, setNx] = useState(1.54);
  const [ny, setNy] = useState(1.54);
  const [nz, setNz] = useState(1.85);

  const applyPreset = (a, b, c) => {
    setNx(a);
    setNy(b);
    setNz(c);
  };

  // Determine crystal class based on nx, ny, nz
  let crystalType = "Biaxial Crystal (n_x ≠ n_y ≠ n_z → 2 Optical Axes)";
  if (Math.abs(nx - ny) < 0.01 && Math.abs(ny - nz) < 0.01) {
    crystalType = "Isotropic Crystal (n_x = n_y = n_z → Sphere)";
  } else if (Math.abs(nx - ny) < 0.01) {
    crystalType =
      nz > nx
        ? "Positive (+ve) Uniaxial Crystal (n_e > n_o, Optic Axis || z)"
        : "Negative (−ve) Uniaxial Crystal (n_e < n_o, Optic Axis || z)";
  }

  const etaX = (1 / (nx * nx)).toFixed(3);
  const etaY = (1 / (ny * ny)).toFixed(3);
  const etaZ = (1 / (nz * nz)).toFixed(3);

  const rxPx = nx * 36;
  const ryPx = nz * 36;

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.5 — INDEX ELLIPSOID &amp; CRYSTAL CLASSIFICATION </div>
      <h2 style={s.SlideHeading}>
        Principal Indices, Impermeability Tensor (η) &amp; The Index Ellipsoid
      </h2>

      {/* Preset Crystal Buttons */}
      <div style={s.TabRow}>
        <button onClick={() => applyPreset(1.50, 1.50, 1.50)} style={{ ...s.TabBtn, backgroundColor: "#0f172a", color: "#cbd5e1" }}>
          Isotropic (n_x = n_y = n_z = 1.50)
        </button>
        <button onClick={() => applyPreset(1.54, 1.54, 1.85)} style={{ ...s.TabBtn, backgroundColor: "#0f172a", color: "#38bdf8" }}>
          +ve Uniaxial (n_e &gt; n_o: Quartz / TiO₂)
        </button>
        <button onClick={() => applyPreset(2.21, 2.21, 2.13)} style={{ ...s.TabBtn, backgroundColor: "#0f172a", color: "#facc15" }}>
          −ve Uniaxial (n_e &lt; n_o: LiNbO₃ / Calcite)
        </button>
        <button onClick={() => applyPreset(1.57, 1.60, 1.82)} style={{ ...s.TabBtn, backgroundColor: "#0f172a", color: "#34d399" }}>
          Biaxial (n_x ≠ n_y ≠ n_z: KTP / LBO)
        </button>
      </div>

      <div style={s.Grid2}>
        {/* Left: Mathematical Derivation from Pages 7 & 8 */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Principal Indices &amp; Impermeability Tensor η</h3>
          <div style={s.FormulaBox}>
            n_x = √(ε_x/ε₀), &nbsp; n_y = √(ε_y/ε₀), &nbsp; n_z = √(ε_z/ε₀), &nbsp; c_i = c₀ / n_i
            <br />
            η = [η_ij] = (ε / ε₀)⁻¹ &nbsp;⇒&nbsp; η_x = 1/n_x², &nbsp; η_y = 1/n_y², &nbsp; η_z = 1/n_z²
          </div>
          <div style={s.FormulaBox}>
            General: η₁₁x₁² + η₂₂x₂² + η₃₃x₃² + 2η₂₃x₂x₃ + 2η₃₁x₃x₁ + 2η₁₂x₁x₂ = 1
            <br />
            Principal Axes: (x² / n_x²) + (y² / n_y²) + (z² / n_z²) = 1
          </div>
          <ul style={s.List}>
            <li>
              <strong>Optical Axis (Page 9):</strong> Unique direction along which light propagates with a refractive index independent of polarization (<a href="https://www.rp-photonics.com/birefringence.html" target="_blank" rel="noreferrer" style={s.Link}>RP Photonics: Birefringence</a>).
            </li>
            <li>
              <strong>Uniaxial:</strong> 1 distinct axis (<code style={s.Code}>n_x = n_y = n_o, n_z = n_e</code>).
            </li>
            <li>
              <strong>Biaxial:</strong> 3 distinct indices (<code style={s.Code}>n_x ≠ n_y ≠ n_z</code>) ⇒ <strong>2 Optical Axes</strong>.
            </li>
          </ul>
        </div>

        {/* Right: Interactive 3D Index Ellipsoid Visualizer */}
        <div style={s.SimBox}>
          <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#facc15", marginBottom: "8px" }}>
            {crystalType}
          </div>

          <svg viewBox="0 0 400 185" style={{ width: "100%", height: "170px", background: "#050914", borderRadius: "8px" }}>
            {/* Axes */}
            <line x1="200" y1="170" x2="200" y2="12" stroke="#475569" strokeWidth="1.5" />
            <text x="206" y="22" fill="#facc15" fontSize="11" fontWeight="bold">z (n_z = {nz.toFixed(2)})</text>
            <line x1="50" y1="95" x2="350" y2="95" stroke="#475569" strokeWidth="1.5" />
            <text x="315" y="88" fill="#38bdf8" fontSize="11" fontWeight="bold">y (n_y = {ny.toFixed(2)})</text>
            <line x1="120" y1="150" x2="280" y2="40" stroke="#475569" strokeWidth="1.5" />
            <text x="90" y="162" fill="#34d399" fontSize="11" fontWeight="bold">x (n_x = {nx.toFixed(2)})</text>

            {/* Outer Ellipsoid Boundary */}
            <ellipse
              cx="200"
              cy="95"
              rx={rxPx}
              ry={ryPx}
              fill="rgba(37, 99, 235, 0.2)"
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            {/* Equatorial Cross Section */}
            <ellipse
              cx="200"
              cy="95"
              rx={rxPx}
              ry={ny * 16}
              fill="none"
              stroke="#facc15"
              strokeWidth="1.8"
              strokeDasharray="4,4"
            />
          </svg>

          <div style={s.ControlsGrid}>
            <div>
              <label style={s.Label}>n_x = {nx.toFixed(2)} (η_x={etaX})</label>
              <input type="range" min="1.3" max="2.4" step="0.02" value={nx} onChange={(e) => setNx(parseFloat(e.target.value))} style={s.Slider} />
            </div>
            <div>
              <label style={s.Label}>n_y = {ny.toFixed(2)} (η_y={etaY})</label>
              <input type="range" min="1.3" max="2.4" step="0.02" value={ny} onChange={(e) => setNy(parseFloat(e.target.value))} style={s.Slider} />
            </div>
            <div>
              <label style={s.Label}>n_z = {nz.toFixed(2)} (η_z={etaZ})</label>
              <input type="range" min="1.3" max="2.4" step="0.02" value={nz} onChange={(e) => setNz(parseFloat(e.target.value))} style={s.Slider} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 6: Normal Modes, Periodic Polarization Evolution & Wave Plates (λ/4, λ/2)
   (Covers PDF Page 8 Bottom & Page 9 Top)
   ============================================================================ */
function Slide6NormalModesAndWaveplates() {
  const [deltaPhiDeg, setDeltaPhiDeg] = useState(90); // Phase retardation ϕ in degrees (0 to 360)
  const [birefDeltaN, setBirefDeltaN] = useState(0.08); // |n_y - n_x|
  const wavelengthUm = 1.55; // 1550 nm in μm

  // Thickness d for current phase retardation: ϕ = 2π |n_y - n_x| d / λ
  const currentThicknessUm = ((deltaPhiDeg / 360) * (wavelengthUm / birefDeltaN)).toFixed(2);
  const qwpLengthUm = (0.25 * (wavelengthUm / birefDeltaN)).toFixed(2);
  const hwpLengthUm = (0.5 * (wavelengthUm / birefDeltaN)).toFixed(2);
  const beatPeriodUm = (wavelengthUm / birefDeltaN).toFixed(2);

  // Build polarization trajectory curve (Ex = cos(t), Ey = cos(t + deltaPhi))
  const buildPolarizationCurve = (phiDeg, cx, cy, radius) => {
    const phiRad = (phiDeg * Math.PI) / 180;
    const pts = [];
    for (let t = 0; t <= Math.PI * 2.05; t += 0.1) {
      const px = cx + radius * Math.cos(t);
      const py = cy - radius * Math.cos(t + phiRad);
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.6 — NORMAL MODES &amp; WAVE PLATES </div>
      <h2 style={s.SlideHeading}>
        Periodic Polarization Evolution, Quarter-Wave (λ/4) &amp; Half-Wave (λ/2) Plates
      </h2>

      <div style={s.Grid2}>
        {/* Left: Normal Mode Equations & Waveplate Formulas */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>1. Normal Mode Superposition &amp; Beat Period</h3>
          <div style={s.FormulaBox}>
            E(z,t) = [ x̂ E_x + ŷ E_y exp(i(k^y − k^x)z) ] exp(i(k^x z − ωt))
            <br />
            Phase Retardation: ϕ = (k^y − k^x)d = 2π |n_y − n_x| d / λ
          </div>
          <ul style={s.List}>
            <li>
              <strong>If E_x = 0 or E_y = 0:</strong> Wave remains purely linear (normal mode).
            </li>
            <li>
              <strong>Special Case (θ = 45°, E_x = E_y):</strong> Polarization state evolves periodically with beat period{" "}
              <code style={s.Code}>Λ_b = 2π/|k^y − k^x| = λ/|n_y − n_x| = {beatPeriodUm} μm</code>.
            </li>
            <li>
              <strong>Quarter-Wave Plate (λ/4):</strong>{" "}
              <code style={s.Code}>l_(λ/4) = λ / (4|n_y − n_x|) = {qwpLengthUm} μm</code> (Linear 45° → Circular).
            </li>
            <li>
              <strong>Half-Wave Plate (λ/2):</strong>{" "}
              <code style={s.Code}>l_(λ/2) = λ / (2|n_y − n_x|) = {hwpLengthUm} μm</code> (Rotates linear θ → −θ, a 2θ rotation).
            </li>
          </ul>
        </div>

        {/* Right: Interactive Polarization Evolution Visualizer (Recreates Page 8 & 9 Diagrams) */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "10px" }}>
            <button onClick={() => setDeltaPhiDeg(0)} style={s.ModeToggleBtn}>0° (Linear +45°)</button>
            <button onClick={() => setDeltaPhiDeg(90)} style={{ ...s.ModeToggleBtn, backgroundColor: "#059669" }}>
              90° (λ/4 Plate → Circular)
            </button>
            <button onClick={() => setDeltaPhiDeg(180)} style={{ ...s.ModeToggleBtn, backgroundColor: "#d97706" }}>
              180° (λ/2 Plate → Linear −45°)
            </button>
            <button onClick={() => setDeltaPhiDeg(270)} style={s.ModeToggleBtn}>270° (Circular)</button>
          </div>

          <svg viewBox="0 0 420 150" style={{ width: "100%", height: "145px", background: "#050914", borderRadius: "8px" }}>
            {/* 5 Evolution Stages Across z (Page 9 Top Diagram) */}
            {[
              { deg: 0, label: "z=0 (Linear 45°)", cx: 48 },
              { deg: 45, label: "Elliptical", cx: 124 },
              { deg: 90, label: "λ/4 (Circular)", cx: 200 },
              { deg: 135, label: "Elliptical", cx: 276 },
              { deg: 180, label: "λ/2 (Linear −45°)", cx: 355 },
            ].map((st) => (
              <g key={st.deg}>
                <line x1={st.cx - 28} y1="60" x2={st.cx + 28} y2="60" stroke="#334155" />
                <line x1={st.cx} y1="32" x2={st.cx} y2="88" stroke="#334155" />
                <path d={buildPolarizationCurve(st.deg, st.cx, 60, 22)} fill="none" stroke="#38bdf8" strokeWidth="2" />
                <text x={st.cx - 30} y="106" fill="#94a3b8" fontSize="9.5">{st.label}</text>
              </g>
            ))}

            {/* Active User-Selected State Banner */}
            <text x="20" y="136" fill="#facc15" fontSize="11.5" fontWeight="bold">
              Active Retardation ϕ = {deltaPhiDeg}° | Crystal Thickness d = {currentThicknessUm} μm (at λ = 1550 nm)
            </text>
          </svg>

          <div style={s.ControlsGrid}>
            <div>
              <label style={s.Label}>Phase Retardation (ϕ): <strong>{deltaPhiDeg}°</strong></label>
              <input type="range" min="0" max="360" step="15" value={deltaPhiDeg} onChange={(e) => setDeltaPhiDeg(Number(e.target.value))} style={s.Slider} />
            </div>
            <div>
              <label style={s.Label}>Birefringence |n_y − n_x|: <strong>{birefDeltaN.toFixed(2)}</strong></label>
              <input type="range" min="0.01" max="0.25" step="0.01" value={birefDeltaN} onChange={(e) => setBirefDeltaN(parseFloat(e.target.value))} style={s.Slider} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 7: Authoritative Web References & Interactive Mastery Quiz
   ============================================================================ */
function Slide7WebReferencesAndMasteryQuiz() {
  const [revealQuiz, setRevealQuiz] = useState(false);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 1.7 — WEB REFERENCES &amp; NUMERICAL MASTERY CHECK</div>
      <h2 style={s.SlideHeading}>
        Verified Web Literature &amp; Chapter 1 Self-Assessment
      </h2>

      <div style={s.Grid2}>
        {/* Left: Authoritative Web Theory Synthesis */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Curated Photonics Encyclopedia References</h3>
          <ul style={s.List}>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/group_velocity.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics — Group Velocity &amp; Envelope Propagation
              </a>
              : Explains why pulse envelopes propagate at <code style={s.Code}>v_g = (∂k/∂ω)⁻¹</code> and why <code style={s.Code}>v_g</code> differs from <code style={s.Code}>v_p</code> in dispersive media.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/group_index.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics — Group Index (n_g)
              </a>
              : Details <code style={s.Code}>n_g = n − λ(dn/dλ)</code> and its role in calculating ultrashort pulse delays and resonator Free Spectral Range (FSR).
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/group_velocity_dispersion.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics — Group Velocity Dispersion (GVD)
              </a>
              : Connects <code style={s.Code}>β₂ = d²k/dω²</code> (in s²/m) to telecom chromatic dispersion <code style={s.Code}>D_λ</code> (in ps/(nm·km)), noting silica's zero-dispersion wavelength near 1.3 μm.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a href="https://www.rp-photonics.com/birefringence.html" target="_blank" rel="noreferrer" style={s.Link}>
                RP Photonics — Birefringence &amp; Uniaxial/Biaxial Crystals
              </a>
              : Covers ordinary (<code style={s.Code}>n_o</code>) vs. extraordinary (<code style={s.Code}>n_e</code>) indices, index ellipsoids, and phase retardation plates.
            </li>
          </ul>
        </div>

        {/* Right: Interactive Numerical & Conceptual Mastery Quiz */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Chapter 1 Numerical &amp; Conceptual Quiz</h3>
          <ol style={{ ...s.List, marginBottom: "12px" }}>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q1 (Dispersion):</strong> A 10 km fiber has <code style={s.Code}>D_λ = 17 ps/(km·nm)</code>. What is the pulse broadening <code style={s.Code}>Δτ</code> for a laser source with spectral width <code style={s.Code}>Δλ = 2 nm</code>?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q2 (Permittivity Tensor):</strong> How do the eigenvalues <code style={s.Code}>ε_i</code> and eigenvectors <code style={s.Code}>v_i</code> behave in a lossless optically active (chiral) medium?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q3 (Waveplates):</strong> For <code style={s.Code}>λ = 1.55 μm</code> and <code style={s.Code}>|n_y − n_x| = 0.05</code>, what is the minimum Quarter-Wave Plate thickness <code style={s.Code}>l_(λ/4)</code>?
            </li>
          </ol>

          <button onClick={() => setRevealQuiz(!revealQuiz)} style={s.ModeToggleBtn}>
            {revealQuiz ? "Hide Worked Solutions" : "Reveal Worked Solutions"}
          </button>

          {revealQuiz && (
            <div style={{ marginTop: "10px", padding: "10px", background: "#060a17", borderRadius: "8px", fontSize: "12px", color: "#cbd5e1", lineHeight: 1.55 }}>
              <div>• <strong>A1:</strong> <code style={s.Code}>Δτ = L · D_λ · Δλ = 10 × 17 × 2 = 340 ps</code>.</div>
              <div>• <strong>A2:</strong> Because it is lossless, the eigenvalues <code style={s.Code}>ε_i</code> are <strong>real</strong>, while the eigenvectors are <strong>complex</strong> (circularly polarized modes).</div>
              <div>• <strong>A3:</strong> <code style={s.Code}>l_(λ/4) = λ / (4|n_y − n_x|) = 1.55 / (4 × 0.05) = 7.75 μm</code>.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GroupPhaseVelocityAndAnisotropySection() {
  return (
    <Slideshow
      slides={[
        Slide1PhaseVsGroupVelocity,
        Slide2GVDAndChromaticBroadening,
        Slide3IsotropicAnisotropicAndTensor,
        Slide4ReciprocityAndFourSymmetryCases,
        Slide5IndexEllipsoidAndCrystals,
        Slide6NormalModesAndWaveplates,
        Slide7WebReferencesAndMasteryQuiz,
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
    fontSize: "26px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "12px",
  },
  BodyText: {
    fontSize: "13.5px",
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
    fontSize: "14.5px",
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
    fontSize: "13px",
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
  MatrixBracket: {
    borderLeft: "2px solid #94a3b8",
    borderRight: "2px solid #94a3b8",
    padding: "6px 12px",
    borderRadius: "4px",
    lineHeight: 1.65,
  },
};