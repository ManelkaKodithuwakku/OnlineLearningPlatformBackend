import express from 'express';
import cors from 'cors';
import initializeDbConnection from './src/datasources/mongodb.js'
import userRoutes from './src/routes/usersRoute.js'

const PORT = process.env.PORT || 8080;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());
app.use(cors());

app.use(userRoutes)

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });