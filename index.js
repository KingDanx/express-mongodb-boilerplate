//? Server
const express = require('express');
const cors = require('cors');
//? Database
const { get_database, init_db_listeners } = require('./config/db.js');
//? Logging
const LiteLogger = require('@kingdanx/litelogger');
const logger = new LiteLogger(__dirname);
//? Secrets
const env = require('dotenv');
env.config({ path: `${__dirname}/config/.config` });
//? Node
const fs = require("fs");
const path = require("path");


const port = process.env.REST_PORT || 5000
const app = express();
app.use(cors());
app.listen(port, () => {
  logger.log(`Server started on port: ${port}`);
});

app.use(express.static(path.join(__dirname, 'static')));

async function init() {
    init_db_listeners(logger);
    await get_database();
}

init();