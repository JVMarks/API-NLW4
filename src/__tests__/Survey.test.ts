import  request  from "supertest";
import { app } from '../app';

import createConnection from '../database';
describe("Surveys", () => {

  beforeAll(async() => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
    await connection.close();
  });

  it("Should be able to create a new Surveys",async () =>{
   const response = await request(app).post("/surveys")
    .send({
        title: "Title Example",
        description: "Description Example"
    });

    expect(response.status).toBe(201);  
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all Surveys",async () =>{
     await request(app).post("/surveys")
     .send({
         title: "Title Example2",
         description: "Description Example2"
     });
 
     const response = await request(app).get("/surveys");
     expect(response.body.length).toBe(2);  
   });
});