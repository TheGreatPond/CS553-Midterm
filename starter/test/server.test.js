import { describe, expect, test } from "vitest";
import request from "supertest";
import { createApp } from "../src/server.js";

describe("Midterm CS553 starter", () => {
  test("GET /health returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/health")
        .expect(200);

    expect(response.body).toEqual({ status: "ok" });
  });

  test("POST /api/tasks returns task created", async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/tasks')
      .send({
              "title": "task-title-here-2",
              "course": "CS453-1",
              "completed": true
            }); // Automatically stringifies

    expect(response.status).toBe(201);
    });

  test("GET /api/tasks returns all items", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/api/tasks")
        .expect(200);

    expect(response.body).toEqual([
    {"id": 1, "title": "Watch Week 4 lecture", "course": "CS453", "completed": true},
    {"id": 2, "title": "Watch Week 5 lecture", "course": "CS453", "completed": false},
    {"id": 3, "title": "task-title-here", "course": "CS123", "completed": false}
    ]);
  });

  test("GET /api/tasks/:id returns status ok", async () => {
    const app = createApp();

    const response = await request(app)
        .get("/api/tasks/1")
        .expect(200);

    expect(response.body).toEqual("{\"id\":1,\"title\":\"Watch Week 4 lecture\",\"course\":\"CS453\",\"completed\":true}");
  });

  test("PUT /api/tasks/:id returns task updated", async () => {
    const app = createApp();

    const response = await request(app)
      .put('/api/tasks/1')
      .send({
              "title": "task-title-here-2",
              "course": "CS453-1",
              "completed": true
            }); // Automatically stringifies

    expect(response.status).toBe(200);
    expect(response.body).toEqual("{\"id\":\"1\",\"title\":\"task-title-here-2\",\"course\":\"CS453-1\",\"completed\":true}"); // Compares objects directly
  });




  test("DELETE /api/tasks/:id returns code 204", async () => {
    const app = createApp();

    const response = await request(app)
        .delete('/api/tasks/1')
        .expect(204);

    expect(response.body).toEqual({});
  });

});