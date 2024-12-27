import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchMediaStackAPI = async (searchText) => {
  try {
    const response = await axios.get(`https://content.guardianapis.com/search?q=${searchText}`, {
      params: { "api-key": import.meta.env.VITE_MEDIASTACK_API_KEY }
    });
    return normalizeNewsData(response.data.data, "MediaStack");
  } catch (error) {
    throw new Error(error.message);
  }
};
