const request = require('supertest');

const server = require('./../index.js');

describe('authRouter Tests', function() {
  //TEST GET /api/auth/:id/user END POINT
  it("GET /auth/:id/user Valid User/Auth Status", async () => {
    const user = {
      username: "testuser",
      password: "pass"
    };
    let logedin = await request(server)
      .post("/api/login")
      .send(user);

    let tokenPassed = logedin.body.yourToken
    let res = await request(server)
      .get("/api/auth/1/user")
      .set('Authorization', tokenPassed);

    expect(res.status).toBe(201);
  })
  it("GET /auth/:id/user inValid Auth Status", async () => {
    let tokenPassed = "fake";
    let res = await request(server)
      .get("/api/auth/1000/user")
      .set('Authorization', tokenPassed);

    expect(res.status).toBe(401);
  })
  it("GET /auth/:id/user No Token Status", async () => {
    let res = await request(server)
      .get("/api/auth/1000/user")

    expect(res.status).toBe(401);
  })

  //TEST //PUT	/api/auth/:id/user	EDIT	NewObj, send (token)
  it("PUT /auth/:id/user Valid User/Auth Status", async () => {
    const user = {
      username: "testuser",
      password: "pass"
    };
    let logedin = await request(server)
      .post("/api/login")
      .send(user);

    let tokenPassed = logedin.body.yourToken
    const userEdit = {
      phoneNumber: "1234567890",
    };
    let res = await request(server)
      .put("/api/auth/1/user")
      .set('Authorization', tokenPassed)
      .send(userEdit);

    expect(res.status).toBe(201);
  })
  it("PUT /auth/:id/user inValid Auth Status", async () => {
    let tokenPassed = "fake";
    let res = await request(server)
      .put("/api/auth/1000/user")
      .set('Authorization', tokenPassed);

    expect(res.status).toBe(401);
  })
  it("PUT /auth/:id/user No Token Status", async () => {
    let res = await request(server)
      .put("/api/auth/1000/user")

    expect(res.status).toBe(401);
  })

  //DEL /auth/:id/user/del (reg a user, login, than del that user)
  it("DEL /auth/:id/user/del can Del a user", async () => {
    const makeUser = {
      username: Math.random().toString(),
      password: "pass",
      phoneNumber: "1234567890",
      userType: "volunteer"
    };

    let resMakeUser = await request(server)
      .post("/api/register")
      .send(makeUser);

    let delUser = resMakeUser.body.id;
    //console.log(resMakeUser.body.id);
    //console.log(`/auth/${delUser}/user/del`);

    const user = {
      username: "testuser",
      password: "pass"
    };
    let logedin = await request(server)
      .post("/api/login")
      .send(user);

    let tokenPassed = logedin.body.yourToken;
    let res = await request(server)
      .delete(`/api/auth/${delUser}/user/del`)
      .set('Authorization', tokenPassed);

    expect(res.status).toBe(201);
  })





})
