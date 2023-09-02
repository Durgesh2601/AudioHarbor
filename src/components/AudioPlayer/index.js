import { useCallback, useEffect, useState } from "react";
import "./index.css";
import { FOR_YOU_TAB, TOP_TRACKS_TAB } from "../../constants";
import { getSongsData } from "../../api";
import PlayListItem from "./PlayList";

const AudioPlayer = ({ src }) => {
  const [activeTab, setActiveTab] = useState(FOR_YOU_TAB);
  const [searchQuery, setSearchQuery] = useState("");
  const [allSongs, setAllSongs] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const getAllSongs = useCallback(async () => {
    try {
      const response = await getSongsData();
      const songs = response?.data?.data || [];
      setAllSongs(songs);
      setPlayList(songs);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  useEffect(() => {
    setSelectedTabSongs();
    // eslint-disable-next-line
  }, [activeTab]);

  useEffect(() => {
    if (selectedSong) {
      const bgColor = `linear-gradient(108deg, ${selectedSong?.accent} 2.46%, #000 99.84%)`;
      document.documentElement.style.setProperty(
        "--background-gradient",
        bgColor
      );
    }
  }, [selectedSong]);

  const setSelectedTabSongs = () => {
    const topTracks = allSongs?.filter((song) => song?.top_track);
    const playListMap = {
      [FOR_YOU_TAB]: allSongs,
      [TOP_TRACKS_TAB]: topTracks,
    };
    setPlayList(playListMap[activeTab]);
  };

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
        <button className="search-button">
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
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </button>
      </div>
      {/* Playlist Render */}
      <div className="playlist-container">
        {playList?.length > 0 &&
          playList?.map((song) => {
            return (
              <PlayListItem
                key={song?.id}
                song={song}
                selectedSong={selectedSong}
                setSelectedSong={setSelectedSong}
              />
            );
          })}
      </div>
    </div>
  );
};

export default AudioPlayer;
