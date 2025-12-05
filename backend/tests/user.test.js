const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/userModel");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  // Nếu có connection cũ, disconnect trước
  await mongoose.disconnect();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("User API Tests", () => {

  it("POST /users → success", async () => {
    const res = await request(app).post("/api/users").send({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe("johndoe");
  });

  it("POST /users → missing required → 400", async () => {
    const res = await request(app).post("/api/users").send({
      username: "johndoe"
    });

    expect(res.statusCode).toBe(400);
  });

  it("POST /users → same username → 409", async () => {
    await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    const res = await request(app).post("/api/users").send({
      name: "Jane Doe",
      username: "johndoe",
      password: "abcdef",
      phone_number: "0987654321",
      gender: "female",
      date_of_birth: "1992-02-02",
      address: {
        street: "456 Test St",
        city: "Test City 2",
        zipCode: "70001"
      }
    });

    expect(res.statusCode).toBe(409);
  });

  it("GET /users → get list", async () => {
    await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("GET /users/:id → get user by ID", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    const res = await request(app).get(`/api/users/${user._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("johndoe");
  });

  it("GET /users/:id → ID not found → 404", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${fakeId}`);
    expect(res.statusCode).toBe(404);
  });

  it("PUT /users/:id → update user", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it("PUT /users/:id → invalid ID → 400", async () => {
    const res = await request(app)
      .put("/api/users/123invalidid")
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(400);
  });

  it("DELETE /users/:id → delete user", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: {
        street: "123 Test St",
        city: "Test City",
        zipCode: "70000"
      }
    });

    const res = await request(app).delete(`/api/users/${user._id}`);
    expect(res.statusCode).toBe(204);
  });

});
