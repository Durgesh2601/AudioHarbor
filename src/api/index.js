import axios from "axios";

export const getSongsData = () => {
  const URL = `https://cms.samespace.com/items/songs`;
  return axios.get(URL);
};
