import { useState } from "react";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import PlayList from "./components/PlayList";

function App() {
  const [selectedSong, setSelectedSong] = useState(null);

  return (
    <div className="main-app">
      <Navbar />
      <PlayList {...{ selectedSong, setSelectedSong }} />
      {selectedSong && <AudioPlayer song={selectedSong} />}
    </div>
  );
}

export default App;
