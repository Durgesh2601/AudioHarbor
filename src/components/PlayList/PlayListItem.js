import { COVER_IMG_URL } from "../../constants";
import { ImageWrapper } from "../commonComponents";

const PlayListItem = ({
  song = {},
  setSelectedSong,
  selectedSong = {},
  setCurrentIndex,
  index,
}) => {
  const assestUrl = `${COVER_IMG_URL}/${song?.cover}`;

  const handleSelectSong = () => {
    setSelectedSong(song);
    setCurrentIndex(index);
  };

  const selectedStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
  };
  const stylesObj = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "var(--background-gradient)",
  };
  return (
    <div
      className="playlist-item"
      onClick={handleSelectSong}
      style={{
        ...(selectedSong?.id === song?.id ? selectedStyle : {}),
      }}
    >
      <ImageWrapper
        imgSrc={assestUrl}
        alt={"cover-img"}
        className={"cover-img"}
        width={40}
        height={40}
        style={stylesObj}
      />
      <div className="song-details">
        <p className="song-name">{song?.name}</p>
        <p className="artist">{song?.artist}</p>
      </div>
      <div className="duration">
        <p className="song-duration">{song?.duration || "--:--"}</p>
      </div>
    </div>
  );
};

export default PlayListItem;
