const request = require("supertest");
const app = require("../app");

let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hZGh1MUBlbWFpbC5jb20iLCJpZCI6IjY0OGVmZDBkYjdlMzVkODg4NzlmZDU4MyIsImlhdCI6MTY4NzA5MjQ5M30.V84NX2i3LODbyOA50aDrqus961wInAd268iUVKb39WE";
const userId = "648f2d1abc9297836244911d";
const groupId = "648f08176380b286a5ab9c35";

describe("Test the Groups APIs", () => {

    test("It should create the group", done => {
        request(app)
        .post("/api/groups")
        .send({name: "Group1"})
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(201);
          expect(response.body.success).toBe(true);
          done();
        });
    });

    test("It should search the groups", done => {
        request(app)
        .get("/api/groups?name=Group")
        .set('Authorization', `Bearer ${TOKEN}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
          expect(response.body.success).toBe(true);
          done();
        });
    });

    test("It should add group member", done => {
      request(app)
      .patch(`/api/groups/${groupId}`)
      .send({ userId })
      .set('Authorization', `Bearer ${TOKEN}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
    });
    
    test("It should delete group", done => {
      request(app)
      .delete(`/api/groups/${groupId}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        done();
      });
    });

});