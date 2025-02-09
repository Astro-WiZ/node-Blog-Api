import Blog from "../models/blog.js";

export const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;
    const blogs = await Blog.find({}).skip(skip).limit(limit)
    const total = await Blog.countDocuments();

    return res.json({
      totalitems: total,
      totalpages:Math.ceil(total / limit),
      currentpage: page,
      pagesize: limit,
      data: blogs,

    })


    // const allBlogs = await Blog.find({});
    // return res.json(blogs);
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

export const seedData = async(req,res)=>{
  try{
    // await Blog.deleteMany({})
    for(let i = 1; i<100; i++){
      await Blog.create({title: `Blog ${i}`, body: `this is blog no ${i}.`})

    }
    console.log("Blogs added")
  }catch(error){
    console.log("err:", error)
  }
}