import axios from "axios";

export const fetchNewsAPI = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
  );
  
  return res?.data?.articles.map((article) => ({
    title: article.title,
    description: article.description,
    url: article.url,
    image: article.urlToImage,
  }));
};

export const fetchGuardianAPI = async () => {
  const res = await axios.get(
    `http://api.mediastack.com/v1/news?access_key=${import.meta.env.VITE_NEWS_DATA_API_KEY}`
  );
  return res.data.response.results.map((article) => ({
    title: article.webTitle,
    description: "The Guardian article",
    url: article.webUrl,
    image: null,
  }));
};