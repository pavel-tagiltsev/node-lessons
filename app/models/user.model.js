import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class User {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  async save() {
    const users = await User.getAll();
    users.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "..", "data", "users.json"),
        JSON.stringify(users),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  static async findOne(name, value) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "..", "data", "users.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            const user = JSON.parse(content).find((user) => {
              return user[name] === value;
            });
            resolve(user);
          }
        }
      );
    });
  }

  static async getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "..", "data", "users.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}
