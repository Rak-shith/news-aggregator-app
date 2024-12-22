import { useEffect, useMemo, useState } from "react";
import NewsCard from "../components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  fetchMediaStackNews,
  fetchNYTNews,
} from "../store/newsSlice";
import Loader from "../Loader/Loader";
import useDebounce from "../CustomHook/useDebounce";
import FilterComp from "../components/FilterComp";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, mediaStackArticles, nytArticles, status, error } =
    useSelector((state) => state.news);

  const allArticles = useMemo(() => {
    return [
      ...articles.map((item) => ({
        ...item,
        source: "NewsAPI",
      })),
      ...mediaStackArticles.map((item) => ({
        ...item,
        source: "MediaStack",
      })),
      ...nytArticles.map((item) => ({
        ...item,
        source: "NYT",
      })),
    ];
  }, [articles, mediaStackArticles, nytArticles]);

  const [searchText, setSearchText] = useState("tesla");
  const [filters, setFilters] = useState({
    sortBy: "general",
    dateBy: "2024-12-20",
    source: "NewsAPI",
  });

  const debouncedSearchInput = useDebounce(searchText, 1000);

  useEffect(() => {
    if (debouncedSearchInput) {
      dispatch(
        fetchNews({ searchText: debouncedSearchInput, date: filters.dateBy })
      );
      dispatch(fetchMediaStackNews(debouncedSearchInput));
      dispatch(fetchNYTNews(debouncedSearchInput));
    }
  }, [debouncedSearchInput, filters.dateBy, dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredArticles = useMemo(() => {
    const { dateBy, sortBy, source } = filters;

    return allArticles.filter((article) => {
      const matchesSearch =
        !debouncedSearchInput ||
        article?.title
          ?.toLowerCase()
          .includes(debouncedSearchInput?.toLowerCase()) ||
        article?.description
          ?.toLowerCase()
          .includes(debouncedSearchInput?.toLowerCase());

      const matchesDate =
        !dateBy ||
        new Date(article?.published_at).toISOString().split("T")[0] === dateBy;

      const matchesCategory =
        sortBy === "general" || article?.category === sortBy;

      const matchesSource = source === "NewsAPI" || article?.source === source;

      if (!debouncedSearchInput) {
        return matchesDate || matchesCategory || matchesSource;
      } else {
        return (
          matchesSearch && (matchesDate || matchesCategory || matchesSource)
        );
      }
    });
  }, [allArticles, filters, debouncedSearchInput]);

  return (
    <div className="">
      <FilterComp
        searchText={searchText}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleApplyFilters={() => {}}
        sortBy={filters.category}
        dateBy={filters.dateBy}
        source={filters.source}
      />

      <h2 className="text-center">News Feed</h2>

      {status === "loading" && <Loader />}
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
