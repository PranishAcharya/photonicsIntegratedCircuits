import React, { useState } from "react";
import Slideshow from "../components/Slideshow";

export const title = "0. Basic Concept of Photonic Integrated Circuit";

/* ============================================================================
   SLIDE 1: 1D vs 2D Optical Confinement (Page 1 Top)
   ============================================================================ */
function Slide1Confinement() {
  const [geom, setGeom] = useState("channel"); // "slab" | "fiber" | "channel"
  const [indexContrast, setIndexContrast] = useState(2.0);

  const configs = {
    slab: {
      badge: "1-D Optical Confinement",
      name: "Slab Waveguide — n(x)",
      confinedAxes: "Confined in x (Vertical) | Free to spread in y (Horizontal)",
      desc: "A planar core layer sandwiched between upper and lower cladding layers. Light is trapped vertically along the x-axis by Total Internal Reflection, but spreads out freely along the y-axis while propagating along z.",
      math: "n(x) = n_core (|x| ≤ d/2),  n_clad (|x| > d/2)",
    },
    fiber: {
      badge: "2-D Cylindrical Confinement",
      name: "Optical Fibre — n(x, y)",
      confinedAxes: "Confined radially in both x and y | Propagates along z",
      desc: "A cylindrical glass core surrounded by a lower-index cladding. Light is confined in two transverse dimensions (x and y) over long distances, forming the macroscopic analogy for on-chip waveguides.",
      math: "n(r) = n_core (r ≤ a),  n_clad (r > a)",
    },
    channel: {
      badge: "2-D On-Chip Confinement",
      name: "Channel Waveguide — n(x, y)",
      confinedAxes: "Confined in both x (Height) and y (Width) on a planar wafer",
      desc: "The fundamental building block of a Photonic Integrated Circuit (PIC). By etching a rectangular high-index core strip surrounded by cladding on all four sides, photons stay tightly guided in both x and y across millimeter-scale chips.",
      math: "n(x, y) = n_core inside W × H core,  n_clad outside",
    },
  };

  const active = configs[geom];
  const spreadFactor = Math.max(14, 46 - indexContrast * 14);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.1 — FUNDAMENTAL PRINCIPLE</div>
      <h1 style={s.SlideHeading}>
        The Core Concept of a PIC: Confinement of Light
      </h1>
      <p style={{ ...s.Subtitle, marginBottom: "18px" }}>
        Just like an optical fiber traps light inside a glass core, a{" "}
        <strong style={{ color: "#fff" }}>Photonic Integrated Circuit (PIC)</strong>{" "}
        traps and routes light on a chip using a higher-refractive-index core (
        <code style={s.Code}>n_core &gt; n_clad</code>). Select a geometry below
        to compare 1-D and 2-D confinement:
      </p>

      {/* Interactive Geometry Selector Tabs */}
      <div style={s.TabRow}>
        {[
          { id: "slab", label: "1. Slab Waveguide (1-D)" },
          { id: "fiber", label: "2. Optical Fibre (2-D)" },
          { id: "channel", label: "3. Channel Waveguide (2-D PIC)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setGeom(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: geom === t.id ? "#2563eb" : "#0f172a",
              borderColor: geom === t.id ? "#3b82f6" : "#1e293b",
              color: geom === t.id ? "#ffffff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Interactive 3D & Cross-Section Visualizer */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#38bdf8" }}>
              {active.badge}
            </span>
            <span style={{ fontSize: "12px", color: "#facc15", fontFamily: "monospace" }}>
              Δn = {indexContrast.toFixed(1)}
            </span>
          </div>

          <svg
            viewBox="0 0 460 210"
            style={{ width: "100%", height: "195px", background: "#050914", borderRadius: "10px" }}
          >
            {/* Coordinate Axes x (up), y (right), z (depth) */}
            <line x1="35" y1="175" x2="35" y2="35" stroke="#64748b" strokeWidth="2" />
            <text x="28" y="28" fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
            <line x1="35" y1="175" x2="175" y2="175" stroke="#64748b" strokeWidth="2" />
            <text x="182" y="179" fill="#94a3b8" fontSize="12" fontWeight="bold">y</text>
            <line x1="35" y1="175" x2="85" y2="135" stroke="#64748b" strokeWidth="2" />
            <text x="90" y="132" fill="#94a3b8" fontSize="12" fontWeight="bold">z (Propagation ↗)</text>

            {geom === "slab" && (
              <g>
                {/* Bottom Cladding */}
                <rect x="110" y="125" width="260" height="35" fill="#1e293b" stroke="#475569" />
                <text x="120" y="147" fill="#94a3b8" fontSize="11">Cladding (n₂)</text>
                {/* Core Layer */}
                <rect x="110" y="85" width="260" height="40" fill="rgba(37, 99, 235, 0.28)" stroke="#38bdf8" strokeWidth="2" />
                <text x="120" y="109" fill="#38bdf8" fontSize="12" fontWeight="bold">Core n(x) — 1D Trapped</text>
                {/* Top Cladding */}
                <rect x="110" y="50" width="260" height="35" fill="#1e293b" stroke="#475569" />
                <text x="120" y="72" fill="#94a3b8" fontSize="11">Cladding (n₂)</text>
                {/* Unconfined wide optical sheet in y */}
                <ellipse cx="285" cy="105" rx="75" ry={spreadFactor * 0.55} fill="rgba(250, 204, 21, 0.35)" />
                <text x="225" y="38" fill="#facc15" fontSize="11">Spreads laterally in y ↔</text>
              </g>
            )}

            {geom === "fiber" && (
              <g>
                {/* 3D Cylinder perspective */}
                <line x1="200" y1="60" x2="320" y2="25" stroke="#475569" strokeWidth="2" />
                <line x1="200" y1="160" x2="320" y2="125" stroke="#475569" strokeWidth="2" />
                <ellipse cx="320" cy="75" rx="35" ry="50" fill="#0f172a" stroke="#475569" strokeWidth="2" />
                {/* Front Face Cladding */}
                <circle cx="200" cy="110" r="50" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                {/* Core */}
                <circle cx="200" cy="110" r="22" fill="rgba(37, 99, 235, 0.35)" stroke="#38bdf8" strokeWidth="2" />
                {/* Guided Mode Spot */}
                <circle cx="200" cy="110" r={spreadFactor * 0.65} fill="rgba(250, 204, 21, 0.55)" />
                <text x="265" y="160" fill="#38bdf8" fontSize="12" fontWeight="bold">2D Radial Confinement n(x,y)</text>
              </g>
            )}

            {geom === "channel" && (
              <g>
                {/* Outer Cladding Box */}
                <rect x="125" y="45" width="230" height="120" rx="6" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                <text x="138" y="65" fill="#94a3b8" fontSize="11">Cladding (SiO₂)</text>
                {/* Rectangular Embedded Core */}
                <rect x="195" y="82" width="90" height="46" rx="4" fill="rgba(37, 99, 235, 0.35)" stroke="#38bdf8" strokeWidth="2.5" />
                {/* 2D Confined Optical Mode Spot */}
                <ellipse cx="240" cy="105" rx={spreadFactor * 1.1} ry={spreadFactor * 0.65} fill="rgba(250, 204, 21, 0.65)" />
                <text x="223" y="109" fill="#050914" fontSize="11" fontWeight="bold">Core</text>
                <text x="155" y="188" fill="#facc15" fontSize="11" fontWeight="bold">
                  Confined in both x & y → Channel Waveguide
                </text>
              </g>
            )}
          </svg>

          <div style={{ marginTop: "10px" }}>
            <label style={s.Label}>
              Refractive Index Contrast (Δn): <strong>{indexContrast.toFixed(1)}</strong> — Higher Δn shrinks mode size!
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

        {/* Right: Concept Breakdown Card */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{active.name}</h3>
          <div style={s.FormulaBox}>{active.math}</div>
          <p style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: 1.6, marginBottom: "14px" }}>
            {active.desc}
          </p>
          <div style={{ padding: "12px", background: "#060a17", borderRadius: "8px", borderLeft: "3px solid #facc15" }}>
            <div style={{ fontSize: "11px", color: "#facc15", fontWeight: 700, textTransform: "uppercase" }}>
              Transverse Confinement Status
            </div>
            <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>
              {active.confinedAxes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 2: Optical System Evolution & PIC Features (Page 1 Bottom & Page 2 Top)
   ============================================================================ */
function Slide2EvolutionAndFeatures() {
  const [selectedEra, setSelectedEra] = useState("integrated");
  const [modularChips, setModularChips] = useState({ sensor: true, electronic: true });

  const eras = {
    conventional: {
      title: "Conventional Bulk Optics",
      alignment: "Necessary (6-axis manual mounts)",
      propagation: "Free-space optical beam",
      size: "m² (Optical table scale)",
      components: "Mirrors, prisms, bulk glass lenses",
      color: "#f87171",
    },
    micro: {
      title: "Micro-Optics",
      alignment: "Necessary (Active micro-positioning)",
      propagation: "Free-space micro-beam",
      size: "cm² (Benchtop module scale)",
      components: "LEDs, laser diodes, micro-lenses, optical fibre",
      color: "#fbbf24",
    },
    integrated: {
      title: "Integrated Photonics (PIC)",
      alignment: "Unnecessary (Lithographically fixed on wafer!)",
      propagation: "Guided Waveguide Mode",
      size: "mm² (Microchip scale)",
      components: "Single-mode channel waveguides, on-chip LEDs, modulators",
      color: "#34d399",
    },
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.2 — SYSTEM EVOLUTION & FEATURES</div>
      <h2 style={s.SlideHeading}>
        Evolution of Optical Systems & Why Integrated Photonics Wins
      </h2>

      {/* Evolution Comparison Table from Page 1 */}
      <div style={{ overflowX: "auto", marginBottom: "18px" }}>
        <table style={s.Table}>
          <thead>
            <tr>
              <th style={s.Th}>Technology Parameter</th>
              <th
                onClick={() => setSelectedEra("conventional")}
                style={{ ...s.Th, cursor: "pointer", color: selectedEra === "conventional" ? "#f87171" : "#94a3b8" }}
              >
                1. Conventional 👆
              </th>
              <th
                onClick={() => setSelectedEra("micro")}
                style={{ ...s.Th, cursor: "pointer", color: selectedEra === "micro" ? "#fbbf24" : "#94a3b8" }}
              >
                2. Micro-Optics 👆
              </th>
              <th
                onClick={() => setSelectedEra("integrated")}
                style={{ ...s.Th, cursor: "pointer", color: selectedEra === "integrated" ? "#34d399" : "#38bdf8" }}
              >
                3. Integrated Photonics 👆
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={s.TdBold}>Alignment</td>
              <td style={s.Td}>Necessary</td>
              <td style={s.Td}>Necessary</td>
              <td style={{ ...s.Td, color: "#34d399", fontWeight: 700 }}>Unnecessary (Zero alignment!)</td>
            </tr>
            <tr>
              <td style={s.TdBold}>Propagation</td>
              <td style={s.Td}>Free-space beam</td>
              <td style={s.Td}>Free-space beam</td>
              <td style={{ ...s.Td, color: "#38bdf8", fontWeight: 700 }}>Waveguide</td>
            </tr>
            <tr>
              <td style={s.TdBold}>Device Size</td>
              <td style={s.Td}>m² (Tabletop)</td>
              <td style={s.Td}>cm² (Module)</td>
              <td style={{ ...s.Td, color: "#facc15", fontWeight: 700 }}>mm² (Chip scale)</td>
            </tr>
            <tr>
              <td style={s.TdBold}>Components</td>
              <td style={s.Td}>Mirror, prism, lens</td>
              <td style={s.Td}>LED, laser diodes, lenses, optical fibre</td>
              <td style={{ ...s.Td, color: "#e2e8f0", fontWeight: 600 }}>Single-mode channel waveguide, LEDs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={s.Grid2}>
        {/* Left: 10 Key Features from Page 2 */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>10 Core Features of Integrated Photonics</h3>
          <ul style={{ ...s.List, columns: 2, columnGap: "20px", fontSize: "13px" }}>
            <li>Electromagnetic optics foundation</li>
            <li>Permanent stable alignment</li>
            <li>Precise control of guided modes</li>
            <li>Low-voltage light control</li>
            <li>High-speed GHz operation</li>
            <li>Strong light-matter interaction</li>
            <li>High optical power density (nonlinear optics)</li>
            <li>Ultra-compact circuit footprint</li>
            <li>High-volume CMOS manufacturing</li>
            <li>Wafer/chip-scale modular integration</li>
          </ul>
        </div>

        {/* Right: Interactive Wafer-Scale Modular Integration Visualizer */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Interactive Chip-Scale Modular Integration</h3>
          <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "10px" }}>
            Toggle co-packaged subsystems on the silicon wafer below:
          </p>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            <button
              onClick={() => setModularChips((p) => ({ ...p, sensor: !p.sensor }))}
              style={{
                ...s.ModeToggleBtn,
                backgroundColor: modularChips.sensor ? "#059669" : "#1e293b",
              }}
            >
              {modularChips.sensor ? "✓ Sensor Chip Integrated" : "+ Add Sensor Chip"}
            </button>
            <button
              onClick={() => setModularChips((p) => ({ ...p, electronic: !p.electronic }))}
              style={{
                ...s.ModeToggleBtn,
                backgroundColor: modularChips.electronic ? "#2563eb" : "#1e293b",
              }}
            >
              {modularChips.electronic ? "✓ Electronic IC Integrated" : "+ Add Electronic IC"}
            </button>
          </div>

          <div
            style={{
              background: "#050914",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              padding: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              minHeight: "74px",
            }}
          >
            <div style={{ padding: "8px 12px", background: "#1e1b4b", border: "2px solid #38bdf8", borderRadius: "6px", fontSize: "12px", fontWeight: 700, color: "#38bdf8" }}>
              Photonic Chip (Core PIC)
            </div>
            {modularChips.sensor && (
              <div style={{ padding: "8px 12px", background: "#064e3b", border: "2px solid #34d399", borderRadius: "6px", fontSize: "12px", fontWeight: 700, color: "#6ee7b7" }}>
                ⇄ Sensor Chip (Bio/Chem)
              </div>
            )}
            {modularChips.electronic && (
              <div style={{ padding: "8px 12px", background: "#172554", border: "2px solid #60a5fa", borderRadius: "6px", fontSize: "12px", fontWeight: 700, color: "#93c5fd" }}>
                ⇄ Electronic Driver IC
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 3: Waveguide Components — Power Handling (Page 2 Bottom & Page 3 Top)
   ============================================================================ */
function Slide3PowerHandling() {
  const [compType, setCompType] = useState("coupler"); // "interconnect" | "splitter" | "reflector" | "coupler"
  const [couplingLen, setCouplingLen] = useState(50); // 0 to 100% power transfer
  const [splitterMode, setSplitterMode] = useState("ybranch"); // "ybranch" | "mmi"

  // Directional coupler power calculation
  const rad = (couplingLen / 100) * (Math.PI / 2);
  const powerC = Math.round(Math.cos(rad) ** 2 * 100);
  const powerD = Math.round(Math.sin(rad) ** 2 * 100);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.3 — WAVEGUIDE COMPONENTS: POWER HANDLING</div>
      <h2 style={s.SlideHeading}>
        Routing, Splitting, Reflecting & Coupling Optical Power
      </h2>

      {/* Component Selector */}
      <div style={s.TabRow}>
        {[
          { id: "interconnect", label: "1. Interconnect (Straight & S-Bend)" },
          { id: "splitter", label: "2. 1×2 Power Splitter (Y-Branch & MMI)" },
          { id: "reflector", label: "3. Reflector (Mirror & Grating)" },
          { id: "coupler", label: "4. Directional Coupler (Interactive)" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setCompType(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: compType === t.id ? "#2563eb" : "#0f172a",
              borderColor: compType === t.id ? "#3b82f6" : "#1e293b",
              color: compType === t.id ? "#ffffff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.SimBox}>
        {compType === "interconnect" && (
          <div style={s.Grid2}>
            <div>
              <h3 style={s.CardTitle}>Optical Interconnects (Straight & S-Bend)</h3>
              <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
                Guides light from point A to point B on the chip. While a{" "}
                <strong style={{ color: "#fff" }}>Straight Waveguide</strong> connects inline blocks, an{" "}
                <strong style={{ color: "#38bdf8" }}>S-Bend Waveguide</strong> smoothly offsets the optical path laterally without abrupt corners that would radiate light.
              </p>
              <div style={s.FormulaBox}>
                Block Symbol: Input ──► [ Interconnect ] ──► Output
              </div>
            </div>
            <svg viewBox="0 0 420 175" style={{ width: "100%", height: "165px", background: "#050914", borderRadius: "8px" }}>
              <text x="20" y="28" fill="#94a3b8" fontSize="11" fontWeight="bold">Straight Waveguide:</text>
              <line x1="20" y1="50" x2="390" y2="50" stroke="#38bdf8" strokeWidth="6" />
              <text x="20" y="102" fill="#94a3b8" fontSize="11" fontWeight="bold">S-Bend Waveguide (Adiabatic Lateral Offset):</text>
              <path d="M 20,145 C 180,145 220,105 390,105" fill="none" stroke="#facc15" strokeWidth="6" />
            </svg>
          </div>
        )}

        {compType === "splitter" && (
          <div style={s.Grid2}>
            <div>
              <h3 style={s.CardTitle}>1×2 Power Splitter (50:50 Beam Splitter)</h3>
              <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
                Divides input optical power equally (50:50) into two output channels using either a{" "}
                <strong style={{ color: "#38bdf8" }}>Y-Branch</strong> junction or a compact{" "}
                <strong style={{ color: "#facc15" }}>Multi-Mode Interference (MMI)</strong> self-imaging coupler.
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setSplitterMode("ybranch")} style={{ ...s.ModeToggleBtn, backgroundColor: splitterMode === "ybranch" ? "#2563eb" : "#1e293b" }}>
                  Show Y-Branch
                </button>
                <button onClick={() => setSplitterMode("mmi")} style={{ ...s.ModeToggleBtn, backgroundColor: splitterMode === "mmi" ? "#2563eb" : "#1e293b" }}>
                  Show MMI Coupler
                </button>
              </div>
            </div>
            <svg viewBox="0 0 420 175" style={{ width: "100%", height: "165px", background: "#050914", borderRadius: "8px" }}>
              {splitterMode === "ybranch" ? (
                <g>
                  <text x="20" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold">Y-Branch 1×2 Splitter (50:50)</text>
                  <line x1="30" y1="90" x2="180" y2="90" stroke="#38bdf8" strokeWidth="6" />
                  <path d="M 180,90 C 240,90 270,50 370,50" fill="none" stroke="#38bdf8" strokeWidth="5" />
                  <path d="M 180,90 C 240,90 270,130 370,130" fill="none" stroke="#38bdf8" strokeWidth="5" />
                  <text x="375" y="54" fill="#facc15" fontSize="11">50%</text>
                  <text x="375" y="134" fill="#facc15" fontSize="11">50%</text>
                </g>
              ) : (
                <g>
                  <text x="20" y="25" fill="#facc15" fontSize="12" fontWeight="bold">MMI (Multi-Mode Interference) 1×2 Coupler</text>
                  <line x1="30" y1="90" x2="140" y2="90" stroke="#38bdf8" strokeWidth="6" />
                  <rect x="140" y="55" width="130" height="70" fill="rgba(37, 99, 235, 0.25)" stroke="#facc15" strokeWidth="2.5" rx="4" />
                  <text x="188" y="95" fill="#ffffff" fontSize="13" fontWeight="bold">MMI</text>
                  <line x1="270" y1="70" x2="370" y2="70" stroke="#38bdf8" strokeWidth="5" />
                  <line x1="270" y1="110" x2="370" y2="110" stroke="#38bdf8" strokeWidth="5" />
                  <text x="375" y="74" fill="#facc15" fontSize="11">50%</text>
                  <text x="375" y="114" fill="#facc15" fontSize="11">50%</text>
                </g>
              )}
            </svg>
          </div>
        )}

        {compType === "reflector" && (
          <div style={s.Grid2}>
            <div>
              <h3 style={s.CardTitle}>Waveguide Reflector (Facet Mirror vs. Bragg Grating)</h3>
              <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
                Reflects guided light back into the input waveguide either across all wavelengths using a coated{" "}
                <strong style={{ color: "#fff" }}>End-Facet Mirror</strong>, or selectively at a target Bragg wavelength (<code style={s.Code}>λ_B = 2 n_eff Λ</code>) using periodic etched grooves (<strong style={{ color: "#facc15" }}>Bragg Grating</strong>).
              </p>
              <div style={s.FormulaBox}>
                Bragg Condition: λ_Bragg = 2 · n_eff · Λ (Grating Period)
              </div>
            </div>
            <svg viewBox="0 0 420 175" style={{ width: "100%", height: "165px", background: "#050914", borderRadius: "8px" }}>
              <text x="20" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">1. Broadband End Mirror:</text>
              <line x1="40" y1="50" x2="340" y2="50" stroke="#38bdf8" strokeWidth="6" />
              <line x1="340" y1="32" x2="340" y2="68" stroke="#facc15" strokeWidth="5" />
              <text x="348" y="54" fill="#facc15" fontSize="11">Mirror</text>

              <text x="20" y="100" fill="#94a3b8" fontSize="11" fontWeight="bold">2. Wavelength-Selective Bragg Grating:</text>
              <line x1="40" y1="130" x2="170" y2="130" stroke="#38bdf8" strokeWidth="6" />
              {[185, 200, 215, 230, 245, 260].map((xPos) => (
                <line key={xPos} x1={xPos} y1="112" x2={xPos} y2="148" stroke="#facc15" strokeWidth="3" />
              ))}
              <line x1="275" y1="130" x2="370" y2="130" stroke="#334155" strokeWidth="6" />
              <text x="180" y="165" fill="#facc15" fontSize="11">Periodic Grating (Λ) reflects λ_B ◄──</text>
            </svg>
          </div>
        )}

        {compType === "coupler" && (
          <div>
            <div style={s.Grid2}>
              <div>
                <h3 style={s.CardTitle}>Directional Coupler (Evanescent Field Coupling)</h3>
                <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "10px" }}>
                  When two waveguides come within sub-micron proximity inside the{" "}
                  <strong style={{ color: "#facc15" }}>coupling region</strong>, the evanescent tail in the cladding overlaps the neighboring core—transferring optical power sinusoidally with interaction length <code style={s.Code}>L</code>.
                </p>
                <label style={s.Label}>
                  Adjust Coupling Length / Ratio: <strong>{couplingLen}%</strong> (Through C: {powerC}% | Cross D: {powerD}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={couplingLen}
                  onChange={(e) => setCouplingLen(Number(e.target.value))}
                  style={s.Slider}
                />
              </div>

              <svg viewBox="0 0 420 155" style={{ width: "100%", height: "150px", background: "#050914", borderRadius: "8px" }}>
                {/* Top Waveguide A -> C */}
                <path
                  d="M 25,35 L 110,35 L 150,65 L 260,65 L 300,35 L 390,35"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth={2 + (powerC / 100) * 5}
                />
                {/* Bottom Waveguide B -> D */}
                <path
                  d="M 25,120 L 110,120 L 150,90 L 260,90 L 300,120 L 390,120"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth={2 + (powerD / 100) * 5}
                />
                <rect x="145" y="52" width="120" height="50" fill="none" stroke="#facc15" strokeDasharray="4,4" rx="4" />
                <text x="160" y="45" fill="#facc15" fontSize="11" fontWeight="bold">Coupling Region</text>
                <text x="25" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">Input A (100%)</text>
                <text x="25" y="140" fill="#64748b" fontSize="11">Input B (0%)</text>
                <text x="315" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">Output C: {powerC}%</text>
                <text x="315" y="140" fill="#34d399" fontSize="11" fontWeight="bold">Output D: {powerD}%</text>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 4: Waveguide Components — Polarization Handling (Page 3 Bottom & Page 4 Top)
   ============================================================================ */
function Slide4PolarizationHandling() {
  const [polDevice, setPolDevice] = useState("polarizer"); // "polarizer" | "pbs" | "converter"
  const [metalPadActive, setMetalPadActive] = useState(true);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.4 — POLARIZATION HANDLING</div>
      <h2 style={s.SlideHeading}>
        Controlling TE & TM Polarizations: Polarizers, Splitters & Converters
      </h2>

      <div style={s.TabRow}>
        {[
          { id: "polarizer", label: "1. Metal-Clad Polarizer (α_TM ≫ α_TE)" },
          { id: "pbs", label: "2. Polarization Beam Splitter (Anisotropic Coupler)" },
          { id: "converter", label: "3. Electro-Optic TE ⇄ TM Converter" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setPolDevice(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: polDevice === t.id ? "#2563eb" : "#0f172a",
              borderColor: polDevice === t.id ? "#3b82f6" : "#1e293b",
              color: polDevice === t.id ? "#ffffff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {polDevice === "polarizer" && (
        <div style={s.Grid2}>
          <div style={s.Card}>
            <h3 style={s.CardTitle}>Selective Mode Absorption (Metal Overlay Polarizer)</h3>
            <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
              As shown in your notes on Page 4, an unpolarized or dual{" "}
              <code style={s.Code}>TE/TM</code> input experiences propagation loss{" "}
              <code style={s.Code}>α_TE</code> and <code style={s.Code}>α_TM</code>:
            </p>
            <div style={s.FormulaBox}>
              • Normal dielectric waveguide: α_TE = α_TM ──► Both TE & TM pass
              <br />• With Metal Cladding Pad: α_TM ≫ α_TE ──► TM absorbed, only TE exits!
            </div>
            <button
              onClick={() => setMetalPadActive(!metalPadActive)}
              style={{
                ...s.ModeToggleBtn,
                backgroundColor: metalPadActive ? "#dc2626" : "#059669",
                marginTop: "6px",
              }}
            >
              {metalPadActive ? "Metal Cladding ON (α_TM ≫ α_TE — Blocks TM)" : "Metal Cladding OFF (α_TE = α_TM — Passes TE/TM)"}
            </button>
          </div>

          <div style={s.SimBox}>
            <svg viewBox="0 0 420 170" style={{ width: "100%", height: "160px", background: "#050914", borderRadius: "8px" }}>
              <text x="20" y="30" fill="#94a3b8" fontSize="11">Input: Mixed TE + TM</text>
              <line x1="25" y1="85" x2="390" y2="85" stroke="#38bdf8" strokeWidth="8" />
              {metalPadActive && (
                <g>
                  <rect x="155" y="65" width="110" height="40" fill="#facc15" opacity="0.85" rx="4" />
                  <text x="172" y="89" fill="#050914" fontSize="12" fontWeight="bold">Metal Pad</text>
                  <text x="155" y="128" fill="#f87171" fontSize="11" fontWeight="bold">✕ TM Mode Absorbed (α_TM ≫ α_TE)</text>
                </g>
              )}
              <text x="295" y="55" fill="#34d399" fontSize="13" fontWeight="bold">
                Output: {metalPadActive ? "Pure TE Only" : "Both TE / TM"}
              </text>
            </svg>
          </div>
        </div>
      )}

      {polDevice === "pbs" && (
        <div style={s.Grid2}>
          <div style={s.Card}>
            <h3 style={s.CardTitle}>Polarization Beam Splitter (Anisotropic Directional Coupler)</h3>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
              Instead of destroying the TM polarization, a{" "}
              <strong style={{ color: "#38bdf8" }}>Polarization Beam Splitter (PBS)</strong>{" "}
              uses an anisotropic directional coupler where TE and TM modes have different evanescent coupling lengths—routing{" "}
              <strong style={{ color: "#facc15" }}>TM to the cross port</strong> and{" "}
              <strong style={{ color: "#38bdf8" }}>TE to the bar port</strong>.
            </p>
            <div style={s.FormulaBox}>
              Input (TE + TM) ──► [ Anisotropic Coupler ] ──► Arm 1 (TM) + Arm 2 (TE)
            </div>
          </div>
          <div style={s.SimBox}>
            <svg viewBox="0 0 420 170" style={{ width: "100%", height: "160px", background: "#050914", borderRadius: "8px" }}>
              <path d="M 25,115 L 120,115 L 160,95 L 260,95 L 310,120 L 385,120" fill="none" stroke="#38bdf8" strokeWidth="5" />
              <path d="M 160,95 L 200,65 L 260,65 L 310,40 L 385,40" fill="none" stroke="#facc15" strokeWidth="5" strokeDasharray="6,3" />
              <text x="25" y="100" fill="#e2e8f0" fontSize="12" fontWeight="bold">Input (TE/TM)</text>
              <text x="320" y="28" fill="#facc15" fontSize="12" fontWeight="bold">Output 1: TM Mode</text>
              <text x="320" y="145" fill="#38bdf8" fontSize="12" fontWeight="bold">Output 2: TE Mode</text>
            </svg>
          </div>
        </div>
      )}

      {polDevice === "converter" && (
        <div style={s.Grid2}>
          <div style={s.Card}>
            <h3 style={s.CardTitle}>Electro-Optic (EO) TE ⇄ TM Mode Converter</h3>
            <p style={{ fontSize: "14px", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "12px" }}>
              Uses periodic interdigital electrodes along an electro-optic waveguide. The periodic electric field couples the orthogonal{" "}
              <code style={s.Code}>TE</code> and <code style={s.Code}>TM</code> modes by matching their beat length{" "}
              <code style={s.Code}>Λ = λ / |n_TE - n_TM|</code>.
            </p>
            <div style={s.FormulaBox}>
              Input (Pure TE) ──► [ Periodic EO Grating Electrodes ] ──► Output (Pure TM)
            </div>
          </div>
          <div style={s.SimBox}>
            <svg viewBox="0 0 420 170" style={{ width: "100%", height: "160px", background: "#050914", borderRadius: "8px" }}>
              <line x1="30" y1="90" x2="390" y2="90" stroke="#38bdf8" strokeWidth="8" />
              {[140, 160, 180, 200, 220, 240, 260].map((x) => (
                <rect key={x} x={x} y="62" width="8" height="56" fill="#facc15" rx="2" />
              ))}
              <text x="35" y="65" fill="#38bdf8" fontSize="12" fontWeight="bold">Input: TE (↔)</text>
              <text x="145" y="45" fill="#facc15" fontSize="11" fontWeight="bold">EO Periodic Electrodes</text>
              <text x="310" y="65" fill="#34d399" fontSize="12" fontWeight="bold">Output: TM (↕)</text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   SLIDE 5: Electro-Optic Phase & MZI Intensity Modulators (Page 4 Bottom & Page 5 Top)
   ============================================================================ */
function Slide5ElectroOpticModulators() {
  const [phaseShiftDeg, setPhaseShiftDeg] = useState(90); // 0 to 180 deg

  const phaseRad = (phaseShiftDeg * Math.PI) / 180;
  const mziTransmission = Math.round(Math.cos(phaseRad / 2) ** 2 * 100);

  // Build sine wave path
  const makeSinePath = (phaseOffset, ampScale, yCenter) => {
    const pts = [];
    for (let x = 0; x <= 240; x += 4) {
      const y = yCenter - Math.sin((x / 240) * Math.PI * 4 + phaseOffset) * (28 * ampScale);
      pts.push(`${x + 20},${y.toFixed(1)}`);
    }
    return "M " + pts.join(" L ");
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.5 — ELECTRO-OPTIC MODULATION</div>
      <h2 style={s.SlideHeading}>
        Phase Modulator vs. Mach-Zehnder Intensity Modulator (MZI)
      </h2>

      <div style={s.SimBox}>
        <div style={{ marginBottom: "14px" }}>
          <label style={s.Label}>
            Applied Electrode Voltage → Induced Phase Shift (Δφ):{" "}
            <strong style={{ color: "#facc15" }}>{phaseShiftDeg}°</strong>{" "}
            | Resulting MZI Output Intensity:{" "}
            <strong style={{ color: "#34d399" }}>{mziTransmission}%</strong>{" "}
            {phaseShiftDeg === 180 ? "(Destructive Interference — OFF)" : phaseShiftDeg === 0 ? "(Constructive Interference — MAX)" : ""}
          </label>
          <input
            type="range"
            min="0"
            max="180"
            step="5"
            value={phaseShiftDeg}
            onChange={(e) => setPhaseShiftDeg(Number(e.target.value))}
            style={s.Slider}
          />
        </div>

        <div style={s.Grid2}>
          {/* Left: EO Phase Modulator (Page 4 Bottom) */}
          <div style={s.Card}>
            <h3 style={s.CardTitle}>1. EO Phase Modulator: i(t) → [φ + Δφ]</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
              Voltage across a single waveguide changes refractive index <code style={s.Code}>Δn(V)</code>, shifting wave phase by <code style={s.Code}>Δφ</code> while amplitude stays constant:
            </p>
            <svg viewBox="0 0 280 110" style={{ width: "100%", height: "105px", background: "#050914", borderRadius: "8px" }}>
              <line x1="20" y1="55" x2="260" y2="55" stroke="#334155" />
              {/* Original Input Wave (Dashed) */}
              <path d={makeSinePath(0, 1, 55)} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4,4" />
              {/* Shifted Output Wave (Solid) */}
              <path d={makeSinePath(phaseRad, 1, 55)} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              <text x="24" y="20" fill="#94a3b8" fontSize="10">Dashed: Input (φ)</text>
              <text x="150" y="20" fill="#38bdf8" fontSize="10" fontWeight="bold">Solid: Output (φ + {phaseShiftDeg}°)</text>
            </svg>
          </div>

          {/* Right: MZI Intensity Modulator (Page 5 Top) */}
          <div style={s.Card}>
            <h3 style={s.CardTitle}>2. Mach-Zehnder Intensity Modulator (MZI)</h3>
            <p style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
              Splitting the wave into two arms and recombining converts phase shift <code style={s.Code}>Δφ</code> into amplitude/intensity modulation <code style={s.Code}>I_out = I_in cos²(Δφ/2)</code>:
            </p>
            <svg viewBox="0 0 280 110" style={{ width: "100%", height: "105px", background: "#050914", borderRadius: "8px" }}>
              <line x1="20" y1="55" x2="260" y2="55" stroke="#334155" />
              {/* Amplitude Modulated Output Wave */}
              <path d={makeSinePath(0, Math.cos(phaseRad / 2), 55)} fill="none" stroke="#34d399" strokeWidth="2.5" />
              <text x="24" y="20" fill="#34d399" fontSize="10" fontWeight="bold">
                MZI Output Envelope Amplitude: {Math.round(Math.cos(phaseRad / 2) * 100)}%
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 6: Acousto-Optic Frequency Shifter & Chapter 0 Quiz (Page 5 Bottom)
   ============================================================================ */
function Slide6AcoustoOpticAndQuiz() {
  const [fSaw, setFSaw] = useState(40); // MHz
  const [showAns, setShowAns] = useState(false);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 0.6 — ACOUSTO-OPTICS & ACTIVE RECALL</div>
      <h2 style={s.SlideHeading}>
        Acousto-Optic (AO) Frequency Shifter & Chapter 0 Check
      </h2>

      <div style={s.Grid2}>
        {/* Left: AO Frequency Shifter Simulator */}
        <div style={s.SimBox}>
          <h3 style={s.CardTitle}>SAW Transducer Frequency Shifter (f₀ → f₀ ± f_SAW)</h3>
          <p style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: 1.55, marginBottom: "10px" }}>
            A <strong style={{ color: "#facc15" }}>Surface Acoustic Wave (SAW) Transducer</strong>{" "}
            launches a traveling acoustic wave (<code style={s.Code}>f_SAW</code>) across the waveguide coupling region, shifting the optical carrier frequency from{" "}
            <code style={s.Code}>f₀</code> to sidebands <code style={s.Code}>f₀ - f_SAW</code> and <code style={s.Code}>f₀ + f_SAW</code>.
          </p>

          <svg viewBox="0 0 360 135" style={{ width: "100%", height: "125px", background: "#050914", borderRadius: "8px" }}>
            {/* Frequency Axis */}
            <line x1="25" y1="105" x2="335" y2="105" stroke="#64748b" strokeWidth="2" />
            {/* Center Peak f0 */}
            <path d="M 155,105 Q 180,15 205,105" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="2.5" />
            <text x="173" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">f₀</text>

            {/* Lower Sideband f0 - fSAW */}
            <path
              d={`M ${155 - fSaw * 1.4},105 Q ${180 - fSaw * 1.4},45 ${205 - fSaw * 1.4},105`}
              fill="rgba(250, 204, 21, 0.2)"
              stroke="#facc15"
              strokeWidth="2"
            />
            <text x={155 - fSaw * 1.4} y="48" fill="#facc15" fontSize="10">f₀ - f_SAW</text>

            {/* Upper Sideband f0 + fSAW */}
            <path
              d={`M ${155 + fSaw * 1.4},105 Q ${180 + fSaw * 1.4},45 ${205 + fSaw * 1.4},105`}
              fill="rgba(52, 211, 153, 0.25)"
              stroke="#34d399"
              strokeWidth="2.5"
            />
            <text x={165 + fSaw * 1.4} y="48" fill="#34d399" fontSize="10" fontWeight="bold">f₀ + f_SAW</text>
          </svg>

          <div style={{ marginTop: "10px" }}>
            <label style={s.Label}>SAW Acoustic Frequency Shift (f_SAW): <strong>±{fSaw} MHz</strong></label>
            <input
              type="range"
              min="20"
              max="75"
              step="5"
              value={fSaw}
              onChange={(e) => setFSaw(Number(e.target.value))}
              style={s.Slider}
            />
          </div>
        </div>

        {/* Right: Active Recall Check */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Chapter 0 Active Recall Self-Quiz</h3>
          <ol style={{ ...s.List, spaceY: "10px", marginBottom: "14px" }}>
            <li style={{ marginBottom: "8px" }}>
              <strong>Q1:</strong> How does a 2-D Channel Waveguide differ from a 1-D Slab Waveguide?
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Q2:</strong> Why does placing a Metal Pad over a waveguide convert a mixed TE/TM input into pure TE output?
            </li>
            <li style={{ marginBottom: "8px" }}>
              <strong>Q3:</strong> How does a Mach-Zehnder Interferometer turn a phase modulator into an intensity modulator?
            </li>
          </ol>

          <button
            onClick={() => setShowAns(!showAns)}
            style={s.ModeToggleBtn}
          >
            {showAns ? "Hide Answers" : "Reveal Answers"}
          </button>

          {showAns && (
            <div style={{ marginTop: "12px", padding: "10px", background: "#060a17", borderRadius: "8px", fontSize: "12px", color: "#cbd5e1", lineHeight: 1.55 }}>
              <div>• <strong>A1:</strong> A slab confines light in 1D (x only), whereas a channel waveguide confines light in 2D (both x and y).</div>
              <div>• <strong>A2:</strong> The metal layer induces high plasmonic absorption for TM (α_TM ≫ α_TE), extinguishing TM while TE passes.</div>
              <div>• <strong>A3:</strong> By interfering the phase-shifted arm with a reference arm at a combiner (constructive vs. destructive interference).</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BasicConceptOfPICSection() {
  return (
    <Slideshow
      slides={[
        Slide1Confinement,
        Slide2EvolutionAndFeatures,
        Slide3PowerHandling,
        Slide4PolarizationHandling,
        Slide5ElectroOpticModulators,
        Slide6AcoustoOpticAndQuiz,
      ]}
    />
  );
}

/* ============================================================================
   SHAREDDARK-NAVY PRESENTATION STYLES (Matches PowerSystem Theme)
   ============================================================================ */
const s = {
  Tag: {
    color: "#facc15",
    fontSize: "12px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  SlideHeading: {
    fontSize: "28px",
    fontWeight: 800,
    color: "#ffffff",
    marginBottom: "10px",
  },
  Subtitle: {
    fontSize: "15px",
    color: "#94a3b8",
    lineHeight: 1.55,
  },
  Code: {
    color: "#facc15",
    fontFamily: "monospace",
    backgroundColor: "rgba(250, 204, 21, 0.1)",
    padding: "2px 6px",
    borderRadius: "4px",
  },
  TabRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
  },
  TabBtn: {
    padding: "8px 14px",
    borderRadius: "8px",
    border: "1px solid #1e293b",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  Grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "18px",
    alignItems: "start",
  },
  Card: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "18px",
  },
  CardTitle: {
    fontSize: "15px",
    fontWeight: 700,
    color: "#38bdf8",
    marginBottom: "10px",
  },
  FormulaBox: {
    backgroundColor: "#060a17",
    border: "1px solid #1e3a8a",
    color: "#facc15",
    fontFamily: "monospace",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "12.5px",
    marginBottom: "12px",
    lineHeight: 1.5,
  },
  List: {
    color: "#cbd5e1",
    fontSize: "13.5px",
    lineHeight: 1.65,
    paddingLeft: "18px",
  },
  SimBox: {
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "16px",
  },
  Label: {
    display: "block",
    fontSize: "12.5px",
    color: "#cbd5e1",
    marginBottom: "6px",
  },
  Slider: {
    width: "100%",
    accentColor: "#2563eb",
    cursor: "pointer",
  },
  ModeToggleBtn: {
    padding: "7px 14px",
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    cursor: "pointer",
  },
  Table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#0f172a",
    borderRadius: "10px",
    overflow: "hidden",
    fontSize: "13px",
  },
  Th: {
    backgroundColor: "#070b19",
    color: "#38bdf8",
    textAlign: "left",
    padding: "10px 14px",
    borderBottom: "1px solid #1e293b",
    fontWeight: 700,
  },
  Td: {
    padding: "9px 14px",
    borderBottom: "1px solid #1e293b",
    color: "#cbd5e1",
  },
  TdBold: {
    padding: "9px 14px",
    borderBottom: "1px solid #1e293b",
    color: "#ffffff",
    fontWeight: 700,
  },
};