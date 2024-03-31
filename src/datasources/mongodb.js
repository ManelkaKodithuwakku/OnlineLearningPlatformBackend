import mongoose from 'mongoose'

const MONGO_HOST = process.env.DB_HOST || 'localhost';
const MONGO_PORT = process.env.DB_PORT || '27017';
const MONGO_DB = process.env.DATABASE || 'default';

/**
 * Function to connect to MongoDB using Mongoose.
 */
const initializeDbConnection = async () => {
    try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error; // Re-throw the error to handle it in app.js
    }
};

export default initializeDbConnection;
