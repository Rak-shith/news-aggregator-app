import { useEffect, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setFilters } from "../../store/newsSlice";
import Loader from "../Loader/Loader";
import useDebounce from "../CustomHook/useDebounce";
import FilterComp from "../FilterComp/FilterComp";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, filters, status, error } = useSelector((state) => state.news);
  console.log(JSON.stringify(articles), "articlessss");
  console.log(JSON.stringify(filters), "filtersssss");

  const [searchInput, setSearchInput] = useState(filters.q || ""); 
  const [localFilters, setLocalFilters] = useState(filters);
  const debouncedSearchInput = useDebounce(searchInput, 1000);
  
  useEffect(() => {
    if (debouncedSearchInput !== filters.q) {
      dispatch(setFilters({ ...filters, q: debouncedSearchInput })); 
      // dispatch(fetchNews({ ...filters, q: debouncedSearchInput }));
    }
  }, [debouncedSearchInput, dispatch, filters]);

  useEffect(() => {
    dispatch(fetchNews(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLocalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleApplyFilters = () => {
    dispatch(setFilters({ ...filters, ...localFilters }));
    dispatch(fetchNews({ ...filters, ...localFilters }));
  };

  return (
    <div className="">
      <FilterComp
        searchInput={searchInput} 
        handleFilterChange={handleFilterChange}
        handleSearchInputChange={handleSearchInputChange}
        handleApplyFilters={handleApplyFilters}
        sortBy={localFilters.sortBy}
        from={localFilters.from}
        country={localFilters.country}
        // to={localFilters.to}
      />

      <h2 className="text-center">News Feed</h2>

      {status === "loading" && <Loader />}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {articles.length === 0 && !filters.q && <p>No search term entered. Please enter a keyword to search.</p>}
        {status === "succeeded" && articles
        ?.filter((article) => article.urlToImage)
        ?.map((article, index) => {
          return (
            <NewsCard
              key={index}
              id={article.source.id}
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
