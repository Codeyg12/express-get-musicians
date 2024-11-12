const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/musicians", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

app.get("/musicians/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

app.post("/musicians", async (req, res) => {
  const musician = await Musician.create(req.body);
  res.json(musician);
});

app.put("/musicians/:id", async (req, res) => {
  const updatedMusician = await Musician.findByPk(req.params.id);
  await updatedMusician.update(req.body);
  res.send(updatedMusician);
});

app.delete("/musicians/:id", async (req, res) => {
  const deletedMusician = await Musician.findByPk(req.params.id);
  await deletedMusician.destroy();
  res.send(deletedMusician);
});

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

module.exports = app;
