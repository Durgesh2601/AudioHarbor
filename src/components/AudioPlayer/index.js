import { useState } from "react";
import "./index.css";

const AudioPlayer = ({ src }) => {
  const [activeTab, setActiveTab] = useState("For You");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="audio-player">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === "For You" ? "active" : ""}`}
          onClick={() => handleTabClick("For You")}
        >
          For You
        </div>
        <div
          className={`tab ${activeTab === "Top Tracks" ? "active" : ""}`}
          onClick={() => handleTabClick("Top Tracks")}
        >
          Top Tracks
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
