import express from "express";
import {
  getBlogs,
  createBlogs,
  deleteBlogs,
  filterBlogs,
} from "../controllers/blog.js";
const router = express.Router();

router.get("/all", getBlogs);
router.post("/create", createBlogs);
router.delete("/delete/:blogTitle", deleteBlogs);
router.get("/:blogTitle", filterBlogs);

export default router;
