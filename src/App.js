import "./App.css";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="main-app">
      <Navbar />
      <AudioPlayer />
    </div>
  );
}

export default App;
