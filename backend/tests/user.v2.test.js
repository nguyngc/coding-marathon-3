const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcryptjs");

const app = require("../app"); // đảm bảo app export express instance
const User = require("../models/userModel");

let mongoServer;
let token; // lưu JWT cho các route protected

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.disconnect();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

describe("User API V2 Tests", () => {
  const userData = {
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
  };

  it("POST /auth/singup → success", async () => {
    const res = await request(app).post("/api/users/auth/singup").send(userData);
    expect(res.statusCode).toBe(201);
    expect(res.body.user.username).toBe("johndoe");
    expect(res.body.token).toBeDefined();

    token = res.body.token; // lưu token cho các test protected
  });

  it("POST /auth/singup → username already exists → 409", async () => {
    await User.create(userData);
    const res = await request(app).post("/api/users/auth/singup").send(userData);
    expect(res.statusCode).toBe(409);
  });

  it("POST /auth/login → success", async () => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    await User.create({ ...userData, password: hashedPassword });

    const res = await request(app)
      .post("/api/users/auth/login")
      .send({ username: userData.username, password: userData.password });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.username).toBe(userData.username);

    token = res.body.token;
  });

  it("GET / → get all users (protected)", async () => {
    await User.create(userData);
    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].password).toBeUndefined();
  });

  it("GET /:userId → get user by ID (protected)", async () => {
    const user = await User.create(userData);

    const res = await request(app)
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("johndoe");
  });

  it("PUT /:userId → update user (protected)", async () => {
    const user = await User.create(userData);

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it("DELETE /:userId → delete user (protected)", async () => {
    const user = await User.create(userData);

    const res = await request(app)
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });

  it("GET / without token → 401", async () => {
    const res = await request(app).get("/api/users");
    expect(res.statusCode).toBe(401);
  });
});
