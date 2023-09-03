import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import PlayList from "./components/PlayList";
import "./App.css";

function App() {
  const [playList, setPlayList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="main-app">
      <Navbar />
      <PlayList
        {...{
          selectedSong,
          setSelectedSong,
          playList,
          setPlayList,
          setCurrentIndex,
        }}
      />
      {selectedSong && (
        <AudioPlayer
          song={selectedSong}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          allSongs={playList}
          setSelectedSong={setSelectedSong}
        />
      )}
    </div>
  );
}

export default App;
