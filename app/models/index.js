import mongoose from "mongoose";
import User from "./user.model.js";
import Password from "./password.model.js";
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.password = Password;

export default db;
