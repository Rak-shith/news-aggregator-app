const FilterComp = ({
  searchText,
  handleSearch,
  handleFilterChange,
  handleCategoryChange,
  handleSourceChange,
  sortBy,
  dateBy,
  source,
}) => {
  return (
    <div className="filters p-3 bg-light rounded shadow-sm mb-4">
      <div className="row g-3 align-items-end">
        <div className="col-md-4">
          <label htmlFor="dateBy" className="form-label">
            Date:
          </label>
          <input
            type="date"
            id="dateBy"
            name="dateBy"
            className="form-control"
            value={dateBy}
            onChange={handleFilterChange}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="sortBy" className="form-label">
            Category:
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="form-select"
            value={sortBy}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="general">General</option>
            <option value="sports">Sports</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="health">Health</option>
            <option value="science">Science</option>
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="source" className="form-label">
            Source:
          </label>
          <select
            id="source"
            name="source"
            className="form-select"
            value={source}
            onChange={(e) => handleSourceChange(e.target.value)}
          >
            <option value="all">All Data Sources</option>
            <option value="NewsAPI">News API</option>
            <option value="MediaStack">The Guardian API</option>
            <option value="NYT">New Yourk Times API</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center text-center mt-3">
        <div className="col-md-4">
          <label htmlFor="keyword" className="form-label">
            Search News
          </label>
          <input
            type="text"
            id="keyword"
            name="q"
            className="form-control"
            placeholder="Search news..."
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
