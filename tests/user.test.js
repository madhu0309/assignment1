const request = require("supertest");
const User = require("../models/User");
const app = require("../app");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh1MTFAZW1haWwuY29tIiwiaWQiOiI2NDhmMmQxYWJjOTI5NzgzNjI0NDkxMWUiLCJpYXQiOjE2ODcxMDUxMjd9.bRdtg6jTBorGwU5u24LKScZ_CwcHFt-Wp0PEQHvXpcU"
const user1 = {
    name: "Madhu",
    email: "madhu@email.com",
    password: "12345"
}

const removeUser = async (email) => {
    try {
        await User.findOneAndDelete({email: email}).exec();
    } catch (error) {
        console.log(error);
    }
}

describe("Test the User APIs", () => {
    beforeAll(async () => {
        return removeUser(user1.email);
    });
      
    afterAll(async () => {
        return removeUser(user1.email);
    });

    test("It should response the create user", done => {
        request(app)
        .post("/api/users")
        .send(user1)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          done();
        });
    });

    test("It should response the login", done => {
        request(app)
        .post("/api/users/login")
        .send({ email: user1.email, password: user1.password })
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          done();
        });
    });
    
    test("It should response the update user", done => {
        request(app)
        .put("/api/users")
        .send({ email: user1.email, name: user1.name, password: user1.password })
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          done();
        });
    });
});