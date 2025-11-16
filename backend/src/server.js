import express from "express";
import { connectDataBase } from "./config/dataBase.js";
import dotenv from "dotenv";
import tacticsRoutes from "./routes/tacticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log("MONGO_URI:", process.env.MONGO_URI);

// init DB
connectDataBase();

app.use(express.json());

app.use("/tactics", tacticsRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
