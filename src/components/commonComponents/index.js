import { useState, useEffect, useCallback } from "react";
import { BsFillVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";
import { IoVolumeMedium } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import PlayList from "../PlayList";

const RenderVolumeIcon = ({ volume, onClickAction }) => {
  const iconRenderer = () => {
    switch (true) {
      case volume === 0:
        return (
          <BsFillVolumeMuteFill
            className="control-icon"
            size={24}
            onClick={onClickAction}
          />
        );
      case volume > 0 && volume <= 0.5:
        return (
          <BsVolumeDownFill
            className="control-icon"
            size={24}
            onClick={onClickAction}
          />
        );
      default:
        return (
          <IoVolumeMedium
            className="control-icon"
            onClick={onClickAction}
            size={22}
          />
        );
    }
  };
  return <>{iconRenderer()}</>;
};

const RenderDrawer = ({
  isDrawer,
  setIsDrawer,
  playList,
  setPlayList,
  setCurrentIndex,
  selectedSong,
  setSelectedSong,
  playListMap,
  allSongs,
}) => {
  const customStyle = {
    width: "100%",
    display: isDrawer ? "block" : "none",
  };

  return (
    <div className={`drawer ${isDrawer ? "open" : ""}`}>
      <div className="close-icon">
        <IoCloseSharp size={25} onClick={() => setIsDrawer(false)} />
      </div>
      <div className="drawer-content">
        <PlayList
          {...{
            playList,
            setPlayList,
            setCurrentIndex,
            selectedSong,
            setSelectedSong,
            customStyle,
            playListMap,
            allSongs,
          }}
        />
      </div>
    </div>
  );
};

const MenuIcon = ({ setIsDrawer }) => {
  return (
    <div className="menu-icon">
      <FiMenu size={28} onClick={() => setIsDrawer((prev) => !prev)} />
    </div>
  );
};

const Shimmer = ({ style = {} }) => {
  return <div className="box animate" style={{ ...style }} />;
};

const ImageWrapper = ({
  imgSrc = "",
  style = {},
  imgStyle = {},
  className = "",
  width = 40,
  height = 40,
  alt = "img",
}) => {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const checkImgLoader = useCallback(() => {
    if (imgSrc) {
      const image = new Image();
      image.onload = () => {
        setIsImgLoaded(true);
      };
      image.src = imgSrc;
    }
  }, [imgSrc]);

  useEffect(() => {
    checkImgLoader();
  }, [checkImgLoader]);

  return isImgLoaded ? (
    <img
      src={imgSrc}
      alt={alt}
      style={{ ...imgStyle }}
      className={className}
      width={width}
      height={height}
    />
  ) : (
    <Shimmer style={{ ...style }} />
  );
};

export { RenderVolumeIcon, RenderDrawer, MenuIcon, ImageWrapper };
