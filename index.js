import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./app/routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
};

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());

authRouter(app);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
