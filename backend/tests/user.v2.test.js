const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../app");
const User = require("../models/userModel");

let mongoServer;
let token; // JWT token cho các request protected

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

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

describe("User API V2 Tests", () => {
  it("POST /api/users/register → success", async () => {
    const res = await request(app).post("/api/users/register").send({
      name: "John Doe",
      username: "johndoe",
      password: "123456",
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: { street: "123 St", city: "City", zipCode: "70000" },
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("POST /api/users/login → success", async () => {
    // Tạo user trước khi login
    await User.create({
      name: "Jane Doe",
      username: "janedoe",
      password: await require("bcryptjs").hash("abcdef", 10),
      phone_number: "0987654321",
      gender: "female",
      date_of_birth: "1992-02-02",
      address: { street: "456 St", city: "City2", zipCode: "70001" },
    });

    const res = await request(app).post("/api/users/login").send({
      username: "janedoe",
      password: "abcdef",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("GET /api/users → protected route", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: await require("bcryptjs").hash("123456", 10),
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: { street: "123 St", city: "City", zipCode: "70000" },
    });

    // Login để lấy token
    const loginRes = await request(app).post("/api/users/login").send({
      username: "johndoe",
      password: "123456",
    });

    token = loginRes.body.token;

    const res = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].username).toBe("johndoe");
    expect(res.body[0].password).toBeUndefined(); // password không trả về
  });

  it("GET /api/users/:userId → protected route", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: await require("bcryptjs").hash("123456", 10),
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: { street: "123 St", city: "City", zipCode: "70000" },
    });

    const loginRes = await request(app).post("/api/users/login").send({
      username: "johndoe",
      password: "123456",
    });
    token = loginRes.body.token;

    const res = await request(app)
      .get(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.username).toBe("johndoe");
  });

  it("PUT /api/users/:userId → protected route update", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: await require("bcryptjs").hash("123456", 10),
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: { street: "123 St", city: "City", zipCode: "70000" },
    });

    const loginRes = await request(app).post("/api/users/login").send({
      username: "johndoe",
      password: "123456",
    });
    token = loginRes.body.token;

    const res = await request(app)
      .put(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Name" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Name");
  });

  it("DELETE /api/users/:userId → protected route delete", async () => {
    const user = await User.create({
      name: "John Doe",
      username: "johndoe",
      password: await require("bcryptjs").hash("123456", 10),
      phone_number: "0123456789",
      gender: "male",
      date_of_birth: "1990-01-01",
      address: { street: "123 St", city: "City", zipCode: "70000" },
    });

    const loginRes = await request(app).post("/api/users/login").send({
      username: "johndoe",
      password: "123456",
    });
    token = loginRes.body.token;

    const res = await request(app)
      .delete(`/api/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(204);
  });
});
