// All methods that are used in components are defined here
export const getAfterSearchData = (data, query) => {
  const filteredData = data?.filter((item) => {
    const name = item?.name?.toLowerCase();
    const artist = item?.artist?.toLowerCase();
    return name?.includes(query) || artist?.includes(query);
  });
  return filteredData || [];
};

export const getValidSongs = (songs) => {
  const validSongs =
    songs?.filter((item) => {
      // Regular expression to match valid audio file extensions (mp3, wav, etc.)
      const audioUrlRegex = /\.(mp3|wav|ogg)$/i;
      // Check if the 'url' property is present and contains a valid audio URL
      if (item?.hasOwnProperty("url") && audioUrlRegex.test(item?.url)) {
        // Create a new object with the cleaned URL and the rest of the properties
        return true;
      }
      return false;
    }) || [];
  // Clean the URL by removing all spaces
  const mappedSongs = validSongs.map((song) => ({
    ...song,
    url: song?.url?.replace(/\s/g, ""),
  }));
  return mappedSongs || [];
};

// This method return the formatted duration of the song in minutes and seconds
export const getFormattedTime = (duration) => {
  const minutes = Math.floor(duration / 60) || 0;
  const seconds = Math.floor(duration % 60) || 0;
  const formattedDuration = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  return formattedDuration || "0:00";
};

// This method return song's duration, needed to implement this because api response doesn't include duration
export const getAudioDuration = (audioUrl) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(audioUrl);
    audio.addEventListener("loadedmetadata", () => {
      resolve(audio.duration);
    });
    audio.addEventListener("error", () => {
      reject("Error loading audio");
    });
  });
};
