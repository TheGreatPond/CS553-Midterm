import express from "express";
import cors from "cors";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(cors());
  // Starter data. This data is stored in memory and will reset when the
  // server restarts.
  let nextId = 4;
  const tasks = [
    {"id": 1, "title": "Watch Week 4 lecture", "course": "CS453", "completed": true},
    {"id": 2, "title": "Watch Week 5 lecture", "course": "CS453", "completed": false},
    {"id": 3, "title": "task-title-here", "course": "CS123", "completed": false}
  ];

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // DONE: Return all tasks.
  app.get("/api/tasks", (req, res) => {
    res.json(tasks);
  });

  // DONE: Return one item by ID.
  app.get("/api/tasks/:id", (req, res) => {

    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      const single_item = tasks.find(test => test.id == req.params.id);
      res.json(JSON.stringify(single_item));
    } else {
      res.status(404).json({ error: "Resource requested not found to retrieve" });
    }

  });

  // DONE: Create a new item.
  app.post("/api/tasks", (req, res) => {
  // TODO: Validate input as title, course and completed
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('course') && req.body.hasOwnProperty('completed') && Object.keys(req.body).length === 3){
      let index = tasks.findIndex(test => test.id == nextId);
      tasks.push({"id":nextId, "title":req.body.title, "course":req.body.course, "completed":req.body.completed});
      nextId++;
      res.status(201).json(JSON.stringify(tasks[index]));
    } else {
      res.status(400).json({ error: "Malformed json, please try again with only title, course and completed" });
    }



  });

  // DONE: Update an existing item.
  app.put("/api/tasks/:id", (req, res) => {
    // DONE: Validate input as id, title, course and completed
    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('course') && req.body.hasOwnProperty('completed') && Object.keys(req.body).length === 3){
          tasks[index].id = req.params.id;
          tasks[index].title = req.body.title;
          tasks[index].course = req.body.course;
          tasks[index].completed = req.body.completed;
          res.json(JSON.stringify(tasks[index]));
        } else {
          res.status(400).json({ error: "Malformed json, please try again with only keys title, course and completed" });
        }
      } else {
      res.status(404).json({ error: "Resource requested not found to update" });
    }
  });

  // DONE: Update an existing item.
  app.patch("/api/tasks/:id", (req, res) => {
    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      if (req.body.hasOwnProperty('title') || req.body.hasOwnProperty('course') || req.body.hasOwnProperty('completed')){
        if (req.body.hasOwnProperty('title')){
            tasks[index].title = req.body.title;
        }
        if (req.body.hasOwnProperty('course')){
            tasks[index].course = req.body.course;
        }
        if (req.body.hasOwnProperty('completed')){
            tasks[index].completed = req.body.completed;
        }
            res.json(JSON.stringify(tasks[index]));
      } else {
        res.status(400).json({ error: "Malformed json, please try again with only keys title, course and completed" });
      } 
    } else {
      res.status(404).json({ error: "Resource requested not found to update" });
    }
  });

  // DONE: Delete an existing item.
  app.delete("/api/tasks/:id", (req, res) => {
    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      res.status(204).json({ status: "ok" });
    }
    else{
      console.log({ error: "Resource requested not found to delete" });
      res.status(404).json({ error: "Resource requested not found to delete" });
    }
  });

  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return app;
}

const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  const PORT = process.env.PORT || 3000;
  const app = createApp();

  app.listen(PORT, () => {
    console.log(`Lab 3 REST API listening on port ${PORT}`);
  });
}
