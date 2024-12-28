import { useEffect,  useState } from "react";
import NewsCard from "../components/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  setAllFilters
} from "../store/newsSlice";
import Loader from "../Loader/Loader";
import useDebounce from "../CustomHook/useDebounce";
import FilterComp from "../components/FilterComp";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles,  status, error } =
    useSelector((state) => state.news);

  const [searchText, setSearchText] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "general",
    dateBy: "",
    source: "all",
  });

  const debouncedSearchInput = useDebounce(searchText, 1000);


  useEffect(() => {
    dispatch(
      fetchNews({
        searchText: debouncedSearchInput,
        date: filters.dateBy,
        category: filters.sortBy,
        source: filters.source,
      })
    );
  }, [debouncedSearchInput, filters.dateBy, filters.sortBy, filters.source, dispatch]);

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
    dispatch(setAllFilters({ field: name, value }));
    setTimeout(() => {
      setIsFiltering(false);
    }, 500);
  };

  const handleCategoryChange = (category) => {
    dispatch(setAllFilters({ field: "category", value: category }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: category,
    }));
  }
  
  const handleSourceChange = (source) => {
    dispatch(setAllFilters({ field: "source", value: source }));
    setFilters((prevFilters) => ({
      ...prevFilters,
      source,
    }));
  }

  return (
    <div className="">
      <FilterComp
        searchText={searchText}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleCategoryChange={handleCategoryChange}
        handleSourceChange={handleSourceChange}
        sortBy={filters.category}
        dateBy={filters.dateBy}
        source={filters.source}
      />

      <h2 className="text-center">News Feed</h2>

      {status === "loading" || isFiltering ? <Loader /> : null}
      {status === "failed" && <p>Error: {error}</p>}

      <div className="d-flex flex-wrap justify-content-center">
        {articles.length > 0 ? (
          articles.map((article, index) => (
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
