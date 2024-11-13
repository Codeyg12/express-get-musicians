const express = require("express");
const app = express();
const { Band } = require("../models/index");
const musicianRouter = require("../routes/musicians");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/musicians", musicianRouter);

app.get("/bands", async (req, res) => {
  const bands = await Band.findAll();
  res.json(bands);
});

module.exports = app;
