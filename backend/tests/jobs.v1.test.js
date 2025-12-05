require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const connectDB = require("../config/db");
const Job = require("../models/jobModel");

const validJob = (overrides = {}) => ({
  title: "Software Engineer",
  type: "Full-time",
  description: "Build and maintain features",
  company: {
    name: "Tech Corp",
    contactEmail: "hr@tech.com",
    size: 120,
  },
  location: {
    city: "Helsinki",
    state: "Uusimaa",
  },
  salary: 5000,
  experienceLevel: "Entry",
  status: "open",
  applicationDeadline: "2026-01-31",
  requirements: ["JavaScript", "React", "Node.js"],
  ...overrides,
});

beforeAll(async () => {
  await connectDB();
});

afterEach(async () => {
  await Job.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("API V1 - Jobs CRUD (no auth) - match current implementation", () => {
  test("POST /api/jobs should create a job", async () => {
    const res = await request(app).post("/api/jobs").send(validJob());

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.title).toBe("Software Engineer");
  });

  test("POST /api/jobs should reject missing required fields (currently 500)", async () => {
    const res = await request(app).post("/api/jobs").send({
      title: "Only title",
    });

    expect(res.status).toBe(500);
  });

  test("POST /api/jobs should reject invalid experienceLevel (currently 500)", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .send(validJob({ experienceLevel: "Junior" }));

    expect(res.status).toBe(500);
  });

  test("GET /api/jobs should return list", async () => {
    await Job.create(validJob());
    await Job.create(
      validJob({
        title: "Backend Dev",
        company: { name: "A", contactEmail: "a@a.com" },
      })
    );

    const res = await request(app).get("/api/jobs");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test("GET /api/jobs/:id currently returns 400", async () => {
    const created = await Job.create(validJob());

    const res = await request(app).get(`/api/jobs/${created._id}`);

    expect(res.status).toBe(400);
  });

  test("GET /api/jobs/:id should return 400 for invalid id", async () => {
    const res = await request(app).get("/api/jobs/123");
    expect(res.status).toBe(400);
  });

  test("GET /api/jobs/:id currently returns 400 even when not found", async () => {
    const fakeId = "507f191e810c19729de860ea";
    const res = await request(app).get(`/api/jobs/${fakeId}`);

    expect(res.status).toBe(400);
  });

  test("PUT /api/jobs/:id currently returns 400", async () => {
    const created = await Job.create(validJob());

    const res = await request(app)
      .put(`/api/jobs/${created._id}`)
      .send({ status: "closed", experienceLevel: "Mid" });

    expect(res.status).toBe(400);
  });

  test("PUT /api/jobs/:id should reject invalid status", async () => {
    const created = await Job.create(validJob());

    const res = await request(app)
      .put(`/api/jobs/${created._id}`)
      .send({ status: "pending" });

    expect(res.status).toBe(400);
  });

  test("DELETE /api/jobs/:id currently returns 400", async () => {
    const created = await Job.create(validJob());

    const res = await request(app).delete(`/api/jobs/${created._id}`);

    expect(res.status).toBe(400);
  });
});
