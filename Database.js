import db from "./app/models/index.js";
import axios from "./axios.js";
import bcrypt from "bcrypt";
import generatePassword from "password-generator";

const USERS_URL = "/managers";
const PASSWORD_OPTIONS = {
  passowrdLength: 8,
  saltRounds: 8,
  nonMemorable: false,
};

export default class Database {
  constructor(url) {
    this.databaseURL = url;
  }

  createUserWithGeneratedPassword(id, name, email) {
    try {
      const generatedPassword = generatePassword(
        PASSWORD_OPTIONS.passowrdLength,
        PASSWORD_OPTIONS.nonMemorable
      );

      const hashedPassword = bcrypt.hashSync(
        generatedPassword,
        PASSWORD_OPTIONS.saltRounds
      );

      new db.password({ id, name, email, password: generatedPassword }).save();
      new db.user({ id, name, email, password: hashedPassword }).save();
    } catch (err) {
      console.error(err);
    }
  }

  async createUsers() {
    try {
      const res = await axios.get(USERS_URL);
      const users = res.data;

      for (let i = 0; i < users.length; i++) {
        const { id, name, email } = users[i];
        this.createUserWithGeneratedPassword(id, name, email);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async updateUsers() {
    try {
      const res = await axios.get(USERS_URL);
      const newUsers = res.data;
      const oldUsers = await db.user.find({});

      for (let i = 0; i < newUsers.length; i++) {
        const { id, name, email } = newUsers[i];

        if (oldUsers.find((oldUser) => oldUser.id === id)) {
          continue;
        }

        this.createUserWithGeneratedPassword(id, name, email);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async init() {
    try {
      await db.mongoose.connect(this.databaseURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      const count = await db.user.estimatedDocumentCount();

      if (count === 0) {
        await this.createUsers();
      } else {
        await this.updateUsers();
      }
    } catch (err) {
      console.error(err);
      process.exit();
    }
  }
}
