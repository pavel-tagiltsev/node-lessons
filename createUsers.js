import bcrypt from "bcrypt";
import generatePassword from "password-generator";
import User from "./app/models/user.model.js";
import axios from "./axios.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createUsers() {
  const users = await axios.get("/managers");
  let oldUsers = await User.getAll();

  if (!oldUsers) {
    fs.writeFile(
      path.join(__dirname, ".", "data", "users.json"),
      "[]",
      async (err) => {
        if (err) {
          return console.log(err);
        }
        console.log("data created.");
        oldUsers = await User.getAll();
      }
    );
  }

  let usersPasswords = [];

  for (let i = 0; i < users.data.length; i++) {
    const { id, name, email } = users.data[i];

    if (oldUsers.find((oldUser) => oldUser.id === id)) {
      continue;
    }

    const userPassword = generatePassword(8, false);

    const newUser = { id, name, email, userPassword };
    usersPasswords.push(newUser);

    await new User(id, name, email, bcrypt.hashSync(userPassword, 8)).save();
  }

  if (usersPasswords.length !== 0) {
    fs.writeFile(
      path.join(__dirname, ".", "data", "userPasswords.json"),
      JSON.stringify(usersPasswords),
      (err) => {
        if (err) {
          return console.log(err);
        }
      }
    );
  }
}
