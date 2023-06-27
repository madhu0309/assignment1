const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const { addUser } = require("../services/user.service");
const { addMessage } = require("../services/message.service");
const { addGroup } = require("../services/group.service");

const group1 = {
  name: "TestGroup",
};
var groupId = "";

const msg1 = {
  message: "Hi, How are you?",
};
var msg1Id = "";

const user1 = {
  name: "Madhu",
  email: "madhu@email.com",
  password: "12345",
};

const removeUser = async (email) => {
  try {
    await User.findOneAndDelete({ email: email }).exec();
  } catch (error) {
    console.log(error);
  }
};

const clearUsers = async () => {
  await removeUser(user1.email);
};

const addDBData = async () => {
  const user = await addUser(user1.name, user1.email, user1.password);
  const group = await addGroup(group1.name, user.id);
  const message = await addMessage(msg1.message, user.id, group.id);
  msg1Id = message.id;
  msg1["groupId"] = group.id;
  groupId = group.id;
};

describe("Test Message API's", () => {
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

  test("It should response the create message", (done) => {
    request(app)
      .post(`/api/messages`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send(msg1)
      .then((response) => {
        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should response the get messages", (done) => {
    request(app)
      .get(`/api/messages/${groupId}`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should response the like message", (done) => {
    request(app)
      .patch(`/api/messages/like`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send({ messageId: msg1Id })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });

  test("It should response the unLike message", (done) => {
    request(app)
      .patch(`/api/messages/unlike`)
      .set('Cookie', [
        `auth=${token}`, 
      ])
      .send({ messageId: msg1Id })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
  });
});
