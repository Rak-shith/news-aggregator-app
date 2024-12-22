const FilterComp = ({ searchText, handleSearch, handleFilterChange, handleApplyFilters, sortBy, dateBy, source }) => {
  return (
    <div className="filters p-3 bg-light rounded shadow-sm mb-4">
      <div className="row g-3 align-items-end">

        {/* From Date */}
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

         {/* Sort By Dropdown */}
         <div className="col-md-4">
          <label htmlFor="sortBy" className="form-label">
            Category:
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="form-select"
            value={sortBy}
            onChange={handleFilterChange}
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
            onChange={handleFilterChange}
          >
            <option value="NewsAPI">Top Headlines</option>
            <option value="MediaStack">Open News</option>
            <option value="NYT">New York Times</option>
          </select>
        </div>
      </div>
      {/* Search Input */}
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
