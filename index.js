import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./app/routes/auth.routes.js";
import moyKlassRoutes from "./app/routes/moy-klass.routes.js";
import Database from "./Database.js";
import bot from "./telegram/english-colours-bot.js";

dotenv.config();

const PORT = process.env.PORT || 8080;
const CORS_OPTIONS = {
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
};

const app = express();

app.use(cors(CORS_OPTIONS));
app.use(express.json());
app.use(
  await bot.createWebhook({
    domain: process.env.ENGLISH_COLOURS_BOT_DOMAIN,
  })
);

authRoutes(app);
moyKlassRoutes(app);

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});

new Database(process.env.DB_CONNECTION_URI).init();
