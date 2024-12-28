import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchNewsAPI = async (searchText, date, category) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchText || category}&from=${date}`, { 
      params: { 
        apiKey: import.meta.env.VITE_NEWS_API_KEY 
      }
    });
    console.log(response.data.articles, "NewsAPI");
    return response ? normalizeNewsData(response.data.articles, "NewsAPI") : [];
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchSourceAPI = async ( category ) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources`, { 
      params: { 
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        category: category || 'general' 
      }
    });
    return  response ? normalizeNewsData(response.data.sources) : [];
  } catch (error) {
    throw new Error(error.message);
  }
};