import express from 'express';
import { authMiddleware } from '../models/user.js';
import { Course } from '../models/course.js';
import { validateCourse } from '../services/course-service.js';

const router = express.Router();

router.post('/api/admin/add/course', authMiddleware,async (req, res) =>{
    const {title, content} = req.body;

    if(!req.user.isAdmin){
        return res.status(401).send({ message: "Admin only can input new course" });
    }

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    try {
        await new Course({title, content}).save();
        return res.status(201).send({ message: "Successfully added a new course" })
    } catch (error) {
        return res.status(500).send({ message: "Error occurred while adding new xourse" })
    }
})

router.get('/api/get/courses',authMiddleware, async (req,res)=>{
    try {
        const courseList = await Course.aggregate([
            {
                $project: {
                    id: '$_id',
                    title:1,
                    content:1
                }
            }
        ]);
        return res.status(200).send({ courses: courseList })
    } catch (error) {
        return res.status(500).send({ message: "Error occurred while getting courses" })
    }
})

router.put('/api/admin/update/:courseId',authMiddleware,async (req,res)=>{
    if(!req.user.isAdmin){
        return res.status(401).send({ message: "Admin only can input new course" });
    }

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { title, content } = req.body;
    const { courseId } = req.params;

    const updateOperation = {
        title: title,
        content: content
    };

    try {
        // Find the course by its courseId
        const existingCourse = await Course.findById(courseId);

        if (!existingCourse) {
            // If the course with the given courseId doesn't exist
            return res.status(404).json({ isSuccess: false, message: 'Course not found' });
        }

        // Update the course document based on the courseId
        const updatedCourse = await Course.findOneAndUpdate(
            { _id: courseId },
            updateOperation,
            { new: true } // To return the updated document
        );

        // If the course is found and updated successfully
        return res.status(200).json({ isSuccess: true });
    } catch (error) {
        // Handle any errors that occur during the update operation
        console.error(error);
        return res.status(500).json({ isSuccess: false, message: 'Internal server error' });
    }
})


// Export the router
export default router