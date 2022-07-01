import * as controller from "../controllers/moy-klass.controller.js";
import { auth } from "../middlewares/index.js";

export default (app) => {
  app.get("/api/moy-klass/filials", [auth.verifyToken], controller.getFilials);

  app.get("/api/moy-klass/groups", [auth.verifyToken], controller.getGroups);

  app.get("/api/moy-klass/lessons", [auth.verifyToken], controller.getLessons);

  app.get(
    "/api/moy-klass/students",
    [auth.verifyToken],
    controller.getStudents
  );

  app.post(
    "/api/moy-klass/lessonRecords/:id",
    [auth.verifyToken],
    controller.changeRecordStatus
  );

  app.post(
    "/api/moy-klass/lessons/:id/status",
    [auth.verifyToken],
    controller.changeLessonStatus
  );
};
