const request = require('supertest');

const server = require('./../index.js');

describe('projectRouter Tests', function() {
/*    it('Sanity Test', function() {
        //expect(true).toBe(false);// it can fail
    })*/

  //TEST REGISTER USER END POINT
  it("POST /register User status success", async () => {
    const user = {
      username: Math.random().toString(),
      password: "pass",
      phoneNumber: "1234567890",
      userType: "volunteer"
    };

    let res = await request(server)
      .post("/api/register")
      .send(user);

    expect(res.status).toBe(201);
  })
  it('POST /register User no Object Status', function() {
    return request(server)
      .post('/api/register')
        .then(res => {
        expect(res.status).toBe(500);
    })
  })

  //TEST LOGIN USER END POINT
  it("POST /login User status success", async () => {
    const user = {
      username: "testuser",
      password: "pass"
    };

    let res = await request(server)
      .post("/api/login")
      .send(user);

    expect(res.status).toBe(201);
  })
  it('POST /login User no Object Status', function() {
    return request(server)
      .post('/api/login')
        .then(res => {
        expect(res.status).toBe(500);
    })
  })
})
