import { COVER_IMG_URL } from "../../constants";

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

  return (
    <div
      className="playlist-item"
      onClick={handleSelectSong}
      style={{
        ...(selectedSong?.id === song?.id ? selectedStyle : {}),
      }}
    >
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
        <p className="song-duration">{song?.duration || "--:--"}</p>
      </div>
    </div>
  );
};

export default PlayListItem;
