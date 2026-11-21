import React from "react";

const BlogCard = ({ blog }) => (
  <div className="col-md-6 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{blog.title}</h5>
        <p className="card-text">{blog.content.substring(0, 100)}...</p>
        <small className="text-muted">Tags: {blog.tags.join(", ")}</small>
      </div>
    </div>
  </div>
);

export default BlogCard;
