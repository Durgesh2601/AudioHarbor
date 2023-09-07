import { useCallback, useEffect, useState } from "react";
import AudioPlayer from "./components/AudioPlayer";
import Navbar from "./components/Navbar";
import PlayList from "./components/PlayList";
import "./App.css";
import { MenuIcon, RenderDrawer } from "./components/commonComponents";
import MainLoader from "./components/Loader/MainLoader";
import { getSongsData } from "./api";
import { getValidSongs } from "./utils";
import { FOR_YOU_TAB, TOP_TRACKS_TAB } from "./constants";

function App() {
  const [playList, setPlayList] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDrawer, setIsDrawer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allSongs, setAllSongs] = useState([]);
  const [playListMap, setPlayListMap] = useState({});

  const getAllSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getSongsData();
      const songs = response?.data?.data || [];
      const validSongs = getValidSongs(songs); //using this method because the response has some invalid song urls
      const topTracks = validSongs?.filter((song) => song?.top_track);
      const mappedPlayList = {
        [FOR_YOU_TAB]: validSongs,
        [TOP_TRACKS_TAB]: topTracks,
      };
      setPlayListMap(mappedPlayList);
      setAllSongs(validSongs);
      setPlayList(validSongs);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getAllSongs();
  }, [getAllSongs]);

  return (
    <div className="main-app">
      <Navbar />
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          <PlayList
            {...{
              selectedSong,
              setSelectedSong,
              playList,
              setPlayList,
              setCurrentIndex,
              playListMap,
              allSongs,
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
          <MenuIcon {...{ setIsDrawer }} />
        </>
      )}
      {isDrawer && (
        <RenderDrawer
          {...{
            isDrawer,
            setIsDrawer,
            playList,
            setPlayList,
            setCurrentIndex,
            selectedSong,
            setSelectedSong,
            playListMap,
            allSongs,
          }}
        />
      )}
    </div>
  );
}

export default App;
