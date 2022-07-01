import * as controller from "../controllers/auth.controller.js";
import { auth } from "../middlewares/index.js";

export default (app) => {
  app.post(
    "/api/auth/singin",
    [auth.validatePasswordAndEmail],
    controller.signin
  );
};
