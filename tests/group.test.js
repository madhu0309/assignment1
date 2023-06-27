const request = require("supertest");
const app = require("../app");
const { addUser } = require("../services/user.service");
const { addGroup } = require("../services/group.service");
const User = require("../models/User");


const group1 = {
  name: "TestGroup",
};
var group1Id = "";

const user1 = {
  name: "Madhu",
  email: "madhu@email.com",
  password: "12345",
};

const user2 = {
  name: "MadhuAB",
  email: "madhuAB@email.com",
  password: "12345",
};
var user2Id = "";

const removeUser = async (email) => {
  try {
    await User.findOneAndDelete({ email: email }).exec();
  } catch (error) {
    console.log(error);
  }
};

const clearUsers = async () => {
  await removeUser(user1.email);
  await removeUser(user2.email);
};

const addDBData = async () => {
  const currentUser2 = await addUser(user2.name, user2.email, user2.password);
  user2Id = currentUser2.id;
  const user = await addUser(user1.name, user1.email, user1.password);
  const group = await addGroup(group1.name, user.id);
  group1Id = group.id;
};

describe("Test the Groups APIs", () => {
  var token = "";

  beforeAll(async () => {
    await addDBData();
    
    const res = await request(app)
      .post('/api/users/login')
      .send({ email: user1.email, password: user1.password});
    token = res.body?.token;
  });

  afterAll(async () => {
    return clearUsers();
  });

  test("It should create the group", (done) => {
    request(app)
      .post("/api/groups")
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send({ name: group1.name })
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should search the groups", (done) => {
    request(app)
      .get(`/api/groups?name=${group1.name}`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should add group member", (done) => {
    request(app)
      .patch(`/api/groups/add-member/${group1Id}`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send({ userId: user2Id })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should remove group member", (done) => {
    request(app)
      .patch(`/api/groups/remove-member/${group1Id}`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send({ userId: user2Id })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should delete group", (done) => {
    request(app)
      .delete(`/api/groups/${group1Id}`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });
});
