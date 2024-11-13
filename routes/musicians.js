const express = require("express");
const { Musician } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
  const musicians = await Musician.findAll();
  res.json(musicians);
});

router.get("/:id", async (req, res) => {
  const musician = await Musician.findByPk(req.params.id);
  res.json(musician);
});

router.post("/", async (req, res) => {
  const musician = await Musician.create(req.body);
  res.json(musician);
});

router.put("/:id", async (req, res) => {
  const updatedMusician = await Musician.findByPk(req.params.id);
  await updatedMusician.update(req.body);
  res.send(updatedMusician);
});

router.delete("/:id", async (req, res) => {
  const deletedMusician = await Musician.findByPk(req.params.id);
  await deletedMusician.destroy();
  res.send(deletedMusician);
});

module.exports = router;
