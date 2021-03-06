import  request  from "supertest";
import { app } from '../app';

import createConnection from '../database';
describe("Users", () => {

  beforeAll(async() => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
    await connection.close();
  });

  it("Should be able to create a new user",async () =>{
   const response = await request(app).post("/users")
    .send({
        email: "user@example.com",
        name: "User Exemple",
    });

    expect(response.status).toBe(201);  
  });

  it("should not to be able to create a uer with exists email", async () =>{
    const response = await request(app).post("/users")
    .send({
        email: "user@example.com",
        name: "User Exemple",
    });

    expect(response.status).toBe(400);  
  });
});