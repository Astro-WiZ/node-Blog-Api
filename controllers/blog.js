import Blog from "../models/blog.js";

export const getBlogs = async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    return res.json(allBlogs);
  } catch (err) {
    return res.json({ error: "Error Users not Found!", err });
  }
};

export const createBlogs = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(404).json({ error: "Title and body require" });
    }
    await Blog.create(body);
    console.log(req.body);
    res.status(201).json({ status: "Blog Created." });
  } catch (err) {
    res.send(err);
  }
};

export const deleteBlogs = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({ title: req.params.blogTitle });
    return res.status(200).json({ status: "deleted", title: blog.title });
  } catch (err) {
    return res.status(404).json({ status: "Blog not Found" });
  }
};

export const filterBlogs = async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.params.blogTitle });
    return res.json(blog);
  } catch (err) {
    res.status(404).json({ status: "Not found!" });
  }
};
