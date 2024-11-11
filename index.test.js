// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test("get should work and respond with 200", async () => {
        const res = await request(app).get("/musicians")
        expect(res.statusCode).toBe(200)
    })
    
    test("should respond with the seeded data", async () => {
        const res = await request(app).get("/musicians")
        const resData = JSON.parse(res.text)
        expect(resData).toHaveLength(3)
    })
    
// Day 1 Extension
    //     Extension Problems
    // Create routes for GET /musicians/1 that returns the first item in the database. Repeat for the other items in the database.
    // A Band model has been created for you. Create a GET /bands route that returns all Band data in the database by doing the following:
    // Create the GET /bands route.
    // Create tests to verify that your /bands endpoint works as expected!



    
})
