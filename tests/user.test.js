const request = require("supertest");
const User = require("../models/User");
const { addAdminUser, addUser } = require("../services/user.service");
const app = require("../app");

const adminUser = {
  name: "Admin",
  email: "admin@email.com",
  password: "12345",
};

const user1 = {
  name: "Madhu",
  email: "madhu@email.com",
  password: "12345",
};

const addUsers = async () => {
  await addAdminUser(adminUser.name, adminUser.email, adminUser.password);
};

const removeUser = async (email) => {
  try {
    await User.findOneAndDelete({ email: email }).exec();
  } catch (error) {
    console.log(error);
  }
};

const clearUsers = async () => {
  await removeUser(adminUser.email);
  await removeUser(user1.email);
};

describe("Test the User APIs", () => {
  var token = "";

  beforeAll(async () => {
    await addUsers();

    const res = await request(app)
      .post("/api/users/login")
      .send({ email: adminUser.email, password: adminUser.password });
    token = res.body?.token;
  });

  afterAll(async () => {
    return clearUsers();
  });

  test("It should response the create user", (done) => {
    request(app)
      .post("/api/users")
      .set("Cookie", [`auth=${token}`])
      .send(user1)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should response the login", (done) => {
    request(app)
      .post("/api/users/login")
      .send({ email: user1.email, password: user1.password })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the update user", (done) => {
    request(app)
      .put("/api/users")
      .set("Cookie", [`auth=${token}`])
      .send({ email: user1.email, name: user1.name, password: user1.password })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should response the logout", (done) => {
    request(app)
      .post("/api/users/logout")
      .set("Cookie", [`auth=${token}`])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
