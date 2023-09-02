import { useCallback, useState } from "react";
import "./index.css";
import { FOR_YOU_TAB, TOP_TRACKS_TAB } from "../../constants";

const AudioPlayer = ({ src }) => {
  const [activeTab, setActiveTab] = useState(FOR_YOU_TAB);
  const [searchQuery, setSearchQuery] = useState("");
const getAllSongs = useCallback(() => {
        
}, [])

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="audio-player">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === FOR_YOU_TAB ? "active" : ""}`}
          onClick={() => handleTabClick(FOR_YOU_TAB)}
        >
          For You
        </div>
        <div
          className={`tab ${activeTab === TOP_TRACKS_TAB ? "active" : ""}`}
          onClick={() => handleTabClick(TOP_TRACKS_TAB)}
        >
          Top Tracks
        </div>
      </div>
      <div className="input-container">
        <input
          placeholder="Search Song, Artist"
          type="text"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        <button class="search-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            className="search-icon"
          >
            <g opacity="0.4">
              <path
                d="M25.6668 25.6666L20.6668 20.6666L25.6668 25.6666ZM6.33343 14.6666C6.33343 10.0643 10.0644 6.33331 14.6668 6.33331C19.2692 6.33331 23.0001 10.0643 23.0001 14.6666C23.0001 19.269 19.2692 23 14.6668 23C10.0644 23 6.33343 19.269 6.33343 14.6666Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;