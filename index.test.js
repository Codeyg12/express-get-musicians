// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const { seedMusician } = require("./seedData");

describe("./musicians endpoint", () => {
  let getAll, getSingle, makeNew, updateOne, deleteOne;
  beforeAll(async () => {
    getAll = await request(app).get("/musicians");
    getSingle = await request(app).get("/musicians/1");
    makeNew = await request(app).post("/musicians");
    updateOne = await request(app).put("/musicians/1");
    deleteOne = await request(app).delete("/musicians/1");
  });

  test("should return all musicians", async () => {
    const resData = JSON.parse(getAll.text);
    expect(resData).toHaveLength(3);
  });

  test("should return one musician", async () => {
    const resData = JSON.parse(getSingle.text);
    expect(resData).toHaveProperty("name", "Mick Jagger");
  });

  test("should add a new musician", async () => {
    await Musician.create({ name: "Rick Jagger", insturment: "Beatbox" });
    const newMusician = await request(app).get("/musicians/5");
    expect(JSON.parse(newMusician.text)).toEqual(
      expect.objectContaining({ name: "Rick Jagger" })
    );
  });

  test("should delete an existing musician", async () => {
    await request(app).delete("/musicians/4");
    const allMusicians = await request(app).get("/musicians");
    expect(JSON.parse(allMusicians.text)).toHaveLength(3);
  });

  test("requests should work and have statusCode of 200", async () => {
    expect(getAll.statusCode).toBe(200);
    expect(getSingle.statusCode).toBe(200);
    expect(makeNew.statusCode).toBe(200);
    expect(updateOne.statusCode).toBe(200);
    expect(deleteOne.statusCode).toBe(200);
  });
});

describe("./bands endpoint", () => {
  test("get should work and respond with 200", async () => {
    const res = await request(app).get("/bands");
    expect(res.statusCode).toBe(200);
  });

  test("should respond with the seeded data", async () => {
    const res = await request(app).get("/bands");
    const resData = JSON.parse(res.text);
    expect(resData).toHaveLength(3);
  });
});
