import React from "react";

const SearchBox = ({ query, setQuery, setTag }) => {
  const tags = [
    "Business", 
    "Self-Improvement", 
    "Travel", 
    "Productivity", 
    "Security", 
    "Entrepreneurship", 
    "AI", 
    "Mental Health", 
    "Health", 
    "Sustainability"
  ];  
  return (
    <div className="mb-4">
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select
        className="form-select mt-3"
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {tags.map((tag, idx) => (
          <option key={idx} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBox;
