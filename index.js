import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 8080;

dotenv.config();

const app = express();

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
