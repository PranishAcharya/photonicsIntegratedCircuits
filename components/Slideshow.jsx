import React, { useState, useEffect } from "react";

export default function Slideshow({ slides = [] }) {
  const [current, setCurrent] = useState(0);

  // Reset to first slide whenever the chapter/slides array changes
  useEffect(() => {
    setCurrent(0);
  }, [slides]);

  const total = slides.length;
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(total - 1, c + 1));

  // Keyboard navigation (Left / Right arrows)
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT") return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (!total) return null;

  const CurrentSlide = slides[current];
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <div style={styles.Wrapper}>
      {/* Top Progress Bar */}
      <div style={styles.ProgressTrack}>
        <div style={{ ...styles.ProgressFill, width: `${progressPercent}%` }} />
      </div>

      {/* Main Slide Content Stage */}
      <div style={styles.SlideStage}>
        {typeof CurrentSlide === "function" ? <CurrentSlide /> : CurrentSlide}
      </div>

      {/* Bottom Navigation Footer (Left Circle, Pill Dots, Right Blue Circle) */}
      <div style={styles.Footer}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            ...styles.CircleBtn,
            ...styles.PrevCircle,
            opacity: current === 0 ? 0.35 : 1,
            cursor: current === 0 ? "not-allowed" : "pointer",
          }}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div style={styles.DotsContainer}>
          {slides.map((_, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                style={{
                  ...styles.Dot,
                  width: isActive ? "28px" : "9px",
                  backgroundColor: isActive ? "#2563eb" : "#334155",
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        <button
          onClick={next}
          disabled={current === total - 1}
          style={{
            ...styles.CircleBtn,
            ...styles.NextCircle,
            opacity: current === total - 1 ? 0.35 : 1,
            cursor: current === total - 1 ? "not-allowed" : "pointer",
          }}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
}

const styles = {
  Wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "calc(100vh - 96px)",
    backgroundColor: "#0a1024",
    borderRadius: "0 0 16px 16px",
    overflow: "hidden",
    border: "1px solid #1e293b",
    borderTop: "none",
  },
  ProgressTrack: {
    width: "100%",
    height: "4px",
    backgroundColor: "#1e293b",
  },
  ProgressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    transition: "width 0.3s ease",
  },
  SlideStage: {
    flex: 1,
    padding: "48px 64px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    overflowY: "auto",
  },
  Footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 32px",
    backgroundColor: "#070b19",
    borderTop: "1px solid #161f38",
  },
  CircleBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "none",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
    color: "#ffffff",
  },
  PrevCircle: {
    backgroundColor: "#161f33",
    color: "#94a3b8",
  },
  NextCircle: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    boxShadow: "0 4px 14px rgba(37, 99, 235, 0.4)",
  },
  DotsContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  Dot: {
    height: "9px",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.25s ease",
  },
};
