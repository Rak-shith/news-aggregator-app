import { useEffect, useMemo, useState } from "react";
import NewsCard from "../NewsCard/NewsCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, fetchMediaStackNews, fetchNYTNews } from "../../store/newsSlice";
import Loader from "../Loader/Loader";
import useDebounce from "../CustomHook/useDebounce";
import FilterComp from "../FilterComp/FilterComp";

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { articles, mediaStackArticles, nytArticles, status, error } = useSelector((state) => state.news);
  // console.log(JSON.stringify(articles), "articlessss");
  // console.log(JSON.stringify(filters), "filtersssss");

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

  console.log("allArticlesssssssssss", allArticles);
  

  const [searchText, setSearchText] = useState("tesla");
  const [filters, setFilters] = useState({
    sortBy: "general",
    dateBy: "2024-12-20",
    source: "NewsAPI",
  });

  // const [searchInput, setSearchInput] = useState(filters.q || ""); 
  // const [filteredArticles, setFilteredArticles] = useState(allArticles);
  const debouncedSearchInput = useDebounce(searchText, 1000);
  
  useEffect(() => {
    if (debouncedSearchInput) {
      dispatch(fetchNews({searchText: debouncedSearchInput, date: filters.dateBy}));
      dispatch(fetchMediaStackNews(debouncedSearchInput));
      dispatch(fetchNYTNews(debouncedSearchInput));
    }
  }, [debouncedSearchInput, filters.dateBy, dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    debugger
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredArticles = useMemo(() => {
    const { dateBy, sortBy, source } = filters;
  
    return allArticles.filter((article) => {
      // Handle search text
      const matchesSearch =
        !debouncedSearchInput ||
        article?.title?.toLowerCase().includes(debouncedSearchInput?.toLowerCase()) ||
        article?.description?.toLowerCase().includes(debouncedSearchInput?.toLowerCase());
  
      // Handle date filter
      const matchesDate =
        !dateBy ||
        new Date(article?.published_at).toISOString().split("T")[0] === dateBy;
  
      // Handle category filter
      const matchesCategory = sortBy === "general" || article?.category === sortBy;
  
      // Handle source filter
      const matchesSource = source === "NewsAPI" || article?.source === source;
  
      // Include article if any filter matches (when search is empty) or all criteria match when search exists
      if (!debouncedSearchInput) {
        return matchesDate || matchesCategory || matchesSource;
      } else {
        return matchesSearch && (matchesDate || matchesCategory || matchesSource);
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
          filteredArticles.map((article, index) => <NewsCard key={index} {...article} />)
        ) : (
          <p>No articles found for the selected filters.</p>
        )}
      </div>
    </div>


    // <div>
    //   <input
    //     type="text"
    //     value={searchText}
    //     onChange={handleSearch}
    //     placeholder="Search news..."
    //     className="form-control mb-3"
    //   />
      
    //   {status === "loading" && <Loader />}
    //   {status === "failed" && <p>Error: {error}</p>}

    //   <h2>News Feed</h2>

    //   <div className="d-flex flex-wrap justify-content-center">
    //     {/* Render News Cards for NewsAPI */}
    //     {allArticles && allArticles
    //     ?.filter((article) => article.image)
    //     ?.map((article, index) => (
    //       <NewsCard key={index} {...article} />
    //     ))}
        
    //     {/* Render News Cards for MediaStack */}
    //     {/* {mediaStackArticles && mediaStackArticles.map((article, index) => (
    //       <NewsCard key={index} {...article} />
    //     ))} */}

    //     {/* Render News Cards for NYT */}
    //     {/* {nytArticles && nytArticles.map((article, index) => (
    //       <NewsCard key={index} {...article} />
    //     ))} */}
    //     {/* {articles.length === 0 && !filters.q && <p>No search term entered. Please enter a keyword to search.</p>}
    //     {status === "succeeded" && articles
    //     ?.filter((article) => article.urlToImage)
    //     ?.map((article, index) => {
    //       return (
    //         <NewsCard
    //           key={index}
    //           id={article.source.id}
    //           title={article.title}
    //           description={article.description}
    //           image={article.urlToImage}
    //           url={article.url}
    //           author={article?.author}
    //         />
    //       );
    //     })} */}
      
    //   </div>
    // </div>
  );
};

export default NewsFeed;
