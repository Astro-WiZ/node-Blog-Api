import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
