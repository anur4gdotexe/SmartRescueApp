const {MongoClient} = require("mongodb");

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let sheltersCollection;

async function connectDB() {
    try {
        await client.connect();
        const db = client.db("rescueAppDB");

        sheltersCollection = db.collection("shelters");
    }
    catch (err) {
        console.log("Couldn't connect to database:", err);
    }
}

function getSheltersCollection() {
    if (!sheltersCollection) {
        throw new Error("Database not initialized")
    }

    return sheltersCollection;
}

module.exports = {connectDB, getSheltersCollection};