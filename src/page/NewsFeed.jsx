import { useEffect, useMemo, useState } from "react";
import NewsCard from "../components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  fetchMediaStackNews,
  fetchNYTNews,
  fetchSourceNews,
} from "../store/newsSlice";
import Loader from "../Loader/Loader";
import useDebounce from "../CustomHook/useDebounce";
import FilterComp from "../components/FilterComp";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, categoryList, mediaStackArticles, nytArticles, status, error } =
    useSelector((state) => state.news);

  const [searchText, setSearchText] = useState("tesla");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "general",
    dateBy: "2024-12-25",
    source: "NewsAPI",
  });

  const debouncedSearchInput = useDebounce(searchText, 1000);

  useEffect(() => {
    if (debouncedSearchInput) {
      const fetchAllNews = async () => {
        await Promise.all([
          dispatch(fetchNews({ searchText: debouncedSearchInput, date: filters.dateBy })),
          dispatch(fetchMediaStackNews(debouncedSearchInput)),
          dispatch(fetchNYTNews(debouncedSearchInput)),
          dispatch(fetchSourceNews({category: filters.sortBy})),
        ]);
      };
      fetchAllNews();
    }
  }, [debouncedSearchInput, filters.dateBy, filters.sortBy, dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    setIsFiltering(true);
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setTimeout(() => {
      setIsFiltering(false);
    }, 500);
  };

  const allArticles = useMemo(
    () => [
      ...articles.map((item) => ({ ...item, source: "NewsAPI" })),
      ...mediaStackArticles.map((item) => ({ ...item, source: "MediaStack" })),
      ...nytArticles.map((item) => ({ ...item, source: "NYT" })),
      ...categoryList.map((item) => ({ ...item })),
    ],
    [articles, mediaStackArticles, nytArticles, categoryList]
  );

  const filteredArticles = useMemo(() => {
    const { dateBy, sortBy, source } = filters;
  
    return allArticles.filter((article) => {
      const matchesSearch = debouncedSearchInput
        ? article.title?.toLowerCase().includes(debouncedSearchInput.toLowerCase()) ||
          article.description?.toLowerCase().includes(debouncedSearchInput.toLowerCase())
        : true;
  
      const matchesDate = dateBy
        ? new Date(article.published_at).toISOString().split("T")[0] === dateBy
        : true;
  
      const matchesCategory =
        sortBy === "general" || article.category?.toLowerCase() === sortBy.toLowerCase();
  
      const matchesSource =
        source === "NewsAPI" || article.source?.toLowerCase() === source.toLowerCase();
  
      return matchesSearch && matchesDate && matchesCategory && matchesSource;
    });
  }, [allArticles, filters, debouncedSearchInput]);
  

  return (
    <div className="">
      <FilterComp
        searchText={searchText}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        sortBy={filters.category}
        dateBy={filters.dateBy}
        source={filters.source}
      />

      <h2 className="text-center">News Feed</h2>

      {status === "loading" || isFiltering ? <Loader /> : null}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <NewsCard key={index} {...article} />
          ))
        ) : (
          <p>No articles found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default NewsFeed;
