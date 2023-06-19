const request = require("supertest");
const app = require("../app");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh1MTFAZW1haWwuY29tIiwiaWQiOiI2NDhmMmQxYWJjOTI5NzgzNjI0NDkxMWUiLCJpYXQiOjE2ODcxMDUxMjd9.bRdtg6jTBorGwU5u24LKScZ_CwcHFt-Wp0PEQHvXpcU"
const groupId = "648f08176380b286a5ab9c35";
const msg = {
  message: "Hi, How are you?",
  groupId: groupId
}

describe("Test Message API's", () => {

    test("It should response the create message", done => {
      request(app)
        .post(`/api/messages`)
        .send(msg)
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          done();
        });
    })

    test("It should response the like message", done => {
      request(app)
        .patch(`/api/messages/like`)
        .send({ messageId: "648d91c5708751da506ae8a6" })
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          done();
        });
    })
});
