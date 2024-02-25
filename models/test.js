const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  epoc: { type: Number, required: true },
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;
