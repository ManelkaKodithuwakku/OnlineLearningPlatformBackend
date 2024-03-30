import { MongoClient } from 'mongodb';

const MONGO_HOST = process.env.DB_HOST || 'localhost';
const MONGO_PORT = process.env.DB_PORT || '27017';

let client;

export const initializeDbConnection = async () => {
    client = await MongoClient.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, 
    // {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // }
    );
}

export const getDbConnection = dbName => {
    const db = client.db(dbName);
    return db;
}