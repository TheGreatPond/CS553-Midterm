import express from "express";
import cors from "cors";
import fs from "fs";
import { stringify } from "querystring";

export function createApp() {
  const app = express();
  let status = 200;
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
    status = 200;
    
    const method = "GET";
    requestLogger(req.path, status, method);
  });

  // DONE: Return all tasks.
  app.get("/api/tasks", (req, res) => {
    res.status(200).json(tasks) 
    status = 200;
    
    const method = "GET";
    requestLogger(req.path, status, method);
  });

  // DONE: Return one item by ID.
  app.get("/api/tasks/:id", (req, res) => {

    const method = "GET";

    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      const single_item = tasks.find(test => test.id == req.params.id);
      res.json(JSON.stringify(single_item));
      status = 200;
      requestLogger(req.path, status, method);
    } else {
      res.status(404).json({ error: "Resource requested not found to retrieve" });
      status = 404;
      requestLogger(req.path, status, method);
    }

  });

  // DONE: Create a new item.
  app.post("/api/tasks", (req, res) => {
    const path = `/api/tasks`;
    const method = "POST";
    if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('course') && req.body.hasOwnProperty('completed') && Object.keys(req.body).length === 3){
      let index = tasks.findIndex(test => test.id == nextId);
      tasks.push({"id":nextId, "title":req.body.title, "course":req.body.course, "completed":req.body.completed});
      nextId++;
      res.status(201).json(JSON.stringify(tasks[index]));
      status = 201;
      requestLogger(req.path, status, method);
    } else {
      res.status(400).json({ error: "Malformed json, please try again with only title, course and completed" });
      status = 400;
      requestLogger(req.path, status, method);
    }



  });

  // DONE: Update an existing item.
  app.put("/api/tasks/:id", (req, res) => {
    const method = "PUT";
    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      if (req.body.hasOwnProperty('title') && req.body.hasOwnProperty('course') && req.body.hasOwnProperty('completed') && Object.keys(req.body).length === 3){
          tasks[index].id = req.params.id;
          tasks[index].title = req.body.title;
          tasks[index].course = req.body.course;
          tasks[index].completed = req.body.completed;
          res.json(JSON.stringify(tasks[index]));
          status = 200;
          requestLogger(req.path, status, method);
        } else {
          res.status(400).json({ error: "Malformed json, please try again with only keys title, course and completed" });
          status = 400;
          requestLogger(req.path, status, method);
        }
      } else {
      res.status(404).json({ error: "Resource requested not found to update" });
      status = 404;
      requestLogger(req.path, status, method);
    }
  });

  // DONE: Update an existing item.
  app.patch("/api/tasks/:id", (req, res) => {
    const method = "PATCH";
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
            status = 200;
            requestLogger(req.path, status, method);
      } else {
        res.status(400).json({ error: "Malformed json, please try again with only keys title, course and completed" });
        status = 400;
        requestLogger(req.path, status, method);
      } 
    } else {
      res.status(404).json({ error: "Resource requested not found to update" });
      status = 404;
      requestLogger(req.path, status, method);
    }
  });

  // DONE: Delete an existing item.
  app.delete("/api/tasks/:id", (req, res) => {
    const method = "PUT";
    let index = tasks.findIndex(test => test.id == req.params.id);
    if (index !== -1) {
      tasks.splice(index, 1);
      res.status(204).json({ status: "ok" });
      status = 204;
      requestLogger(req.path, status, method);
    }
    else{
      console.log({ error: "Resource requested not found to delete" });
      res.status(404).json({ error: "Resource requested not found to delete" });
      status = 404;
      requestLogger(req.path, status, method);
    }
  });

  app.use((req, res) => {
    let method =  req.method;
    res.status(404).json({ error: "Not found" });
    status = 404;
    requestLogger(req.path, status, method);
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

const content = 'Hello, this is server-side JavaScript!';

export function requestLogger(path, code, method) {
  const currentdate = new Date;
  currentdate.getTime;
  const content = `Method: ${method}, Path: ${path}, Code: ${code}, ${currentdate.toDateString()}, ${currentdate.toTimeString()} \n`;
  fs.appendFile('request.log', content, 'utf8', (err) => {
      if (err) {
          console.error('Error writing file:', err);
          return;
      }
      console.log('request logged successfully!');
  });
}