const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;
let client;

const initDb = async (uri) => {
    if (database) {
        return database;
    }

    const connectionString = uri || process.env.MONGODB_URL;

    client = await MongoClient.connect(connectionString);
    database = client.db();

    return database;
};

const getDatabase = () => {
    if (!database) {
        throw Error('Database not initialized');
    }
    return database;
};

const closeDb = async () => {
    if (client) {
        await client.close();
    }
};

module.exports = {
    initDb,
    getDatabase,
    closeDb
};
