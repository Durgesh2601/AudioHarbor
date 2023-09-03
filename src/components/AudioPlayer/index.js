import { useEffect, useRef, useState } from "react";
import { IoPlayBack, IoPlayForward, IoVolumeMedium } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { COVER_IMG_URL } from "../../constants";
import playIcon from "./play.svg";
import pauseIcon from "./pause.svg";
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

  const iconStyle = {
    color: "#fff",
    opacity: 0.6,
    cursor: "pointer",
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
        <div className="icon-container">
          <BsThreeDots style={{ ...iconStyle }} />
        </div>
        <div className="icon-play">
          <IoPlayBack style={{ ...iconStyle }} />
          <div>
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt="play-pause"
              onClick={togglePlayPause}
            />
          </div>
          <IoPlayForward style={{ ...iconStyle }} />
        </div>
        <div className="icon-container">
          <IoVolumeMedium style={{ ...iconStyle }} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
