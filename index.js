import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log(`Server is running on port: ${PORT}`);
});
