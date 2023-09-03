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
