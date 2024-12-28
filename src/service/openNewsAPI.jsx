import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchNYTAPI = async (searchText, date, category) => {
  try {
    const response = await axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json`, {
      params: { 
        fq: searchText,
        from: date,
        "api-key": import.meta.env.VITE_NYT_API_KEY,
        category: category,
      }
    });
    console.log(response.data.response.docs, "NYT");
    return response ? normalizeNewsData(response.data.response.docs, "NYT") : [];
  } catch (error) {
    throw new Error(error.message);
  }
};
