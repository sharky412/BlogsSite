const express = require("express");
const Blog = require("../models/Blog");

const router = express.Router();

//fetch all blogs with optional filter
router.get("/", async (req, res) => {
  const { query, tag } = req.query;
  let filter = {};

  if (query) {
    filter.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];
  }

  if (tag) {
    filter.tags = tag;
  }

  try {
    const blogs = await Blog.find(filter);
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// POST a new blog
router.post("/api/blogs", async (req, res) => {
    const { title, content, tags } = req.body;
    
    const newBlog = new Blog({
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim())
    });
    console.log(newBlog.title, newBlog.content);
    try {
      const blog = await newBlog.save();
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: "Error adding blog" });
    }
  });
  

module.exports = router;
