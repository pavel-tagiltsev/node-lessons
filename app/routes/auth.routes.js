import * as controller from "../controllers/auth.controller.js";

export default (app) => {
  app.post("/api/auth/singin", controller.signin);
};
