const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function connectDB() {
    await client.connect();
    db = client.db('MyBD');
    console.log('Підключено до MongoDB');
}

function getDB() {
    if (!db) {
        throw new Error('DB not initialized');
    }
    return db;
}

module.exports = { connectDB, getDB };