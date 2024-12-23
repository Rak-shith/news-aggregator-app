import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchNewsAPI = async (searchText, date) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${searchText}&from=${date}&sortBy=publishedAt`, { 
      params: { 
        apiKey: import.meta.env.VITE_NEWS_API_KEY 
      }
    });
    return normalizeNewsData(response.data.articles, "NewsAPI");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchSourceAPI = async ( category ) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources?category=${category}apiKey=API_KEY`, { 
      params: { 
        apiKey: import.meta.env.VITE_NEWS_API_KEY 
      }
    });
    return response.data.sources;
  } catch (error) {
    throw new Error(error.message);
  }
};