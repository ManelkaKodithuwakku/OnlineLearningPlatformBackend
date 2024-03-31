import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

// Define the user schema for MongoDB.
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false},
    enrolledCourses: {type: [String], default: []}
});

// Method to generate authentication token for a user.
userSchema.methods.generateAuthToken = function () {
    // Sign a JWT token using the user's ID, JWT_SECRET, and set expiration to 7 days.
    const token = jwt.sign({id: this._id, email: this.email, password:this.password, isAdmin:this.isAdmin, username:this.username }, process.env.JWT_SECRET, { expiresIn: "2d" });
    return token;
};

// Middleware function for authentication.
const authMiddleware = async (req, res, next) => {
    // Extract the Authorization header from the request.
    const authHeader = req.header('Authorization');

    // Check if the Authorization header is missing or has an invalid format.
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - Missing or invalid token format' });
    }

    try {
        // Extract the token from the Authorization header.
        const token = authHeader.split(' ')[1];

        // Verify the token using the JWT_SECRET.
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded ID.
        const user = await User.findOne({email: decoded.email});

        // Check if the user exists.
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        // Attach the user to the request for further processing.
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

// Create the User model based on the user schema.
const User = mongoose.model("user", userSchema);

// Export the User model and the authentication middleware.
export { User, authMiddleware };
