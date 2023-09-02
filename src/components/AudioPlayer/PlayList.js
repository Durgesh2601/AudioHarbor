import { useEffect, useState } from "react";
import { COVER_IMG_URL } from "../../constants";

const PlayListItem = ({ song = {} }) => {
  const [songDuration, setSongDuration] = useState("");
  const assestUrl = `${COVER_IMG_URL}/${song?.cover}`;

  useEffect(() => {
    if (Object.keys(song).length) {
      const audio = new Audio(song.url);
      audio.addEventListener("loadedmetadata", () => {
        const duration = audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        setSongDuration(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
      });
      return () => {
        audio.removeEventListener("loadedmetadata", () => {});
      };
    }
  }, [song]);
  return (
    <div className="playlist-item">
      <img
        src={assestUrl}
        alt="cover-img"
        width={40}
        height={40}
        className="cover-img"
      />
      <div className="song-details">
        <p className="song-name">{song?.name}</p>
        <p className="artist">{song?.artist}</p>
      </div>
      <div className="duration">
        <p className="song-duration">{songDuration}</p>
      </div>
    </div>
  );
};

export default PlayListItem;
