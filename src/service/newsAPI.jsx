import axios from "axios";
import { normalizeNewsData } from "../utils/normalizeNewsData";

export const fetchNewsAPI = async (searchText, date, category) => {
  try {
    const searchUrl = `https://newsapi.org/v2/everything?q=${searchText}&from=${date}`;
    const topHeadUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
    const categoryUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}`;
    
    const url = searchText ? searchUrl : (category ? categoryUrl : topHeadUrl);

    // Fetch the data using axios
    const response = await axios.get(url, { 
      params: { 
        apiKey: import.meta.env.VITE_NEWS_API_KEY
      }
    });
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