import mongoose from "mongoose";

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
  })
);

export default User;
