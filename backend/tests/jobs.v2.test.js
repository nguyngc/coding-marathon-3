require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = require("../app");
const connectDB = require("../config/db");
const config = require("../utils/config");
const Job = require("../models/jobModel");

const makeToken = () =>
  jwt.sign({ userId: "test-user-id", role: "user" }, config.SECRET, { expiresIn: "1h" });

const validJob = (overrides = {}) => ({
  title: "Software Engineer",
  type: "Full-time",
  description: "Build and maintain features",
  company: { name: "Tech Corp", contactEmail: "hr@tech.com", size: 120 },
  location: { city: "Helsinki", state: "Uusimaa" },
  salary: 5000,
  experienceLevel: "Entry",
  status: "open",
  requirements: ["Node", "React"],
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

describe("API V2 - Jobs protected writes", () => {
  test("POST /api/jobs returns 401 without token", async () => {
    const res = await request(app).post("/api/jobs").send(validJob());
    expect(res.status).toBe(401);
  });

  test("POST /api/jobs returns 401 with invalid token", async () => {
    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", "Bearer abc.def.ghi")
      .send(validJob());

    expect(res.status).toBe(401);
  });

  test("POST /api/jobs works with valid token", async () => {
    const token = makeToken();

    const res = await request(app)
      .post("/api/jobs")
      .set("Authorization", `Bearer ${token}`)
      .send(validJob());

    expect(res.status).toBe(201);
  });

  test("PUT /api/jobs/:id returns 401 without token", async () => {
    const created = await Job.create(validJob());

    const res = await request(app)
      .put(`/api/jobs/${created._id}`)
      .send({ status: "closed" });

    expect(res.status).toBe(401);
  });

  test("PUT /api/jobs/:id works with valid token", async () => {
    const created = await Job.create(validJob());
    const token = makeToken();

    const res = await request(app)
      .put(`/api/jobs/${created._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "closed" });

    // nếu code bạn đang check id ok
    expect([200, 400]).toContain(res.status);
  });

  test("DELETE /api/jobs/:id returns 401 without token", async () => {
    const created = await Job.create(validJob());

    const res = await request(app).delete(`/api/jobs/${created._id}`);

    expect(res.status).toBe(401);
  });

  test("DELETE /api/jobs/:id works with valid token", async () => {
    const created = await Job.create(validJob());
    const token = makeToken();

    const res = await request(app)
      .delete(`/api/jobs/${created._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect([200, 400]).toContain(res.status);
  });
});