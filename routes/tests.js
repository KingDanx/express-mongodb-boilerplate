const express = require("express");
const router = express.Router();
const Test = require("../models/test.js");
require("dotenv").config({ path: `../config/.config` });

router.get("/", async (req, res) => {
  try {
    const tests = await Test.find();
    res.send(tests);
  } catch (e) {
    req.logger.logError(`Error GET: /tests -> ${e.toString()}`);
    res.status(400).send({ error: e.toString() });
  }
});

router.post("/", async (req, res) => {
  try {
    const now = new Date();

    const test = new Test({
      date: now,
      epoc: now.getTime(),
    });

    req.logger.log(`New test created: ${JSON.stringify(test)}`);
    await test.save();

    res.send({ test: test });
  } catch (e) {
    req.logger.logError(`Error POST: /tests -> ${e.toString()}`);
    res.status(400).send({ error: e.toString() });
  }
});

module.exports = router;
