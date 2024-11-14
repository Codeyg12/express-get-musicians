const express = require("express");
const router = express.Router();
const { Band, Musician } = require("../models");

router.get("/", async (req, res) => {
  const bands = await Band.findAll({ include: Musician });
  res.json(bands);
});

router.get("/:id", async (req, res) => {
  const band = await Band.findByPk(req.params.id, { include: Musician });
  res.json(band);
});

module.exports = router;
