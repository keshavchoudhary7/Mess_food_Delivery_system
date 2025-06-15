import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./route/authRoute.js";
import connectDb from "./config/db.js";
import menuRoute from "./route/menuRoute.js";

dotenv.config();
const app = express();
// Set up CORS options
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;
// Connect to MongoDB
connectDb();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoute);
app.use("/api/mess", menuRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
