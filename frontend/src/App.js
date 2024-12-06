import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox.js";
import BlogCard from "./components/BlogCard";
import Navbar from "./components/Navbar.js";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    tags: "",
  });

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/", {
          params: { query, tag },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, [query, tag]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value,
    });
  };

  // Submit new blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(newBlog);
      await axios.post("http://localhost:5000/api/blogs", newBlog);
      setIsModalOpen(false);
      setNewBlog({ title: "", content: "", tags: "" });
      const response = await axios.get("http://localhost:5000/");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error adding blog", error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <SearchBox query={query} setQuery={setQuery} setTag={setTag} />
      <button
        className="btn btn-primary mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Add Blog
      </button>
      <div className="row">
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Add a New Blog</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={newBlog.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                      className="form-control"
                      id="content"
                      name="content"
                      value={newBlog.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tags" className="form-label">Tags (comma separated)</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tags"
                      name="tags"
                      value={newBlog.tags}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Add Blog</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
