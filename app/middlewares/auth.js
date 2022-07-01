import jwt from "jsonwebtoken";
import * as yup from "yup";

export function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
}

export function validatePasswordAndEmail(req, res, next) {
  const schema = yup
    .object()
    .shape({
      email: yup.string().email().lowercase().trim().required(),
      password: yup.string().min(6).max(16).matches(/^\S*$/).required(),
    })
    .required();

  schema
    .validate(req.body)
    .then(() => next())
    .catch((e) => {
      return res.status(401).send({
        message: e.errors.join(""),
      });
    });
}
