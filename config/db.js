const mongoose = require("mongoose");
const DB_RETRY = 3_000;
let db = null;
let dbInterval;
let is_connecting = false;

function init_db_listeners() {
  mongoose.connection.on("error", (err) => {
    db = null;
    console.error(`MongoDB connection error: ${err}`);
    global.logger.logError(`MongoDB connection error: ${err}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected");
    db = null;
    clearInterval(dbInterval);
    dbInterval = setInterval(get_database, DB_RETRY);
  });
}

async function get_database() {
  if (db || is_connecting) return;

  is_connecting = true;
  try {
    db = await connect_DB(process.env.CONNECT_STRING);
    if (mongoose.connection.readyState == 1) {
      clearInterval(dbInterval);
      console.log("Connected to MongoDB");
    } else {
      console.log(mongoose.connection.readyState);
    }
  } catch (e) {
    db = null;
    console.log(e);
  } finally {
    is_connecting = false;
  }
}

async function connect_DB(connect_string) {
  try {
    if (db) return;
    const database = await mongoose.connect(connect_string);
    return database;
  } catch (e) {
    db = null;
    global.logger.logError(
      `Failed to connect to the database! Error: ${e.toString()}`
    );
  }
}

module.exports = {
  get_database: get_database,
  init_db_listeners: init_db_listeners,
};
