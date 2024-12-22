import express from "express";

import blogRoutes from "./routes/blog.js";
import authRoutes from "./routes/auth.js";
import mongoDbConnect from "./connection.js";
import { authenticate } from "./middlewares/auth.js";

const app = express();
const PORT = 5000;

// Connect to mongoDb
mongoDbConnect();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use("/blogs", authenticate, blogRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
