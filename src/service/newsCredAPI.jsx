import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchMediaStackAPI = async (searchText, date, category) => {
  try {
    const response = await axios.get(`https://content.guardianapis.com/search?from-date=${date}`, {
      params: { 
        q: searchText || category,
        "api-key": import.meta.env.VITE_MEDIASTACK_API_KEY,
        'show-fields': 'all',
      }
    });
    console.log(response.data.response.result, "MediaStack");
    return response ? normalizeNewsData(response.data.response.result, "MediaStack") : [];
  } catch (error) {
    throw new Error(error.message);
  }
};
