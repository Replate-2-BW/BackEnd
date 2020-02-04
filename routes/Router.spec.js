const request = require('supertest');

const server = require('./../index.js');

describe('Server End Point Tests', function() {
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


  describe('pickupRouter Tests', function() {
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
})
