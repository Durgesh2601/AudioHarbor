import { BsFillVolumeMuteFill, BsVolumeDownFill } from "react-icons/bs";
import { IoVolumeMedium } from "react-icons/io5";

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

export { RenderVolumeIcon };
