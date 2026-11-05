import React, { useState } from "react";
import Slideshow from "../components/Slideshow";

export const title = "3. Photonic Circuit Building Blocks, Examples, Supply Chain, Challenges";

/* ============================================================================
   SLIDE 1: Merging Photonics & Electronics — 5 Generations of Integration (Page 1)
   ============================================================================ */
function Slide1MergingPhotonicsElectronics() {
  const [genIdx, setGenIdx] = useState(2); // 0=Gen I, 1=Gen II, 2=Gen III, 3=Gen IV, 4=Gen V

  const generations = [
    {
      gen: "Gen I",
      name: "Pluggable Optics (Front-Panel Edge Modules)",
      matPlatform: "Electronics on Si | Photonics on InP",
      elecPathLenCm: 25,
      energyPjBit: 15.0,
      bwTb: 3.2,
      laserConfig: "Built into edge pluggable transceiver",
      desc: "High-speed electrical signals travel 20–30 cm across lossy PCB copper traces from the central Switch ASIC to front-panel pluggable optical transceivers (QSFP-DD / OSFP). Copper attenuation requires heavy DSP retiming power.",
    },
    {
      gen: "Gen II",
      name: "On-Board Optics (OBO)",
      matPlatform: "Electronics on Si | Photonics on InP / SiPh",
      elecPathLenCm: 8,
      energyPjBit: 9.5,
      bwTb: 12.8,
      laserConfig: "Mounted on main PCB near ASIC",
      desc: "Moves optical transceiver modules from the front panel onto the main PCB adjacent to the switch ASIC, cutting copper trace length by ~3× and reducing high-frequency RF insertion loss.",
    },
    {
      gen: "Gen III",
      name: "2.5D Co-Packaged Optics (CPO)",
      matPlatform: "Electronics on Si + Co-Packaged SiPh PIC on Organic/Si Interposer",
      elecPathLenCm: 1.5,
      energyPjBit: 4.5,
      bwTb: 51.2,
      laserConfig: "Disaggregated external laser supply (ELS)",
      desc: "Places Photonic IC (PIC) chiplets on the exact same package substrate right beside the Switch ASIC. Electrical links shrink to millimeter-scale interposer traces, achieving ~3.5× system power savings.",
    },
    {
      gen: "Gen IV",
      name: "3D Co-Packaged Optics",
      matPlatform: "3D Stacked Electronic IC on Photonic IC",
      elecPathLenCm: 0.05,
      energyPjBit: 1.8,
      bwTb: 102.4,
      laserConfig: "Disaggregated external laser supply (ELS)",
      desc: "Vertically stacks the Electronic driver/compute die directly on top of the Photonic IC using micro-bumps or hybrid copper bonding, eliminating lateral package routing bottlenecks and enabling ultra-low latency.",
    },
    {
      gen: "Gen V",
      name: "3D Co-Packaged Optics with Integrated Lasers",
      matPlatform: "Electronics on Si | Photonics + III-V Lasers Monolithically/Heterogeneously on Si",
      elecPathLenCm: 0.02,
      energyPjBit: 0.6,
      bwTb: 204.8,
      laserConfig: "On-chip heterogeneously integrated lasers",
      desc: "The ultimate convergence (Margalit & Bowers, APL 2021): 3D stacked electronic-photonic chiplets with III-V quantum-dot/DFB lasers integrated directly on the silicon photonics wafer—eliminating external laser fibers.",
    },
  ];

  const active = generations[genIdx];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.1 — MERGING PHOTONICS &amp; ELECTRONICS </div>
      <h1 style={s.SlideHeading}>
        Tighter Integration Roadmap: From Pluggables (Gen I) to 3D CPO (Gen V)
      </h1>

      <div style={s.TabRow}>
        {generations.map((g, i) => (
          <button
            key={g.gen}
            onClick={() => setGenIdx(i)}
            style={{
              ...s.TabBtn,
              backgroundColor: genIdx === i ? "#2563eb" : "#0f172a",
              borderColor: genIdx === i ? "#3b82f6" : "#1e293b",
              color: genIdx === i ? "#ffffff" : "#94a3b8",
            }}
          >
            {g.gen}: {g.name.split(" (")[0]}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Theoretical Context & Metrics */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>
            {active.gen} — {active.name}
          </h3>
          <div style={s.FormulaBox}>
            Platform: {active.matPlatform}
            <br />
            Laser Supply: {active.laserConfig}
          </div>
          <p style={s.BodyText}>{active.desc}</p>
          <ul style={s.List}>
            <li>
              <strong>Bringing Optics Closer to Switch:</strong> Electrical trace length shrinks to{" "}
              <code style={s.Code}>{active.elecPathLenCm} cm</code>.
            </li>
            <li>
              <strong>Reduced Interconnect Power:</strong>{" "}
              <code style={s.Code}>~{active.energyPjBit} pJ/bit</code> (vs. 15+ pJ/bit for long PCB copper).
            </li>
            <li>
              <strong>Aggregate Switch Bandwidth:</strong> Scales to{" "}
              <code style={s.Code}>{active.bwTb} Tb/s</code> (
              <a
                href="https://pubs.aip.org/aip/apl/article/118/22/220501/150902/Perspective-on-the-future-of-silicon-photonics-and"
                target="_blank"
                rel="noreferrer"
                style={s.Link}
              >
                Margalit, Bowers et al., APL 2021
              </a>
              ).
            </li>
          </ul>
        </div>

        {/* Right: Interactive 5-Gen Package Architecture Visualizer */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "12px" }}>
            <span style={{ color: "#38bdf8", fontWeight: 700 }}>Interactive Package Cross-Section</span>
            <span style={{ color: "#34d399", fontFamily: "monospace" }}>
              Energy: {active.energyPjBit} pJ/bit | BW: {active.bwTb} Tb/s
            </span>
          </div>

          <svg viewBox="0 0 460 185" style={{ width: "100%", height: "175px", background: "#050914", borderRadius: "8px" }}>
            {/* Main PCB Board */}
            <rect x="25" y="135" width="410" height="22" fill="#14532d" stroke="#22c55e" strokeWidth="1.5" rx="3" />
            <text x="35" y="150" fill="#86efac" fontSize="10" fontWeight="bold">Host Printed Circuit Board (PCB)</text>

            {/* Package Substrate */}
            <rect x="135" y="112" width="190" height="23" fill="#1e293b" stroke="#64748b" rx="2" />
            <text x="175" y="127" fill="#cbd5e1" fontSize="9.5">Package Substrate / Interposer</text>

            {/* Central Switch / Compute ASIC (Red/Brown Die) */}
            <rect x="190" y="74" width="80" height="38" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" rx="3" />
            <text x="200" y="97" fill="#fecaca" fontSize="11" fontWeight="bold">Switch ASIC</text>

            {/* Gen I: Edge Pluggable far on the left */}
            {genIdx === 0 && (
              <g>
                <rect x="35" y="95" width="65" height="40" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" rx="3" />
                <text x="42" y="118" fill="#bfdbfe" fontSize="10" fontWeight="bold">Pluggable</text>
                <path d="M 100,115 L 190,95" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4,3" />
                <text x="105" y="88" fill="#facc15" fontSize="10">Long Electrical Link (25 cm)</text>
                <path d="M 10,115 L 35,115" stroke="#cbd5e1" strokeWidth="3" />
              </g>
            )}

            {/* Gen II: On-Board Optics */}
            {genIdx === 1 && (
              <g>
                <rect x="85" y="102" width="45" height="33" fill="#065f46" stroke="#34d399" strokeWidth="2" rx="3" />
                <text x="95" y="122" fill="#a7f3d0" fontSize="10" fontWeight="bold">OBO</text>
                <path d="M 130,115 L 190,95" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="90" y="88" fill="#facc15" fontSize="10">Shorter PCB Trace (8 cm)</text>
                <path d="M 20,118 L 85,118" stroke="#cbd5e1" strokeWidth="3" />
              </g>
            )}

            {/* Gen III: 2.5D Co-Packaged Optics */}
            {genIdx === 2 && (
              <g>
                <rect x="145" y="84" width="38" height="28" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <text x="152" y="102" fill="#ffffff" fontSize="9.5" fontWeight="bold">PIC</text>
                <rect x="277" y="84" width="38" height="28" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <text x="284" y="102" fill="#ffffff" fontSize="9.5" fontWeight="bold">PIC</text>
                <line x1="183" y1="98" x2="190" y2="98" stroke="#facc15" strokeWidth="3" />
                <line x1="270" y1="98" x2="277" y2="98" stroke="#facc15" strokeWidth="3" />
                <path d="M 35,98 L 145,98" stroke="#e2e8f0" strokeWidth="2.5" />
                <text x="40" y="88" fill="#38bdf8" fontSize="10">Optical Fiber + External Laser Supply</text>
              </g>
            )}

            {/* Gen IV: 3D Co-Packaged Optics */}
            {genIdx === 3 && (
              <g>
                <rect x="165" y="92" width="130" height="20" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <text x="185" y="105" fill="#ffffff" fontSize="9.5" fontWeight="bold">3D Stacked Photonic IC Base</text>
                <rect x="190" y="54" width="80" height="38" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" rx="3" />
                <text x="200" y="77" fill="#fecaca" fontSize="11" fontWeight="bold">Switch ASIC</text>
                <path d="M 45,102 L 165,102" stroke="#e2e8f0" strokeWidth="2.5" />
                <text x="50" y="42" fill="#34d399" fontSize="10.5" fontWeight="bold">
                  Vertical Micro-Bumps (&lt;0.5 mm interconnect!)
                </text>
              </g>
            )}

            {/* Gen V: 3D CPO with Integrated On-Chip Lasers */}
            {genIdx === 4 && (
              <g>
                <rect x="155" y="92" width="150" height="20" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" rx="2" />
                <text x="172" y="105" fill="#ffffff" fontSize="9.5" fontWeight="bold">PIC + On-Chip Lasers</text>
                <rect x="160" y="76" width="24" height="16" fill="#facc15" stroke="#fef08a" rx="2" />
                <text x="162" y="87" fill="#050914" fontSize="8.5" fontWeight="bold">Laser</text>
                <rect x="276" y="76" width="24" height="16" fill="#facc15" stroke="#fef08a" rx="2" />
                <text x="278" y="87" fill="#050914" fontSize="8.5" fontWeight="bold">Laser</text>
                <rect x="190" y="54" width="80" height="38" fill="#7f1d1d" stroke="#f87171" strokeWidth="2" rx="3" />
                <text x="200" y="77" fill="#fecaca" fontSize="11" fontWeight="bold">Switch ASIC</text>
                <text x="125" y="38" fill="#facc15" fontSize="11" fontWeight="bold">
                  ★ Gen V: Full 3D Electronic + Photonic + Laser Convergence
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 2: Photonic Circuit Building Blocks — Interactive Chip Explorer (Page 2)
   ============================================================================ */
function Slide2CircuitBuildingBlocks() {
  const [selectedBlock, setSelectedBlock] = useState("modulator");
  const [heaterVoltage, setHeaterVoltage] = useState(2.4); // V applied to ring heater

  const blocks = {
    grating: {
      title: "Grating Coupler (Optical Fiber I/O Interface)",
      role: "Diffracts vertically incident light from a standard single-mode optical fiber (~10 μm mode diameter) into a sub-micron on-chip silicon waveguide (450 nm × 220 nm) and vice versa.",
      physics: "Bragg Diffraction Condition: Λ · (n_eff − n_clad sin θ) = m · λ",
    },
    splitter: {
      title: "1×2 Waveguide Splitter (MMI / Y-Branch)",
      role: "Divides the incoming optical wave into two waveguide paths: one feeding the passive ring resonator filter and the other routing light along the reference bus.",
      physics: "Adiabatic mode evolution or Multi-Mode Interference (MMI) self-imaging.",
    },
    laser: {
      title: "Integrated Continuous-Wave (CW) Laser Source",
      role: "Generates coherent carrier photons on the chip via III-V (InP/GaAs) heterogeneous wafer bonding or flip-chip integration.",
      physics: "Stimulated emission across a direct-bandgap quantum-well or quantum-dot active region.",
    },
    modulator: {
      title: "High-Speed Electro-Optic Modulator + RF Input",
      role: "Encodes high-speed electrical RF data signals (e.g., 100–200 Gbaud) onto the optical carrier beam by modulating refractive index Δn(V) across a Mach-Zehnder Interferometer.",
      physics: "Carrier plasma dispersion effect in Si (or Pockels effect in TFLN/BTO).",
    },
    ring: {
      title: "Ring Resonator Filter + Thermal Heater & Bond Pads",
      role: "Selectively filters or drops a specific resonance wavelength λ_res. Metal wiring connected to electrical bond pads drives a micro-heater over the ring to tune λ_res via the thermo-optic effect.",
      physics: "m · λ_res = 2πR · n_eff(T),  dn/dT ≈ +1.86 × 10⁻⁴ K⁻¹ in Silicon.",
    },
    photodetector: {
      title: "High-Speed Germanium Photodetector (O-to-E Conversion)",
      role: "Absorbs guided photons at the end of the waveguide and converts them into an electrical photocurrent (I_ph = R · P_opt) routed out through electrical bond pads.",
      physics: "Epitaxial Germanium-on-Silicon (Ge-on-Si) PIN photodiode operating at 1310–1550 nm.",
    },
  };

  const active = blocks[selectedBlock];
  const tunedWavelengthNm = (1550.0 + heaterVoltage * 0.85).toFixed(2);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.2 — CIRCUIT BUILDING BLOCKS </div>
      <h2 style={s.SlideHeading}>
        Interactive Anatomy of a Photonic Integrated Circuit Chip
      </h2>

      {/* Component Selector Buttons */}
      <div style={s.TabRow}>
        {[
          { id: "grating", label: "1. Grating Coupler & Fiber" },
          { id: "splitter", label: "2. Waveguide & Splitter" },
          { id: "laser", label: "3. Integrated Laser" },
          { id: "modulator", label: "4. High-Speed Modulator (RF)" },
          { id: "ring", label: "5. Ring Filter + Heater + Bond Pads" },
          { id: "photodetector", label: "6. Photodetector" },
        ].map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBlock(b.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: selectedBlock === b.id ? "#2563eb" : "#0f172a",
              color: selectedBlock === b.id ? "#fff" : "#94a3b8",
            }}
          >
            {b.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Interactive Top-Down Chip Schematic (Recreates Page 2 Diagram) */}
        <div style={s.SimBox}>
          <svg viewBox="0 0 480 215" style={{ width: "100%", height: "200px", background: "#050914", borderRadius: "8px" }}>
            {/* Silicon Substrate Die */}
            <rect x="15" y="15" width="450" height="185" fill="#0f172a" stroke="#334155" strokeWidth="2" rx="8" />

            {/* Input / Output Optical Fibers + Grating Couplers */}
            <g onClick={() => setSelectedBlock("grating")} style={{ cursor: "pointer" }}>
              <polygon points="45,55 75,45 75,65" fill={selectedBlock === "grating" ? "#38bdf8" : "#64748b"} />
              <polygon points="45,145 75,135 75,155" fill={selectedBlock === "grating" ? "#38bdf8" : "#64748b"} />
              <line x1="20" y1="30" x2="52" y2="55" stroke="#f87171" strokeWidth="4" />
              <text x="22" y="25" fill="#f87171" fontSize="9.5" fontWeight="bold">Optical Input ↓</text>
              <line x1="52" y1="145" x2="20" y2="175" stroke="#f87171" strokeWidth="4" />
              <text x="22" y="190" fill="#f87171" fontSize="9.5" fontWeight="bold">Optical Output ↑</text>
            </g>

            {/* Waveguides & Splitter */}
            <g onClick={() => setSelectedBlock("splitter")} style={{ cursor: "pointer" }}>
              <path d="M 75,55 L 135,55 L 160,38 L 220,38" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <path d="M 135,55 L 165,75 L 220,75" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <path d="M 75,145 L 350,145" fill="none" stroke="#94a3b8" strokeWidth="3" />
              <text x="105" y="75" fill="#cbd5e1" fontSize="9.5">Splitter</text>
            </g>

            {/* On-Chip Laser */}
            <g onClick={() => setSelectedBlock("laser")} style={{ cursor: "pointer" }}>
              <rect x="220" y="25" width="75" height="24" fill="#312e81" stroke={selectedBlock === "laser" ? "#facc15" : "#818cf8"} strokeWidth="2" rx="3" />
              <text x="242" y="41" fill="#e0e7ff" fontSize="10" fontWeight="bold">Laser</text>
              <path d="M 295,38 L 330,38 L 345,65" fill="none" stroke="#94a3b8" strokeWidth="3" />
            </g>

            {/* High-Speed Modulator + RF Input */}
            <g onClick={() => setSelectedBlock("modulator")} style={{ cursor: "pointer" }}>
              <rect x="220" y="60" width="130" height="28" fill="rgba(250, 204, 21, 0.2)" stroke={selectedBlock === "modulator" ? "#facc15" : "#ca8a04"} strokeWidth="2" rx="3" />
              <text x="232" y="78" fill="#fef08a" fontSize="10" fontWeight="bold">High-Speed Modulator</text>
              <path d="M 350,74 L 415,74" stroke="#a855f7" strokeWidth="4" />
              <text x="370" y="65" fill="#d8b4fe" fontSize="9.5" fontWeight="bold">RF Input ◄──</text>
            </g>

            {/* Ring Resonator + Heater + Metal Wiring + Bond Pads */}
            <g onClick={() => setSelectedBlock("ring")} style={{ cursor: "pointer" }}>
              <circle cx="300" cy="118" r="20" fill="none" stroke="#38bdf8" strokeWidth="3" />
              {/* Gold Thermal Heater Arc */}
              <path d="M 283,108 A 20,20 0 1,1 317,108" fill="none" stroke="#facc15" strokeWidth="4" />
              <text x="232" y="122" fill="#facc15" fontSize="9.5" fontWeight="bold">Heater + Ring</text>
              {/* Gold Metal Wiring to Bond Pads */}
              <line x1="283" y1="108" x2="245" y2="168" stroke="#eab308" strokeWidth="3" />
              <line x1="317" y1="108" x2="300" y2="168" stroke="#eab308" strokeWidth="3" />
              <rect x="233" y="168" width="24" height="18" fill="#ca8a04" stroke="#fef08a" rx="2" />
              <rect x="288" y="168" width="24" height="18" fill="#ca8a04" stroke="#fef08a" rx="2" />
              <text x="242" y="196" fill="#fef08a" fontSize="9.5">Electrical Bond Pads</text>
            </g>

            {/* Photodetector */}
            <g onClick={() => setSelectedBlock("photodetector")} style={{ cursor: "pointer" }}>
              <rect x="350" y="128" width="55" height="32" fill="#064e3b" stroke={selectedBlock === "photodetector" ? "#34d399" : "#059669"} strokeWidth="2" rx="3" />
              <text x="355" y="148" fill="#a7f3d0" fontSize="9.5" fontWeight="bold">Photodet.</text>
              <line x1="378" y1="160" x2="378" y2="192" stroke="#a855f7" strokeWidth="4" />
              <text x="385" y="185" fill="#d8b4fe" fontSize="9.5" fontWeight="bold">Elec. Out ↓</text>
            </g>
          </svg>
        </div>

        {/* Right: Detailed Explanation + Live Thermal Heater Tuning Example */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{active.title}</h3>
          <p style={s.BodyText}>{active.role}</p>
          <div style={s.FormulaBox}>{active.physics}</div>

          <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid #1e293b" }}>
            <label style={s.Label}>
              Interactive Ring Heater Bias (Bond Pad Voltage):{" "}
              <strong style={{ color: "#facc15" }}>{heaterVoltage.toFixed(1)} V</strong> → Resonant Wavelength:{" "}
              <strong style={{ color: "#38bdf8" }}>{tunedWavelengthNm} nm</strong>
            </label>
            <input
              type="range"
              min="0.0"
              max="5.0"
              step="0.2"
              value={heaterVoltage}
              onChange={(e) => setHeaterVoltage(parseFloat(e.target.value))}
              style={s.Slider}
            />
            <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "4px" }}>
              Click any block on the chip diagram (left) or adjust the bond-pad heater voltage above to see how electrical control tunes optical resonance!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 3: Material Platforms vs. Wavelength (0–14 μm) & Novel Modulators (Pages 5 & 15)
   ============================================================================ */
function Slide3MaterialsAndWavelengths() {
  const [selectedPlatform, setSelectedPlatform] = useState("SOI");

  const platforms = [
    {
      id: "AlO",
      name: "Al₂O₃ (Aluminum Oxide)",
      wlMin: 0.2,
      wlMax: 5.0,
      starWl: 0.4,
      app: "Trapped-ion quantum computing",
      color: "#94a3b8",
      details: "Wide bandgap dielectric transparent down to the UV/blue (200–400 nm), essential for addressing atomic transitions in trapped-ion quantum processors.",
    },
    {
      id: "GeOSi",
      name: "Ge-on-Si (Germanium-on-Silicon)",
      wlMin: 2.0,
      wlMax: 14.0,
      starWl: 10.0,
      app: "Mid-IR molecular gas sensing",
      color: "#fb923c",
      details: "Transparent across the Mid-IR molecular fingerprint window (2–14 μm) where SiO₂ absorbs strongly, enabling chip-scale spectroscopic gas sensors.",
    },
    {
      id: "TFLN",
      name: "TFLN (Thin-Film Lithium Niobate)",
      wlMin: 0.4,
      wlMax: 5.2,
      starWl: 1.5,
      app: "Co-packaged optics & >100 GHz modulators",
      color: "#4ade80",
      details: "Pure Pockels linear electro-optic effect (r₃₃ ≈ 31 pm/V) with zero carrier-absorption loss, supporting ultra-linear >100 GHz phase and amplitude modulators.",
    },
    {
      id: "FLWGB",
      name: "FLWGB (Femtosecond Laser Written Glass)",
      wlMin: 0.4,
      wlMax: 3.5,
      starWl: 0.5,
      app: "3D waveguides & biological sensing",
      color: "#a78bfa",
      details: "Direct 3D laser inscription in glass substrates for visible-wavelength lab-on-a-chip optofluidics and low-birefringence fiber interposers.",
    },
    {
      id: "SiN",
      name: "SiN (Silicon Nitride)",
      wlMin: 0.4,
      wlMax: 8.0,
      starWl: 1.55,
      app: "Quantum photonic computing & ultra-low-loss delay lines",
      color: "#f87171",
      details: "Ultra-low propagation loss (<0.05 dB/cm), zero two-photon absorption at 1550 nm, and visible-to-MIR transparency.",
    },
    {
      id: "InP",
      name: "InP (Indium Phosphide)",
      wlMin: 1.1,
      wlMax: 2.2,
      starWl: 1.55,
      app: "Monolithic lasers, SOAs & Quantum Key Distribution (QKD)",
      color: "#818cf8",
      details: "Direct bandgap III-V semiconductor enabling native monolithic lasers, semiconductor optical amplifiers (SOAs), and fast Franz-Keldysh/QCSE modulators.",
    },
    {
      id: "SOI",
      name: "SOI (Silicon-on-Insulator)",
      wlMin: 1.1,
      wlMax: 8.0,
      starWl: 1.55,
      app: "Photonic computing & high-volume 300mm CMOS Datacom",
      color: "#f472b6",
      details: "The workhorse of integrated photonics: leverages 300mm CMOS foundry infrastructure and high index contrast (Δn ≈ 2.0) for dense optical interconnects.",
    },
  ];

  const active = platforms.find((p) => p.id === selectedPlatform) || platforms[6];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.3 — WAVEGUIDE MATERIALS &amp; NOVEL MODULATORS)</div>
      <h2 style={s.SlideHeading}>
        &ldquo;There Is More Than One Integrated Photonics...&rdquo; (0–14 μm Spectrum)
      </h2>

      <div style={s.Grid2}>
        {/* Left: Interactive 0–14 μm Wavelength Transparency Chart (Recreates Page 5) */}
        <div style={s.SimBox}>
          <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "8px" }}>
            Click any waveguide platform bar below to inspect its spectral window and killer application (★):
          </div>

          <svg viewBox="0 0 460 200" style={{ width: "100%", height: "190px", background: "#050914", borderRadius: "8px" }}>
            {/* Wavelength Axis (0 to 14 μm) */}
            <line x1="75" y1="172" x2="435" y2="172" stroke="#64748b" strokeWidth="1.5" />
            {[0, 2, 4, 6, 8, 10, 12, 14].map((wl) => {
              const xPos = 75 + (wl / 14) * 360;
              return (
                <g key={wl}>
                  <line x1={xPos} y1="172" x2={xPos} y2="177" stroke="#94a3b8" />
                  <text x={xPos - 5} y="190" fill="#94a3b8" fontSize="9.5">{wl}</text>
                </g>
              );
            })}
            <text x="215" y="198" fill="#cbd5e1" fontSize="10" fontWeight="bold">Wavelength (μm)</text>

            {/* 7 Platform Bars */}
            {platforms.map((p, idx) => {
              const yPos = 16 + idx * 22;
              const xStart = 75 + (p.wlMin / 14) * 360;
              const width = ((p.wlMax - p.wlMin) / 14) * 360;
              const starX = 75 + (p.starWl / 14) * 360;
              const isSel = p.id === selectedPlatform;

              return (
                <g
                  key={p.id}
                  onClick={() => setSelectedPlatform(p.id)}
                  style={{ cursor: "pointer" }}
                >
                  <text
                    x="12"
                    y={yPos + 11}
                    fill={isSel ? "#facc15" : "#cbd5e1"}
                    fontSize="10"
                    fontWeight={isSel ? "bold" : "normal"}
                  >
                    {p.id}
                  </text>
                  <rect
                    x={xStart}
                    y={yPos}
                    width={width}
                    height="13"
                    fill={p.color}
                    opacity={isSel ? 0.95 : 0.45}
                    stroke={isSel ? "#ffffff" : "none"}
                    strokeWidth="1.5"
                    rx="3"
                  />
                  <text x={starX - 5} y={yPos + 11} fill="#facc15" fontSize="12" fontWeight="bold">★</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right: Selected Platform Details + Page 15 Novel Modulator Materials Table */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>
            {active.name} ({active.wlMin}–{active.wlMax} μm)
          </h3>
          <div style={s.FormulaBox}>
            ★ Primary Application (λ ≈ {active.starWl} μm): {active.app}
          </div>
          <p style={s.BodyText}>{active.details}</p>

          <div style={{ fontSize: "12px", fontWeight: 700, color: "#facc15", marginBottom: "6px" }}>
            Wafer-Scale Novel Modulator Materials on Silicon :
          </div>
          <table style={s.Table}>
            <thead>
              <tr>
                <th style={s.Th}>Modulation Type</th>
                <th style={s.Th}>Materials</th>
                <th style={s.Th}>Integration Approach</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={s.TdBold}>Pure-Phase (Pockels / Kerr)</td>
                <td style={s.Td}>LiNbO₃, BTO (Lumiphase), PZT, Organics (SilOriX), Ferroelectric Nematics</td>
                <td style={s.Td}>Bonding, Monolithic epitaxy, Deposition, Transfer printing, Inkjet</td>
              </tr>
              <tr>
                <td style={s.TdBold}>Amplitude &amp; Phase</td>
                <td style={s.Td}>Ge (SiGe), SiGe QWells, 2D Materials, III-V</td>
                <td style={s.Td}>Monolithic growth, Transfer printing, Wafer bonding</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 4: Commercial Market Ecosystem (PhotonDelta) & Top 10 Tech Giants (Pages 3 & 4)
   ============================================================================ */
function Slide4MarketEcosystemAndGiants() {
  const [sector, setSector] = useState("optical_io");

  const sectors = {
    optical_io: {
      title: "Chip-Scale Optical I/O & AI Interconnects",
      companies: ["Lightmatter (Passage photonic supercomputer interconnect)", "Ayar Labs (TeraPHY optical I/O chiplets)", "Celestial AI (Photonic Fabric)", "Xscape Photonics (Multi-wavelength comb lasers)"],
      why: "Eliminates the memory and GPU-to-GPU copper bandwidth wall in generative AI data centers.",
    },
    quantum: {
      title: "Quantum & Programmable Photonic Processors",
      companies: ["PsiQuantum (Fault-tolerant silicon photonic quantum computing)", "Xanadu (Squeezed-state photonic quantum cloud)", "QuiX Quantum (SiN quantum processors)", "iPronics (Programmable optical meshes)", "Optalysys & LightOn"],
      why: "Photons operate at room temperature with ultra-low decoherence and native fiber networking.",
    },
    lidar: {
      title: "FMCW Coherent LiDAR & Autonomous Navigation",
      companies: ["Aeva (4D FMCW LiDAR on chip)", "SiLC Technologies (Eye-safe 1550nm coherent vision)", "Aurora", "Scantinel Photonics", "Mobileye", "Voyant Photonics", "Analog Photonics"],
      why: "Integrates lasers, coherent balanced detectors, and optical phased arrays onto a fingernail-sized chip.",
    },
    biosensors: {
      title: "Bio-Sensors, Medical & Industrial Diagnostics",
      companies: ["Genalyte ( Maverick ring-resonator blood diagnostics)", "SiPhox Health (Home blood biomarker testing)", "SURFIX Diagnostics", "Delta Diagnostics", "Aryballe (Optical olfaction)", "Zero Point Motion (Optomechanical inertial sensors)", "Brolis & Indigo"],
      why: "Evanescent-field waveguide sensors detect label-free molecular binding at femtomolar sensitivity.",
    },
  };

  const top10Giants = [
    { name: "Nvidia", status: "✓ Investing", note: "3.5× power saving AI optical switches with TSMC" },
    { name: "Apple", status: "✓ Investing", note: "Apple Watch non-invasive optical health sensors" },
    { name: "Microsoft", status: "✓ Investing", note: "Azure co-packaged optics & optical cloud switches" },
    { name: "Alphabet", status: "✓ Investing", note: "TPU optical circuit switches (OCS) in AI clusters" },
    { name: "Amazon", status: "✓ Investing", note: "AWS 400G/800G/1.6T custom silicon photonics" },
    { name: "TSMC", status: "✓ Investing", note: "COUPE (Compact Universal Photonic Engine) 3D CPO" },
    { name: "Meta", status: "✓ Investing", note: "AI cluster optical interconnects & AR waveguide optics" },
    { name: "Broadcom", status: "✓ Investing", note: "Bailly 51.2 Tb/s co-packaged optical switch" },
    { name: "Saudi Aramco", status: "✕ No", note: "Energy sector" },
    { name: "Tesla", status: "? Unconfirmed", note: "Exploring optical interconnects for Dojo clusters" },
  ];

  const active = sectors[sector];

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.4 — COMMERCIAL LANDSCAPE &amp; TECH GIANTS </div>
      <h2 style={s.SlideHeading}>
        PhotonDelta Application Ecosystem &amp; Top 10 Global Companies Investing
      </h2>

      <div style={s.TabRow}>
        {[
          { id: "optical_io", label: "1. Chip-Scale Optical I/O" },
          { id: "quantum", label: "2. Quantum & Programmable" },
          { id: "lidar", label: "3. Coherent LiDAR" },
          { id: "biosensors", label: "4. Bio, Medical & Industrial Sensors" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSector(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: sector === t.id ? "#2563eb" : "#0f172a",
              color: sector === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: PhotonDelta Sector Breakdown */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>{active.title}</h3>
          <p style={s.BodyText}>{active.why}</p>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#facc15", marginBottom: "6px" }}>
            Key Commercial Players:
          </div>
          <ul style={s.List}>
            {active.companies.map((c) => (
              <li key={c} style={{ marginBottom: "4px" }}>{c}</li>
            ))}
          </ul>
        </div>

        {/* Right: Top 10 Most Valuable Companies Scorecard (Page 4) */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Top 10 Most Valuable Companies — Who Is Investing?</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", fontSize: "12px" }}>
            {top10Giants.map((g) => (
              <div
                key={g.name}
                style={{
                  background: "#060a17",
                  border: "1px solid #1e293b",
                  borderRadius: "6px",
                  padding: "6px 10px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
                  <span style={{ color: "#ffffff" }}>{g.name}</span>
                  <span
                    style={{
                      color: g.status.startsWith("✓")
                        ? "#34d399"
                        : g.status.startsWith("✕")
                        ? "#f87171"
                        : "#facc15",
                    }}
                  >
                    {g.status}
                  </span>
                </div>
                <div style={{ fontSize: "10.5px", color: "#94a3b8", marginTop: "2px" }}>
                  {g.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 5: End-to-End PIC Supply Chain & Foundry Economics (Pages 6, 7, 8, 9, 10)
   ============================================================================ */
function Slide5SupplyChainAndEconomics() {
  const [stage, setStage] = useState("foundries"); // "design" | "pdk" | "foundries" | "packaging"
  const [chipAreaMm2, setChipAreaMm2] = useState(10); // mm²

  const mpwCostUsd = chipAreaMm2 * 1500; // ~$1,500 / mm² for MPW (10-20 chips)
  const volumeCostPerChipUsd = chipAreaMm2 * 1; // ~$1 / mm² for >100k chips

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.5 — END-TO-END SUPPLY CHAIN &amp; IP ECONOMICS</div>
      <h2 style={s.SlideHeading}>
        Design Software, PDKs, Global Foundries, Packaging &amp; Fabless Pricing
      </h2>

      <div style={s.TabRow}>
        {[
          { id: "design", label: "1. Design / EDA Tools" },
          { id: "pdk", label: "2. Process Design Kits — PDK" },
          { id: "foundries", label: "3. Global Foundries Map" },
          { id: "packaging", label: "4. Photonic Packaging" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setStage(t.id)}
            style={{
              ...s.TabBtn,
              backgroundColor: stage === t.id ? "#2563eb" : "#0f172a",
              color: stage === t.id ? "#fff" : "#94a3b8",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={s.Grid2}>
        {/* Left: Supply Chain Stage Explorer */}
        <div style={s.Card}>
          {stage === "design" && (
            <div>
              <h3 style={s.CardTitle}>Stage 1: Photonic Design Automation (PDA / EDA)</h3>
              <p style={s.BodyText}>
                Software suites for waveguide mode solving (FDTD/EME), S-parameter circuit simulation (like SAX!), and mask layout generation (GDSII):
              </p>
              <ul style={s.List}>
                <li><strong>Open-Source Python Layout &amp; Sim:</strong> GDSFactory, Nazca Design, SAX.</li>
                <li><strong>Commercial EDA Leaders:</strong> Ansys Lumerical (Synopsys), Cadence, Mentor (Siemens), Luceda Photonics, Photon Design, VPIphotonics.</li>
                <li><strong>Design Houses:</strong> VLC Photonics (Hitachi), Wave Photonics.</li>
              </ul>
            </div>
          )}

          {stage === "pdk" && (
            <div>
              <h3 style={s.CardTitle}>Stage 2: Process Design Kits (PDKs)</h3>
              <p style={s.BodyText}>
                A <strong>PDK</strong> is a designer&apos;s main interface to engage with a fabrication foundry:
              </p>
              <ul style={s.List}>
                <li><strong>Disseminates Foundry Rules:</strong> Layer maps, minimum waveguide widths, and design rule checks (DRC).</li>
                <li><strong>Lowers Barrier &amp; De-Risks Tape-Out:</strong> Provides pre-validated building blocks (grating couplers, MMIs, high-speed modulators).</li>
                <li><strong>IP &amp; Licensing:</strong> Most commercial foundries use proprietary &ldquo;black-box&rdquo; PDK cells requiring strict NDA licenses—whereas <a href="https://cornerstone.sotonfab.co.uk/" target="_blank" rel="noreferrer" style={s.Link}>CORNERSTONE</a> operates with a <strong>100% license-free, open-source PDK model</strong>!</li>
              </ul>
            </div>
          )}

          {stage === "foundries" && (
            <div>
              <h3 style={s.CardTitle}>Stage 3: Global Wafer Foundries (Pure-Play ★ vs. R&amp;D ●)</h3>
              <ul style={s.List}>
                <li>
                  <strong>North America:</strong> GlobalFoundries (★), Intel (★), Tower Semiconductor (★), SkyWater (★), AIM Photonics (●), Applied Nanotools (●), C2MI (●), Skorpios (●).
                </li>
                <li>
                  <strong>Europe:</strong> STMicroelectronics (★), X-FAB (★), CORNERSTONE UK (●), imec Belgium (●), CEA-LETI France (●), IHP Germany (●), Fraunhofer (●), LioniX (●), LIGENTEC (●), VTT Finland (●).
                </li>
                <li>
                  <strong>Asia &amp; Oceania:</strong> TSMC Taiwan (★), UMC (★), Samsung Korea (★), AMF Singapore (★), SilTerra (★), SMIC (★), CompoundTek (●), CUMEC (●), IMECAS (●), PETRA Japan (●).
                </li>
              </ul>
            </div>
          )}

          {stage === "packaging" && (
            <div>
              <h3 style={s.CardTitle}>Stage 4: Photonic Assembly &amp; Packaging </h3>
              <p style={s.BodyText}>
                Transforms bare silicon dies into fiber-pigtailed, thermally stabilized, RF-wirebonded modules:
              </p>
              <ul style={s.List}>
                <li><strong>Pilot Line &amp; Institutes:</strong> <a href="https://www.argotech.cz/pixapp/" target="_blank" rel="noreferrer" style={s.Link}>PIXAPP</a> (European Photonic Packaging Pilot Line), Tyndall National Institute.</li>
                <li><strong>OSAT &amp; Assembly Specialists:</strong> <a href="https://www.phix.com/first-commercial-pic-based-module/" target="_blank" rel="noreferrer" style={s.Link}>PHIX Photonics Assembly</a>, Bay Photonics, Argotech, ALTER Technology.</li>
                <li><strong>High-Precision Equipment:</strong> AMICRA Microtechnologies (sub-micron flip-chip bonders).</li>
              </ul>
            </div>
          )}
        </div>

        {/* Right: Interactive Fabless Foundry Pricing Calculator (Page 10) */}
        <div style={s.SimBox}>
          <h3 style={s.CardTitle}>Interactive Fabless Cost Calculator </h3>
          <p style={s.BodyText}>
            Compare Multi-Project Wafer (MPW) prototyping costs against high-volume manufacturing (&gt;100,000 chips):
          </p>

          <label style={s.Label}>
            Select Your Photonic Chip Die Area: <strong>{chipAreaMm2} mm²</strong>
          </label>
          <input
            type="range"
            min="2"
            max="50"
            step="2"
            value={chipAreaMm2}
            onChange={(e) => setChipAreaMm2(Number(e.target.value))}
            style={s.Slider}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "12px" }}>
            <div style={{ background: "#060a17", border: "1px solid #1e3a8a", borderRadius: "8px", padding: "12px" }}>
              <div style={{ fontSize: "11px", color: "#38bdf8", fontWeight: 700 }}>
                1. MPW Prototyping (10–20 Chips)
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                Rule of thumb: ~$1,000&apos;s / mm²
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#facc15", marginTop: "6px", fontFamily: "monospace" }}>
                ~${mpwCostUsd.toLocaleString()}
              </div>
              <div style={{ fontSize: "10.5px", color: "#64748b" }}>Shared reticle shuttle run</div>
            </div>

            <div style={{ background: "#060a17", border: "1px solid #065f46", borderRadius: "8px", padding: "12px" }}>
              <div style={{ fontSize: "11px", color: "#34d399", fontWeight: 700 }}>
                2. High Volume (&gt;100k Chips)
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "2px" }}>
                Rule of thumb: ~$1 / mm²
              </div>
              <div style={{ fontSize: "20px", fontWeight: 800, color: "#34d399", marginTop: "6px", fontFamily: "monospace" }}>
                ~${volumeCostPerChipUsd.toLocaleString()} / chip
              </div>
              <div style={{ fontSize: "10.5px", color: "#64748b" }}>1,000× cost drop at wafer scale!</div>
            </div>
          </div>

          <div style={{ fontSize: "11.5px", color: "#cbd5e1", marginTop: "10px", lineHeight: 1.5 }}>
            <strong>IP Ownership Split:</strong> Designer retains circuit design IP | Foundry retains fabrication process IP.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 6: Real-World Examples — 200 Gbaud Transmitter & Lab-on-Chip Biosensor (Pages 11 & 12)
   ============================================================================ */
function Slide6RealWorldExamples() {
  const [exampleTab, setExampleTab] = useState("transmitter"); // "transmitter" | "biosensor"
  const [analyteConc, setAnalyteConc] = useState(40); // Biomarker binding concentration (0 to 100)

  // Eye opening height for 200 Gbaud OOK
  const eyeOpeningPx = 38;

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.6 — REAL-WORLD PIC DEVICE EXAMPLES </div>
      <h2 style={s.SlideHeading}>
        Case Studies: 200 Gbaud Data-Centre Transmitter &amp; Microfluidic Biosensor
      </h2>

      <div style={s.TabRow}>
        <button
          onClick={() => setExampleTab("transmitter")}
          style={{
            ...s.TabBtn,
            backgroundColor: exampleTab === "transmitter" ? "#2563eb" : "#0f172a",
            color: exampleTab === "transmitter" ? "#fff" : "#94a3b8",
          }}
        >
          Example 1: 200 Gbaud Data-Centre Transmitter
        </button>
        <button
          onClick={() => setExampleTab("biosensor")}
          style={{
            ...s.TabBtn,
            backgroundColor: exampleTab === "biosensor" ? "#2563eb" : "#0f172a",
            color: exampleTab === "biosensor" ? "#fff" : "#94a3b8",
          }}
        >
          Example 2: Evanescent-Field Microfluidic Biosensor
        </button>
      </div>

      {exampleTab === "transmitter" ? (
        <div style={s.Grid2}>
          <div style={s.Card}>
            <h3 style={s.CardTitle}>World-Record 200 Gbaud OOK Silicon Photonics Transmitter</h3>
            <div style={s.FormulaBox}>
              Modulation: 200 Gbaud On-Off Keying (OOK)
              <br />
              Measured ER: 1.19 dB &nbsp;|&nbsp; Pre-FEC BER: 1 × 10⁻²
            </div>
            <ul style={s.List}>
              <li>
                <strong>University of Southampton Benchmark:</strong> Demonstrated by G. T. Reed et al. (<em>IEEE Silicon Photonics Conference</em>, London, UK, 2025), achieving a record 200 Gbaud symbol rate in an all-silicon depletion modulator configuration.
              </li>
              <li>
                <strong>AI Infrastructure Impact:</strong> Nvidia &amp; TSMC are collaborating to integrate silicon photonics directly into AI switch clusters, delivering a <strong>3.5× system power saving</strong> over electrical interconnects.
              </li>
            </ul>
          </div>

          <div style={s.SimBox}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
              <span style={{ color: "#facc15", fontWeight: 700 }}>200G OOK Optical Eye Diagram</span>
              <span style={{ color: "#38bdf8", fontFamily: "monospace" }}>ER: 1.19 dB | BER: 1e-2</span>
            </div>
            <svg viewBox="0 0 420 165" style={{ width: "100%", height: "160px", background: "#040812", borderRadius: "8px", border: "1px solid #1e293b" }}>
              {/* Oscilloscope Grid */}
              {[35, 82, 130].map((y) => (
                <line key={y} x1="20" y1={y} x2="400" y2={y} stroke="#1e293b" strokeDasharray="3,3" />
              ))}
              {[110, 210, 310].map((x) => (
                <line key={x} x1={x} y1="15" x2={x} y2="150" stroke="#1e293b" strokeDasharray="3,3" />
              ))}

              {/* 200 Gbaud Eye Traces */}
              <path d={`M 20,40 L 400,40`} stroke="#0284c7" strokeWidth="6" opacity="0.45" />
              <path d={`M 20,125 L 400,125`} stroke="#0284c7" strokeWidth="6" opacity="0.45" />
              <path d="M 20,40 C 75,40 95,125 150,125 C 205,125 225,40 280,40 C 335,40 355,125 400,125" fill="none" stroke="#38bdf8" strokeWidth="2.5" />
              <path d="M 20,125 C 75,125 95,40 150,40 C 205,40 225,125 280,125 C 335,125 355,40 400,40" fill="none" stroke="#38bdf8" strokeWidth="2.5" />

              {/* Eye Opening Indicator */}
              <line x1="215" y1={82 - eyeOpeningPx} x2="215" y2={82 + eyeOpeningPx} stroke="#facc15" strokeWidth="2" />
              <text x="165" y="24" fill="#facc15" fontSize="11" fontWeight="bold">200G OOK Eye Opening</text>
              <text x="35" y="146" fill="#facc15" fontSize="11" fontWeight="bold">ER: 1.19 dB</text>
              <text x="295" y="146" fill="#facc15" fontSize="11" fontWeight="bold">BER: 1e-2</text>
            </svg>
          </div>
        </div>
      ) : (
        <div style={s.Grid2}>
          <div style={s.Card}>
            <h3 style={s.CardTitle}>Integrated Microfluidic Biosensor Cartridge </h3>
            <p style={s.BodyText}>
              An optofluidic diagnostic cartridge combining a <strong>SiNOH laser array</strong>,{" "}
              <strong>Single-Mode (SM) waveguides</strong>, a <strong>Microfluidic chamber</strong>, and a{" "}
              <strong>Grating Coupler (GC) array</strong> read out by a camera:
            </p>
            <ul style={s.List}>
              <li>
                <strong>Antibody Functionalization (AB1, AB2, AB3):</strong> Each MZI/waveguide sensor arm is coated with specific Y-shaped capture antibodies.
              </li>
              <li>
                <strong>Label-Free Evanescent Sensing:</strong> When target biomarker molecules (<strong>M1, M2, M3</strong>) flow through the liquid analyte inlet and bind to AB1/AB2/AB3, they alter the local cladding refractive index within the evanescent tail—shifting the interferometer phase!
              </li>
            </ul>
          </div>

          <div style={s.SimBox}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px" }}>
              <span style={{ color: "#34d399", fontWeight: 700 }}>Multiplexed Antibody Waveguide Array</span>
              <span style={{ color: "#facc15", fontFamily: "monospace" }}>
                Phase Shift Δϕ = {(analyteConc * 0.042).toFixed(2)}π rad
              </span>
            </div>

            <svg viewBox="0 0 420 150" style={{ width: "100%", height: "145px", background: "#050914", borderRadius: "8px" }}>
              {/* Microfluidic Chamber Box */}
              <rect x="35" y="12" width="350" height="126" fill="rgba(6, 182, 212, 0.1)" stroke="#38bdf8" strokeWidth="1.5" rx="6" />
              <text x="45" y="28" fill="#38bdf8" fontSize="10" fontWeight="bold">Microfluidic Chamber (Liquid Analyte Flow ──►)</text>

              {/* Channel 1: AB1 + M1 (Yellow Squares) */}
              <path d="M 45,52 Q 210,36 375,52" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="340" y="46" fill="#fde047" fontSize="9.5" fontWeight="bold">AB1 + M1</text>

              {/* Channel 2: AB2 + M2 (Blue Circles) */}
              <path d="M 45,85 Q 210,69 375,85" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="340" y="79" fill="#60a5fa" fontSize="9.5" fontWeight="bold">AB2 + M2</text>

              {/* Channel 3: AB3 + M3 (Green Triangles) */}
              <path d="M 45,118 Q 210,102 375,118" fill="none" stroke="#ef4444" strokeWidth="3" />
              <text x="340" y="112" fill="#4ade80" fontSize="9.5" fontWeight="bold">AB3 + M3</text>

              {/* Bound Analyte Molecules along Waveguides */}
              {[100, 145, 190, 235, 280].slice(0, Math.ceil(analyteConc / 20)).map((x) => (
                <g key={x}>
                  <rect x={x} y="36" width="8" height="8" fill="#facc15" />
                  <circle cx={x + 4} cy="72" r="4.5" fill="#3b82f6" />
                  <polygon points={`${x},110 ${x + 8},110 ${x + 4},102`} fill="#22c55e" />
                </g>
              ))}
            </svg>

            <div style={{ marginTop: "8px" }}>
              <label style={s.Label}>
                Inject Target Biomarker Concentration (M1, M2, M3): <strong>{analyteConc}% Binding</strong>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                step="20"
                value={analyteConc}
                onChange={(e) => setAnalyteConc(Number(e.target.value))}
                style={s.Slider}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   SLIDE 7: Remaining System Challenges & Future Chiplets/CPO Architecture (Pages 13 & 14)
   ============================================================================ */
function Slide7ChallengesAndFutureTrends() {
  const [tempDeltaK, setTempDeltaK] = useState(10); // Temperature fluctuation in Kelvin
  const [viewStep, setViewStep] = useState(1); // 1, 2, or 3 corresponding to red circles on Page 14

  // Silicon thermo-optic shift: dλ/dT ≈ 0.08 nm/K at 1550 nm
  const thermalDriftNm = +(tempDeltaK * 0.08).toFixed(2);

  const stepDescriptions = {
    1: "Step ① — Electronic & Photonic Chiplets on TGV Interposer: High-speed Electronic Driver/Switch Chiplet sits millimeters away from the Photonic Chiplet on an electro-optic interposer with Through-Glass Vias (TGVs).",
    2: "Step ② — Evanescent Waveguide Coupling into Interposer: Light couples adiabatically from the Photonic Chiplet into low-loss waveguides embedded inside the electro-optic glass interposer.",
    3: "Step ③ — 2D Microlens Array to Pluggable Optical Connector: Turning mirrors and a 2D microlens array collimate 100–1,000s of parallel optical channels vertically into a detachable Pluggable Optical Connector!",
  };

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.7 — SYSTEM CHALLENGES &amp; FUTURE CPO TRENDS)</div>
      <h2 style={s.SlideHeading}>
        Remaining Hurdles to Mass Adoption &amp; Chiplet Interposer Architecture
      </h2>

      <div style={s.Grid2}>
        {/* Left: 6 Key System-Level Challenges (Page 13) + Thermal Drift Simulator */}
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Remaining System-Level Challenges </h3>
          <ul style={s.List}>
            <li><strong>Laser Integration Complexity:</strong> Silicon&apos;s indirect bandgap requires complex III-V bonding or external laser coupling.</li>
            <li><strong>Packaging &amp; Alignment Costs:</strong> Sub-micron fiber alignment accounts for up to 50–70% of total module cost.</li>
            <li><strong>Manufacturing Tolerances:</strong> ±1 nm waveguide width variation shifts ring resonance by ~0.8 nm.</li>
            <li><strong>Thermal Sensitivity &amp; Control:</strong> High thermo-optic coefficient (<code style={s.Code}>dn/dT ≈ 1.86×10⁻⁴ K⁻¹</code>) requires active thermal stabilization.</li>
            <li><strong>Lifecycle &amp; Lab-to-Fab Translation:</strong> Bridging R&amp;D prototyping with high-volume 300mm foundries.</li>
          </ul>

          <div style={{ marginTop: "10px", padding: "10px", background: "#060a17", borderRadius: "8px", border: "1px solid #1e3a8a" }}>
            <label style={s.Label}>
              Simulate Chip Temperature Fluctuation (ΔT): <strong>+{tempDeltaK} K</strong> → Ring Wavelength Drift:{" "}
              <strong style={{ color: "#f87171" }}>+{thermalDriftNm} nm</strong>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="2"
              value={tempDeltaK}
              onChange={(e) => setTempDeltaK(Number(e.target.value))}
              style={s.Slider}
            />
          </div>
        </div>

        {/* Right: Interactive Future Chiplet & CPO Cross-Section (Recreates Page 14) */}
        <div style={s.SimBox}>
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setViewStep(n)}
                style={{
                  ...s.ModeToggleBtn,
                  backgroundColor: viewStep === n ? "#dc2626" : "#1e293b",
                }}
              >
                Inspect Hotspot ({n})
              </button>
            ))}
          </div>

          <svg viewBox="0 0 460 175" style={{ width: "100%", height: "165px", background: "#050914", borderRadius: "8px" }}>
            {/* Green PCB Base */}
            <rect x="20" y="140" width="420" height="24" fill="#15803d" stroke="#4ade80" strokeWidth="1.5" />
            <text x="35" y="156" fill="#ffffff" fontSize="10" fontWeight="bold">Printed Circuit Board (PCB)</text>

            {/* Pluggable Electrical Connector (Left) */}
            <rect x="30" y="75" width="42" height="65" fill="#0284c7" stroke="#38bdf8" rx="4" />
            <text x="25" y="65" fill="#94a3b8" fontSize="9">Pluggable Elec. (100-1000s)</text>

            {/* Electro-Optic Interposer with TGVs */}
            <rect x="95" y="102" width="335" height="28" fill="#cbd5e1" stroke="#64748b" strokeWidth="1.5" />
            <text x="205" y="120" fill="#0f172a" fontSize="9.5" fontWeight="bold">Interposer (Electro-Optic)</text>
            {/* Gold TGV Pillars */}
            {[115, 145, 175, 205, 385, 410].map((x) => (
              <line key={x} x1={x} y1="102" x2={x} y2="140" stroke="#eab308" strokeWidth="4" />
            ))}
            <text x="150" y="118" fill="#0f172a" fontSize="9" fontWeight="bold">TGVs</text>

            {/* Electronic Chiplet & Photonic Chiplet */}
            <rect x="105" y="72" width="85" height="26" fill="#334155" stroke="#94a3b8" />
            <text x="112" y="88" fill="#ffffff" fontSize="9.5" fontWeight="bold">Electronic Chiplet</text>
            <rect x="200" y="72" width="85" height="26" fill="#475569" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="208" y="88" fill="#38bdf8" fontSize="9.5" fontWeight="bold">Photonic Chiplet</text>

            {/* Optical Path + 2D Microlens Array + Pluggable Optical Connector */}
            <path d="M 275,98 L 295,112 L 355,112" fill="none" stroke="#ef4444" strokeWidth="2.5" />
            <line x1="335" y1="102" x2="335" y2="68" stroke="#ef4444" strokeWidth="2" />
            <line x1="348" y1="102" x2="348" y2="68" stroke="#ef4444" strokeWidth="2" />
            <line x1="361" y1="102" x2="361" y2="68" stroke="#ef4444" strokeWidth="2" />
            <rect x="325" y="22" width="48" height="42" fill="#38bdf8" stroke="#0284c7" rx="4" />
            <text x="380" y="38" fill="#cbd5e1" fontSize="9" fontWeight="bold">Pluggable Optical</text>
            <text x="380" y="50" fill="#94a3b8" fontSize="8.5">2D Microlens Array</text>

            {/* Numbered Red Hotspots 1, 2, 3 */}
            <circle cx="298" cy="84" r="9" fill="#dc2626" stroke="#fff" />
            <text x="295" y="88" fill="#fff" fontSize="10" fontWeight="bold">1</text>
            <circle cx="305" cy="122" r="9" fill="#dc2626" stroke="#fff" />
            <text x="302" y="126" fill="#fff" fontSize="10" fontWeight="bold">2</text>
            <circle cx="385" cy="68" r="9" fill="#dc2626" stroke="#fff" />
            <text x="382" y="72" fill="#fff" fontSize="10" fontWeight="bold">3</text>
          </svg>

          <p style={{ fontSize: "12px", color: "#cbd5e1", marginTop: "8px", lineHeight: 1.5 }}>
            {stepDescriptions[viewStep]}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   SLIDE 8: Authoritative Web References & Chapter 3 Self-Assessment Quiz
   ============================================================================ */
function Slide8ReferencesAndQuiz() {
  const [showQuizAns, setShowQuizAns] = useState(false);

  return (
    <div>
      <div style={s.Tag}>⚡ CHAPTER 3.8 — WEB REFERENCES &amp; CHAPTER 3 MASTERY QUIZ</div>
      <h2 style={s.SlideHeading}>
        Verified Industry &amp; Academic Sources + Self-Assessment
      </h2>

      <div style={s.Grid2}>
        <div style={s.Card}>
          <h3 style={s.CardTitle}>Authoritative Literature &amp; Foundry Portals</h3>
          <ul style={s.List}>
            <li style={{ marginBottom: "8px" }}>
              <a
                href="https://pubs.aip.org/aip/apl/article/118/22/220501/150902/Perspective-on-the-future-of-silicon-photonics-and"
                target="_blank"
                rel="noreferrer"
                style={s.Link}
              >
                Margalit, Xiang, Bowers et al., Applied Physics Letters (2021)
              </a>
              : <em>&ldquo;Perspective on the future of silicon photonics and electronics&rdquo;</em> — defines the 5-generation evolution from pluggable transceivers to 3D co-packaged optics with integrated lasers.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a
                href="https://cornerstone.sotonfab.co.uk/"
                target="_blank"
                rel="noreferrer"
                style={s.Link}
              >
                CORNERSTONE Open-Source Silicon Photonics Foundry (UK)
              </a>
              : License-free, open-source PDK and multi-project wafer (MPW) prototyping across SOI, SiN, and Ge-on-Si platforms hosted at the University of Southampton.
            </li>
            <li style={{ marginBottom: "8px" }}>
              <a
                href="https://www.phix.com/first-commercial-pic-based-module/"
                target="_blank"
                rel="noreferrer"
                style={s.Link}
              >
                PIXAPP Pilot Line &amp; PHIX Photonics Assembly
              </a>
              : Standardized photonic packaging rules, fiber array attachment, and hybrid electro-optic module assembly.
            </li>
          </ul>
        </div>

        <div style={s.Card}>
          <h3 style={s.CardTitle}>Chapter 3 Mastery Self-Quiz</h3>
          <ol style={{ ...s.List, marginBottom: "12px" }}>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q1 (Integration Roadmap):</strong> What is the primary architectural difference between Gen III (2.5D CPO) and Gen V (3D CPO)?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q2 (Materials):</strong> Which waveguide platform covers the 2–14 μm Mid-IR window for molecular gas sensing, and which reaches UV/blue (~0.4 μm) for trapped-ion quantum computing?
            </li>
            <li style={{ marginBottom: "6px" }}>
              <strong>Q3 (Foundry Economics):</strong> How does the approximate cost per mm² compare between an MPW prototyping run (10–20 chips) and high-volume production (&gt;100k chips)?
            </li>
          </ol>

          <button onClick={() => setShowQuizAns(!showQuizAns)} style={s.ModeToggleBtn}>
            {showQuizAns ? "Hide Answers" : "Reveal Answers"}
          </button>

          {showQuizAns && (
            <div style={{ marginTop: "10px", padding: "10px", background: "#060a17", borderRadius: "8px", fontSize: "12px", color: "#cbd5e1", lineHeight: 1.55 }}>
              <div>• <strong>A1:</strong> Gen III places PIC chiplets side-by-side with the switch ASIC on a 2.5D interposer using an external laser supply, whereas Gen V stacks electronic and photonic dies in 3D with directly integrated on-chip lasers.</div>
              <div>• <strong>A2:</strong> <strong>Ge-on-Si (GeOSi)</strong> covers 2–14 μm for Mid-IR gas sensing; <strong>Al₂O₃ (AlO)</strong> reaches down to UV/blue for trapped-ion quantum computing.</div>
              <div>• <strong>A3:</strong> MPW prototyping costs <strong>~$1,000&apos;s / mm²</strong>, whereas high-volume manufacturing (&gt;100k chips) drops to <strong>~$1 / mm²</strong>.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PICBuildingBlocksSupplyChainAndChallengesSection() {
  return (
    <Slideshow
      slides={[
        Slide1MergingPhotonicsElectronics,
        Slide2CircuitBuildingBlocks,
        Slide3MaterialsAndWavelengths,
        Slide4MarketEcosystemAndGiants,
        Slide5SupplyChainAndEconomics,
        Slide6RealWorldExamples,
        Slide7ChallengesAndFutureTrends,
        Slide8ReferencesAndQuiz,
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
  Table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#060a17",
    borderRadius: "8px",
    overflow: "hidden",
    fontSize: "11.5px",
  },
  Th: {
    backgroundColor: "#0f172a",
    color: "#38bdf8",
    textAlign: "left",
    padding: "6px 8px",
    borderBottom: "1px solid #1e293b",
    fontWeight: 700,
  },
  Td: {
    padding: "6px 8px",
    borderBottom: "1px solid #1e293b",
    color: "#cbd5e1",
  },
  TdBold: {
    padding: "6px 8px",
    borderBottom: "1px solid #1e293b",
    color: "#ffffff",
    fontWeight: 700,
  },
};