import { useEffect, useRef, useState } from "react";
import { COVER_IMG_URL } from "../../constants";
import "./index.css";

const AudioPlayer = ({ song = {} }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume
  const audioRef = useRef(null);
  const imgUrl = `${COVER_IMG_URL}/${song?.cover}`;
  useEffect(() => {
    if (song) {
      const audio = audioRef?.current;
      // Load the selected song when it changes
      audio.src = song?.url;

      // Play or pause the song based on the isPlaying state
      if (isPlaying) {
        audio?.play();
      } else {
        audio?.pause();
      }
    }
  }, [song, isPlaying]);
  // Update the currentTime state based on the audio's timeupdate event
  useEffect(() => {
    const audio = audioRef?.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio?.addEventListener("timeupdate", updateTime);

    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  // Handle play/pause toggle
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  return (
    <div className="player-container">
      <div>
        <h2>{song?.name}</h2>
        <p className="song-artist">{song?.artist}</p>
      </div>
      <img
        src={imgUrl}
        alt="cover-img"
        width={400}
        height={340}
        className="cover-pic"
      />
      <div>
        <progress
          value={currentTime}
          max={audioRef?.current?.duration || 0}
        ></progress>
      </div>
      <audio ref={audioRef}></audio>
      <div className="controls">
        <div></div>
        <div></div>
        <div></div>
        <button onClick={togglePlayPause}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
