const mongoose = require("mongoose");
let db = null;

function init_db_listeners(logger) {
    mongoose.connection.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
        logger.logError(`MongoDB connection error: ${err}`);
    });
    
    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
        db = null;
        setTimeout(get_database, 5_000);
    });
}



async function get_database() {
    try {
        if(db) return;

        db = await connect_DB(process.env.CONNECT_STRING);
    } catch (e) {
        console.log(e);
    }
}

async function connect_DB(connect_string) {
    try {
        const db = await mongoose.connect(connect_string);

        console.log("Connected to MongoDB");
        return db;
    } catch (e) {
        return e;
    }
}

module.exports = {
    get_database : get_database,
    init_db_listeners: init_db_listeners
};
