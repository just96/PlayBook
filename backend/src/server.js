import express from "express";
import { connectDataBase } from "./config/dataBase.js";
import dotenv from "dotenv";
import tacticsRoutes from "./routes/tacticsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// init DB
connectDataBase();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use("/tactics", tacticsRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
