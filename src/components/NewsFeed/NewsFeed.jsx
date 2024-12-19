import axios from "axios";
import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  const fetchNewsAPINew = async () => {
    // const NEWS_API_KEY = import.meta.env.NEWS_API_KEY;
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`
      );
      setNews(res?.data?.articles || []);
      console.log(res?.data?.articles, "Alldataaaa");
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNewsAPINew();
  }, []);

  return (
    <div className="container">
      <h2 className="">All News</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {news
        .filter((article) => article.urlToImage)
        .map((article, index) => {
          return (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.urlToImage}
              url={article.url}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
