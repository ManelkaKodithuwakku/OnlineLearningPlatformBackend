import express from 'express';
import { User, authMiddleware } from '../models/user.js';
import { validateSignup, validateLogin } from '../services/user-service.js';
import bcrypt from 'bcrypt';
import { Course } from '../models/course.js';

const router = express.Router();

// Route to handle user signup
router.post('/api/users/signup', async (req, res) => {
    try {
        // Validate the request body for signup
        const { error } = validateSignup(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if user with the given email already exists
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (user) return res.status(406).send({ message: "User already exists with the given email." });

        // Generate hash for the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Update the password with the hashed password
        req.body.password = hashPassword;

        // Save the new user to the database
        await new User(req.body).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Error occurred while signing up the user" });
    }
});

// Route to handle user login
router.post('/api/users/login', async (req, res) => {
    try {
        // Validate the request body for login
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Find the user based on the provided email
        const user = await User.findOne({ email: req.body.email.toLowerCase() });
        if (!user) return res.status(406).send({ message: "User not registered yet. Please signup first and then login" });

        // Check if the provided password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(401).send({ message: "Invalid Username or Password" });

        // Generate an authentication token for the user
        const token = user.generateAuthToken();
        res.status(200).send({ token: token, message: "Logged in successfully" });
    } catch (err) {
        res.status(500).send({ message: "Error occurred while logging in the user" });
    }
});

// Route to get user details (requires authentication middleware)
router.get('/api/user/details', authMiddleware, async (req, res) => {

    const courses = await Course.find({});
    const coursesTitle = req.user.enrolledCourses.map(courseId => {
        let exitCourse = courses.find((e)=>{
            return e._id.toString()===courseId.toString()
        });
        return exitCourse.title;
    })

    // The user details are available in req.user
    const userDetails = {
        username: req.user.username,
        email: req.user.email.toLowerCase(),
        id: req.user._id,
        isAdmin: req.user.isAdmin,
        enrolledCourses: coursesTitle
    };

    res.json(userDetails);
});

router.put('/api/user/enroll/:courseId', authMiddleware,async (req, res) =>{
    const {isEnroll} = req.body;
    const {courseId} = req.params;

    let updateOperation;
    if (isEnroll) {
        // If isEnroll is true, push the courseId into the enrolledCourses array
        updateOperation = { $addToSet: { enrolledCourses: courseId } };
    } else {
        // If isEnroll is false, pull the courseId from the enrolledCourses array
        updateOperation = { $pull: { enrolledCourses: courseId } };
    }

    // Update the user document based on the email
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email: req.user.email.toLowerCase() },
            updateOperation
        );

        // console.log(updatedUser)

        res.status(200).send({isSuccess : true})
    } catch (error) {
        res.status(500).send({isSuccess : false})
    }
})

// Export the router
export default router
