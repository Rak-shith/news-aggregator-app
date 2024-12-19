import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setFilters } from "../../store/newsSlice";
import Loader from "../Loader/Loader";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, filters, status, error } = useSelector((state) => state.news);
  console.log(JSON.stringify(articles), "articlessss");
  console.log(JSON.stringify(filters), "filtersssss");

  const [isInitialLoading, setIsInitialLoading] = useState(true); 
  
  useEffect(() => {
    dispatch(fetchNews(filters));
  }, [filters, dispatch]);

  useEffect(() => {
    if (status !== "loading" && articles.length > 0) {
      setIsInitialLoading(false);
    }
  }, [status, articles]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  return (
    <div className="container">
      <h2 className="">News Feed</h2>

      {isInitialLoading && <Loader type="spinner" message="Loading page..." isLoading={isInitialLoading} size="lg" />}

      {!isInitialLoading && (
        <div className="filters">
          <input
            type="text"
            name="q"
            placeholder="Keyword"
            value={filters.q}
            onChange={handleFilterChange}
          />
          <select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
            <option value="popularity">Popularity</option>
            <option value="relevancy">Relevancy</option>
            <option value="publishedAt">Latest</option>
          </select>
          <input
            type="date"
            name="from"
            value={filters.from}
            onChange={handleFilterChange}
          />
          <input
            type="date"
            name="to"
            value={filters.to}
            onChange={handleFilterChange}
          />
        </div>
      )}

      {status === "loading" && !articles.length && !isInitialLoading && <Loader type="spinner" message="Loading articles..." isLoading={status === "loading"} size="lg" />}

      {status === "failed" && <p>Error: {error}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {articles.length === 0 && !filters.q && <p>No search term entered. Please enter a keyword to search.</p>}
        {articles
        ?.filter((article) => article.urlToImage)
        ?.map((article, index) => {
          return (
            <NewsCard
              key={index}
              title={article.title}
              description={article.description}
              image={article.urlToImage}
              url={article.url}
              author={article?.author}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewsFeed;
