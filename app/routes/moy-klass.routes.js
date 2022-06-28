import * as controller from "../controllers/moy-klass.controller.js";

export default (app) => {
  app.get("/api/moy-klass/filials", controller.getFilials);
  app.get("/api/moy-klass/groups", controller.getGroups);
  app.get("/api/moy-klass/lessons", controller.getLessons);
  app.get("/api/moy-klass/students", controller.getStudents);
  app.post("/api/moy-klass/lessonRecords/:id", controller.changeRecordStatus);
  app.post("/api/moy-klass/lessons/:id/status", controller.changeLessonStatus);
};
