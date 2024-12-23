import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchNYTAPI = async (searchText) => {
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}`, {
      params: { "api-key": import.meta.env.VITE_NYT_API_KEY }
    });
    return normalizeNewsData(response.data.response.docs, "NYT");
  } catch (error) {
    throw new Error(error.message);
  }
};
