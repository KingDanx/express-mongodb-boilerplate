//? Node
const path = require("path");
//? Server
const express = require("express");
const cors = require("cors");
const tests = require("./routes/tests.js");
//? Database
const { get_database, init_db_listeners } = require("./config/db.js");
//? Logging
const LiteLogger = require("@kingdanx/litelogger");
const logger = new LiteLogger(__dirname);
//? Secrets
const env = require("dotenv");
env.config({ path: `${__dirname}/config/.config` });

const port = process.env.REST_PORT || 5000;

const app = express();
app.use(cors());
app.use((req, res, next) => {
  //? Passing to routes.
  req.logger = logger;
  next();
});
app.use("/tests", tests); //? Init route.

//? Serves files or an HTML document in the specified directory
app.use(express.static(path.join(__dirname, "static")));

app.listen(port, () => {
  logger.log(`Server started on port: ${port}`);
});

async function init() {
  init_db_listeners(logger);
  await get_database();
}

init();
