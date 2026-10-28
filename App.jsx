import React, { useState } from "react";

// Automatically discover every .jsx file inside ./sections/
const sectionModules = import.meta.glob("./sections/*.jsx", { eager: true });

const topics = Object.entries(sectionModules)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB))
  .map(([path, mod], index) => {
    const fileName = path.split("/").pop().replace(".jsx", "");
    const cleanName = fileName
      .replace(/^\d+[_-]?/, "")
      .replace(/([A-Z])/g, " $1")
      .trim();
    return {
      id: path,
      title: mod.title || `${index + 1}. ${cleanName || fileName}`,
      Component: mod.default,
    };
  });

export default function App() {
  const [topicIdx, setTopicIdx] = useState(0);

  const totalTopics = topics.length;
  const activeTopic = topics[topicIdx];

  return (
    <div style={styles.Page}>
      <div style={styles.Container}>
        {/* Top Header Bar matching your screenshot */}
        <header style={styles.Header}>
          <div style={styles.HeaderLeft}>
            <span style={styles.Bolt}>⚡</span>
            <span style={styles.Brand}>Photonics IC</span>
            <span style={styles.Divider}>|</span>
            <span style={styles.TopicBadge}>
              Topic {totalTopics ? topicIdx + 1 : 0} / {totalTopics}
            </span>
          </div>

          {/* Center Chapter Dropdown */}
          <div style={styles.DropdownWrapper}>
            <select
              value={topicIdx}
              onChange={(e) => setTopicIdx(Number(e.target.value))}
              style={styles.Select}
            >
              {topics.map((t, i) => (
                <option key={t.id} value={i} style={{ background: "#0f172a" }}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {/* Right Topic Prev / Next Buttons */}
          <div style={styles.HeaderRight}>
            <button
              onClick={() => setTopicIdx((i) => Math.max(0, i - 1))}
              disabled={topicIdx === 0}
              style={{
                ...styles.TopBtn,
                opacity: topicIdx === 0 ? 0.4 : 1,
                cursor: topicIdx === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Prev
            </button>
            <button
              onClick={() => setTopicIdx((i) => Math.min(totalTopics - 1, i + 1))}
              disabled={topicIdx >= totalTopics - 1}
              style={{
                ...styles.TopBtnNext,
                opacity: topicIdx >= totalTopics - 1 ? 0.4 : 1,
                cursor: topicIdx >= totalTopics - 1 ? "not-allowed" : "pointer",
              }}
            >
              Next →
            </button>
          </div>
        </header>

        {/* Render Active Section File */}
        {activeTopic && activeTopic.Component ? (
          <activeTopic.Component />
        ) : (
          <div style={{ padding: 48, background: "#0a1024" }}>
            Add a <code>.jsx</code> file inside <code>sections/</code> to begin.
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  Page: {
    minHeight: "100vh",
    backgroundColor: "#050814",
    padding: "16px",
  },
  Container: {
    maxWidth: "1280px",
    margin: "0 auto",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
  },
  Header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    padding: "12px 24px",
    backgroundColor: "#070b19",
    border: "1px solid #1e293b",
    borderRadius: "16px 16px 0 0",
  },
  HeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    whiteSpace: "nowrap",
  },
  Bolt: {
    color: "#facc15",
    fontSize: "18px",
  },
  Brand: {
    fontWeight: 700,
    fontSize: "15px",
    color: "#f8fafc",
  },
  Divider: {
    color: "#334155",
    margin: "0 4px",
  },
  TopicBadge: {
    backgroundColor: "#1d4ed8",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 700,
    padding: "4px 12px",
    borderRadius: "999px",
  },
  DropdownWrapper: {
    flex: 1,
    maxWidth: "560px",
  },
  Select: {
    width: "100%",
    padding: "8px 14px",
    backgroundColor: "#0f1629",
    color: "#f8fafc",
    border: "1px solid #26334d",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    outline: "none",
    cursor: "pointer",
  },
  HeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  TopBtn: {
    padding: "7px 14px",
    backgroundColor: "#161f33",
    color: "#94a3b8",
    border: "1px solid #26334d",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
  },
  TopBtnNext: {
    padding: "7px 14px",
    backgroundColor: "#172554",
    color: "#60a5fa",
    border: "1px solid #1e3a8a",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 600,
  },
};
