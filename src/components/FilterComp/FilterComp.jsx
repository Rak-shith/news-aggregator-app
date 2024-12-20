const FilterComp = ({ searchInput, handleSearchInputChange, handleFilterChange, handleApplyFilters, sortBy, from, country }) => {
  return (
    <div className="filters p-3 bg-light rounded shadow-sm mb-4">
      <div className="row g-3 align-items-end">

        {/* Sort By Dropdown */}
        <div className="col-md-3">
          <label htmlFor="sortBy" className="form-label">
            Sort By:
          </label>
          <select
            id="sortBy"
            name="sortBy"
            className="form-select"
            value={sortBy}
            onChange={handleFilterChange}
          >
            <option value="popularity">Popularity</option>
            <option value="relevancy">Relevancy</option>
            <option value="publishedAt">Latest</option>
          </select>
        </div>

        {/* From Date */}
        <div className="col-md-3">
          <label htmlFor="fromDate" className="form-label">
            From:
          </label>
          <input
            type="date"
            id="fromDate"
            name="from"
            className="form-control"
            value={from}
            onChange={handleFilterChange}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="country" className="form-label">
            Country:
          </label>
          <select
            id="country"
            name="country"
            className="form-select"
            value={country}
            onChange={handleFilterChange}
          >
            <option value="popularity">in</option>
            <option value="relevancy">us</option>
          </select>
        </div>

        <div className="col-md-3">
          <button
            className="btn btn-dark"
            onClick={handleApplyFilters}
          >
            Apply filter
          </button>
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
            placeholder="Enter keyword"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterComp;
