import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchMediaStackAPI = async (searchText, date, category) => {
  try {
    const response = await axios.get(`https://content.guardianapis.com/search?q=${searchText || category}&from-date=${date}`, {
      params: { 
        "api-key": import.meta.env.VITE_MEDIASTACK_API_KEY,
        'show-fields': 'all',
      }
    });
    return response ? normalizeNewsData(response.data.response.results, "MediaStack") : [];
  } catch (error) {
    throw new Error(error.message);
  }
};
