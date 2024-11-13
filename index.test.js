// install dependencies
const { execSync } = require("child_process");
execSync("npm install");
execSync("npm run seed");

const request = require("supertest");
const { db } = require("./db/connection");
const { Musician } = require("./models/index");
const app = require("./src/app");
const syncSeed = require("./seed");

describe("Method testing", () => {
  beforeAll(async () => {
    // connect to and rebuild the db
    await syncSeed();
  });
  describe("GET", () => {
    let response;
    let responeArr;
    beforeAll(async () => {
      response = await request(app).get("/musicians");
      responeArr = JSON.parse(response.text);
    });
    test("returns a status code of 200", async () => {
      expect(response.statusCode).toBe(200);
    });

    test("returns the full array of Musicians", async () => {
      expect(Array.isArray(responeArr)).toBeTruthy();
    });

    test("returns the correct number of Musicians", async () => {
      expect(responeArr).toHaveLength(3);
    });

    test("GET/:id returns the correct single Musician", async () => {
      const response = await request(app).get("/musicians/1");
      expect(JSON.parse(response.text)).toEqual(
        expect.objectContaining({
          name: "Mick Jagger",
          instrument: "Voice",
        })
      );
    });
  });

  test("POST can create a new musician", async () => {
    const response = await request(app).post("/musicians").send({
      name: "Usher",
      instrument: "Voice",
    });
    expect(JSON.parse(response.text)).toEqual(
      expect.objectContaining({
        name: "Usher",
      })
    );
  });

  test("PUT can update an exisiting musician", async () => {
    const response = await request(app)
      .put("/musicians/1")
      .send({ name: "AppleBee" });
    expect(JSON.parse(response.text).name).toEqual("AppleBee");
  });

  test("DELETE can delete a musician", async () => {
    await request(app).delete("/musicians/1");
    const musicians = await Musician.findAll();
    expect(musicians).toHaveLength(3);
  });
});
