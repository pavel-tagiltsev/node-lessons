import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";

export async function signin(req, res) {
  const user = await db.user.findOne({ email: req.body.email });

  if (!user) {
    return res.status(401).send({
      message: "Invalid username or password.",
    });
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Invalid username or password.",
    });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400, // 24 hours
  });

  res.status(200).send({
    userId: user.id,
    name: user.name,
    email: user.email,
    accessToken: token,
  });
}
