// All methods that are used in components are defined here
export const getAfterSearchData = (data, query) => {
  const filteredData = data?.filter((item) => {
    const name = item?.name?.toLowerCase();
    const artist = item?.artist?.toLowerCase();
    return name?.includes(query) || artist?.includes(query);
  });
  return filteredData || [];
};
