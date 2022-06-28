import axios from "../../axios.js";

export async function getFilials(_, res) {
  const filials = await axios.get("/filials");
  res.json(filials.data);
}

export async function getGroups(_, res) {
  const groups = await axios.get("/classes");
  res.json(groups.data);
}

export async function getLessons(req, res) {
  const lessons = await axios.get("/lessons", {
    params: {
      date: req.query.date,
      teacherId: req.query.userId,
      offset: 0,
      limit: 500,
      includeRecords: true,
    },
  });

  res.json(lessons.data.lessons);
}

export async function getStudents(_, res) {
  const firstSlice = await axios.get("/users", {
    params: {
      limit: 500,
    },
  });

  const numberOfRequests = Math.ceil(firstSlice.data.stats.totalItems / 500);

  if (numberOfRequests <= 1) {
    res.json(firstSlice.data.users);
    return;
  }

  let allStudents = [...firstSlice.data.users];
  let offset = 500;

  for (let i = 1; i < numberOfRequests; i++) {
    const slice = await axios.get("/users", {
      params: {
        offset,
        limit: 500,
      },
    });

    allStudents = [...allStudents, ...slice.data.users];
    offset += 500;
  }

  res.json(allStudents);
}

export async function changeRecordStatus(req, res) {
  const response = await axios.post(
    `/lessonRecords/${req.params.id}`,
    JSON.stringify({ visit: req.body.visit })
  );
  res.json(response.data);
}

export async function changeLessonStatus(req, res) {
  const response = await axios.post(
    `/lessons/${req.params.id}/status`,
    JSON.stringify({ status: req.body.status })
  );
  res.json(response.data);
}
