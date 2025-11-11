import Course from '../models/Course.js';
import mongoose from 'mongoose'; // Import mongoose for ObjectId validation

export const addCourse = async (req, res) => {
    console.log('addCourse Controller: req.user:', req.user ? req.user.username : 'Undefined');
    // CRUCIAL LOG: req.user.profile will now be undefined, but req.user._id will be available
    console.log('addCourse Controller: req.user._id:', req.user ? req.user._id : 'Undefined'); 
    try {
        // FIX: Use req.user._id directly as the teacher's ID,
        // since the User document itself contains the teacher's identifying info
        const teacherProfileId = req.user._id; 
        const { courseCode, courseName, credit, department, semester } = req.body;

        // Basic validation for required fields
        if (!courseCode || !courseName || !credit || !department || !semester) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields: courseCode, courseName, credit, department, and semester.',
            });
        }

        // Check if a course with the same courseCode already exists
        const existingCourse = await Course.findOne({ courseCode });
        if (existingCourse) {
            return res.status(400).json({
                success: false,
                message: `Course with code '${courseCode}' already exists.`,
            });
        }

        const newCourse = new Course({
            courseCode,
            courseName,
            credit,
            department,
            semester,
            teacher: teacherProfileId, // Link to the authenticated user's _id
        });
        await newCourse.save();
        
        // IMPORTANT: This populate will only work if there's a document in the 'teachers' collection
        // whose _id matches teacherProfileId (req.user._id) AND it contains 'fullName' and 'email'.
        // If not, the 'teacher' field in the response will be null or only contain the ID.
        await newCourse.populate('teacher', 'fullName email'); 

        res.status(201).json({
            success: true,
            message: 'Course added successfully',
            course: newCourse
        });
    } catch (error) {
        console.error('Error in addCourse controller:', error);
        // Handle Mongoose validation errors specifically
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error while adding course',
            error: error.message
        });
    }
};

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;
        // FIX: Use req.user._id directly
        const teacherProfileId = req.user._id; // Authenticated user's _id
        const updateData = req.body;

        // Find the course
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // ✅ Ownership check: Only the teacher who created it can update
        if (course.teacher.toString() !== teacherProfileId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this course.'
            });
        }

        // Prevent updating courseCode if it's already taken by another course
        if (updateData.courseCode && updateData.courseCode !== course.courseCode) {
            const existingCourseWithCode = await Course.findOne({ courseCode: updateData.courseCode });
            if (existingCourseWithCode && existingCourseWithCode._id.toString() !== course._id.toString()) {
                return res.status(400).json({
                    success: false,
                    message: `Course with code '${updateData.courseCode}' already exists.`,
                });
            }
        }

        // Update allowed fields
        Object.assign(course, updateData);
        course.updatedAt = Date.now(); // Update timestamp manually if not using { timestamps: true } option in schema

        const updatedCourse = await course.save();
        await updatedCourse.populate('teacher', 'fullName email'); // Populate teacher details for response

        res.status(200).json({
            success: true,
            message: 'Course updated successfully',
            course: updatedCourse
        });
    } catch (error) {
        console.error('Error updating course:', error);
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: error.errors
            });
        }
        res.status(500).json({
            success: false,
            message: 'Server Error while updating course',
            error: error.message
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        // FIX: Use req.user._id directly
        const teacherProfileId = req.user._id; // Authenticated user's _id

        // Find the course
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // ✅ Ownership check: Only the teacher who created it can delete
        if (course.teacher.toString() !== teacherProfileId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this course.'
            });
        }

        await course.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error while deleting course',
            error: error.message
        });
    }
};

export const getAllCourses = async (req, res) => {
  try {
    const { search } = req.query; // Get the search term from query parameters
        let query = {}; // Initialize an empty query object

        if (search) {
            // If a search term exists, build the search query
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex

            query = {
                $or: [ // Search across multiple fields
                    { courseName: { $regex: searchRegex } },
                    { courseCode: { $regex: searchRegex } },
                    // Add other fields you want to search by, e.g., { department: { $regex: searchRegex } }
                ]
            };
        }
    const courses = await Course.find(query).populate('teacher', 'fullName email');
    res.status(200).json({ success: true, courses });
  } catch (err) {
    console.error('❌ Error fetching courses:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching courses' });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    // Populate the 'teacher' field with 'fullName' and 'email' from the Teacher profile
    // This will only work if there are Teacher documents whose _id matches the 'teacher' field in Course
    const course = await Course.findById(id).populate('teacher', 'fullName email');

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (err) {
    console.error('❌ Error fetching course:', err.message);
    res.status(500).json({ success: false, message: 'Server error while fetching course' });
  }
};