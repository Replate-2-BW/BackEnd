const request = require('supertest');

const server = require('./../index.js');

describe('projectRouter Tests', function() {
/*    it('Sanity Test', function() {
        //expect(true).toBe(false);// it can fail
    })*/

    //TEST POST	/api/auth/pickup/add	 add pickupRequest
    it("POST /auth/pickup/add add a new pick up sucess", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      const itemToAdd = {
        typeOfFood: "testfood",
        qty: 10,
        preferredPickupTime: "1:00 PM",
        bizUserID: 3,
        volUserID: 1
      };
      let res = await request(server)
        .post("/api/auth/pickup/add")
        .set('Authorization', tokenPassed)
        .send(itemToAdd);

      expect(res.status).toBe(201);
    })
    it("POST /auth/pickup/add no Object/Auth", async () => {
      let res = await request(server)
        .post("/api/auth/pickup/add")

      expect(res.status).toBe(401);
    })

    //TEST PUT	/api/auth/pickup/:id
    it("PUT /auth/pickup/:id Edit Pickup sucess", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      const editItem = {
        typeOfFood: "testfood2"
      };
      let res = await request(server)
        .put("/api/auth/pickup/1")
        .set('Authorization', tokenPassed)
        .send(editItem);

      expect(res.status).toBe(201);
    })
    it("PUT /auth/pickup/:id Edit Pickup no Object/Auth", async () => {
      let res = await request(server)
        .put("/api/auth/pickup/1")

      expect(res.status).toBe(401);
    })

    //TEST GET	/api/auth/pickup/ (all unclaimed)
    it("GET /auth/pickup/ List Pickups sucess", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      let res = await request(server)
        .get("/api/auth/pickup")
        .set('Authorization', tokenPassed)

      expect(res.status).toBe(201);
    })
    it("GET /auth/pickup/ List Pickups no Auth", async () => {
      let res = await request(server)
        .get("/api/auth/pickup")

      expect(res.status).toBe(401);
    })

    //TEST GET /api/auth/pickup/:id/vol/
    it("GET /auth/pickup/:id/vol/ List Pickups sucess", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      let res = await request(server)
        .get("/api/auth/pickup/1/vol/")
        .set('Authorization', tokenPassed)

      expect(res.status).toBe(201);
    })
    it("GET /auth/pickup/:id/vol/ List Pickups no Auth", async () => {
      let res = await request(server)
        .get("/api/auth/pickup/1/vol/")

      expect(res.status).toBe(401);
    })

    //TEST GE /api/auth/pickup/:id/biz/
    it("GET /auth/pickup/:id/biz List Pickups sucess", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      let res = await request(server)
        .get("/api/auth/pickup/3/biz")
        .set('Authorization', tokenPassed)

      expect(res.status).toBe(201);
    })
    it("GET /auth/pickup/:id/biz List Pickups no Auth", async () => {
      let res = await request(server)
        .get("/api/auth/pickup/3/biz")

      expect(res.status).toBe(401);
    })

    //TEST DEL /api/auth/pickup/:id/del
    it("DEL /auth/pickup/:id/del can delete pickup", async () => {
      const user = {
        username: "testuser",
        password: "pass"
      };
      let logedin = await request(server)
        .post("/api/login")
        .send(user);

      let tokenPassed = logedin.body.yourToken
      const itemToAdd = {
        typeOfFood: "testfood",
        qty: 10,
        preferredPickupTime: "1:00 PM",
        bizUserID: 3,
        volUserID: 1
      };
      let addedPickup = await request(server)
        .post("/api/auth/pickup/add")
        .set('Authorization', tokenPassed)
        .send(itemToAdd);

      let idToDel = addedPickup.body.id;

      let res = await request(server)
        .delete(`/api/auth/pickup/${idToDel}/del`)
        .set('Authorization', tokenPassed)

      expect(res.status).toBe(201);
    })


})
