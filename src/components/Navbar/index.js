import logo from "../../assets/spotifyLogo.svg";
import "./index.css";
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="Spotify Logo" width={140} />
    </div>
  );
};

export default Navbar;
