import mongoose from "mongoose";

const Password = mongoose.model(
  "Password",
  new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
  })
);

export default Password;
