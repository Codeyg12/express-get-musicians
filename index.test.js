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
})

describe("./bands endpoint", () => {
    test("get should work and respond with 200", async () => {
        const res = await request(app).get("/bands")
        expect(res.statusCode).toBe(200)
    })
    
    test("should respond with the seeded data", async () => {
        const res = await request(app).get("/bands")
        const resData = JSON.parse(res.text)
        expect(resData).toHaveLength(3)
    }) 
})