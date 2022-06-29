import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export async function signin(req, res) {
  const user = await User.findOne("email", req.body.email);

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  const passwordIsValid = +req.body.password === +user.password;

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
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
