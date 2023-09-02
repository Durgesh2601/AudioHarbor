import { COVER_IMG_URL } from "../../constants";
import "./index.css";

const AudioPlayer = ({ song = {} }) => {
  const imgUrl = `${COVER_IMG_URL}/${song?.cover}`;
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
        height={400}
        className="cover-pic"
      />
    </div>
  );
};

export default AudioPlayer;
