import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";
import process from "process";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import propertyRoutes from "./routes/property.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const nodeEnv = process.env.NODE_ENV || "development";

  res.status(statusCode).json({
    success: false,
    message,
    stack: nodeEnv === "production" ? null : err.stack,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
