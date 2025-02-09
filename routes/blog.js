import express from "express";
import {
  getBlogs,
  createBlogs,
  deleteBlogs,
  filterBlogs,
  seedData,
} from "../controllers/blog.js";
import { authorize } from "../middlewares/auth.js";
const router = express.Router();

router.get("/all", getBlogs);
router.post("/create", createBlogs);
router.delete("/delete/:blogTitle", authorize("admin"), deleteBlogs);
router.get("/:blogTitle", filterBlogs);

export default router;
