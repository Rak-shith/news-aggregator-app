import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchMediaStackAPI = async (searchText) => {
  try {
    const response = await axios.get(`https://api.mediastack.com/v1/news`, {
      params: {
        access_key: import.meta.env.VITE_MEDIASTACK_API_KEY,
        keywords: searchText,
        countries: "in,us,gb"
      }
    });
    return normalizeNewsData(response.data.data, "MediaStack");
  } catch (error) {
    throw new Error(error.message);
  }
};
