import { useEffect, useRef, useState } from "react";
import { IoPlayBack, IoPlayForward } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { COVER_IMG_URL } from "../../constants";
import playIcon from "../../assets/play.svg";
import pauseIcon from "../../assets/pause.svg";
import { ImageWrapper, RenderVolumeIcon } from "../commonComponents";
import { getFormattedTime } from "../../utils";
import "./index.css";

const AudioPlayer = ({
  song = {},
  currentIndex,
  setCurrentIndex,
  allSongs,
  setSelectedSong,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.5); // Initial volume
  const audioRef = useRef(null);
  const imgUrl = `${COVER_IMG_URL}/${song?.cover}`;

  // Function to handle song changes and playback
  const handleSongChange = () => {
    if (song?.isDefault) return;
    if (isPlaying) {
      audioRef?.current?.pause(); // Pause the current audio playback
    }

    if (audioRef?.current?.src !== song?.url) {
      audioRef.current.src = song?.url; // Set the new audio source
      audioRef?.current?.load();
      audioRef?.current?.play(); // Start playback
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    handleSongChange(); // Call the song change handler when the song changes
    // eslint-disable-next-line
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio?.addEventListener("timeupdate", updateTime);

    return () => {
      audio?.removeEventListener("timeupdate", updateTime);
    };
  }, []);

  const togglePlayPause = () => {
    if (song?.isDefault) return setSelectedSong(allSongs?.[0]);
    setIsPlaying(!isPlaying);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Start playback in response to user interaction
      audioRef.current.play();
    }
  };

  const playNextSong = () => {
    if (song?.isDefault) return setSelectedSong(allSongs?.[1]);
    const nextIndex = (currentIndex + 1) % allSongs?.length || 0;
    setSelectedSong(allSongs?.[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsPlaying(true); // Start playback when changing songs
  };

  const playPreviousSong = () => {
    if (song?.isDefault) return setSelectedSong(allSongs?.[0]);
    const previousIndex =
      (currentIndex - 1 + allSongs?.length) % allSongs?.length || 0;
    setSelectedSong(allSongs?.[previousIndex]);
    setCurrentIndex(previousIndex);
    setIsPlaying(true); // Start playback when changing songs
  };

  const handleSeek = (event) => {
    const seekTime = parseFloat(event?.target?.value);
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event?.target?.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleSoundClick = () => {
    const currVolume = audioRef.current.volume;
    if (currVolume > 0) {
      audioRef.current.volume = 0;
      setVolume(0);
    } else {
      audioRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  const endedEvent = () => {
    playNextSong();
  };

  const stylesObj = {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
    background: "var(--background-gradient)",
  };

  return (
    <div className="player-container">
      <div>
        <p className="song-header">{song?.name}</p>
        <p className="song-artist">{song?.artist}</p>
      </div>
      <div className="cover-container">
        <ImageWrapper
          imgSrc={imgUrl}
          alt={"cover-img"}
          className={"cover-pic"}
          style={stylesObj}
        />
      </div>
      <div>
        <input
          type="range"
          value={currentTime}
          max={audioRef?.current?.duration || 0}
          onChange={handleSeek}
          className="level"
        />
      </div>
      <audio ref={audioRef} onEnded={endedEvent}></audio>
      <div className="song-duration">
        <p>{getFormattedTime(currentTime)}</p>
        <p>{getFormattedTime(audioRef?.current?.duration)}</p>
      </div>
      <div className="controls">
        <div className="icon-container">
          <BsThreeDots className="control-icon" />
        </div>
        <div className="icon-play">
          <IoPlayBack className="control-icon" onClick={playPreviousSong} />
          <div>
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt="play-pause"
              onClick={togglePlayPause}
              className="play-pause"
            />
          </div>
          <IoPlayForward className="control-icon" onClick={playNextSong} />
        </div>
        <div className="icon-container sound">
          <RenderVolumeIcon volume={volume} onClickAction={handleSoundClick} />
          {/* Volume slider */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            orient="vertical"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
