import express from "express";
import { authMiddleware, teacherOnly } from '../middleware/auth.js'; // Import authMiddleware and teacherOnly
import { 
  addCourse, 
  updateCourse, 
  deleteCourse, 
  getAllCourses, 
  getCourseById 
} from '../controllers/courseController.js'; // Import controller functions

const router = express.Router();

// ✅ Add Course (Teacher only)
// Uses teacherOnly middleware for authentication and role check
router.post('/add', teacherOnly, addCourse);

// ✅ Get All Courses (Authenticated users only - students and teachers)
// Uses authMiddleware to ensure user is logged in
router.get("/", authMiddleware, getAllCourses);

// ✅ Get Course by ID (Authenticated users only - students and teachers)
// Uses authMiddleware to ensure user is logged in
router.get("/:id", authMiddleware, getCourseById);

// ✅ Update Course (Teacher only, with ownership check in controller)
// Uses teacherOnly middleware for authentication and role check
router.put('/:id', teacherOnly, updateCourse);

// ✅ Delete Course (Teacher only, with ownership check in controller)
// Uses teacherOnly middleware for authentication and role check
router.delete('/:id', teacherOnly, deleteCourse);

export default router;