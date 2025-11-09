import { verifyToken } from "../utils/jwt.js";
import User from "../models/Users.js";

// ✅ Basic Authentication
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        const decoded = verifyToken(token);

        // Find user by the userId from the token payload.
        // IMPORTANT: Removed .populate('profile') because the User document
        // in the database currently embeds profile data directly and lacks
        // the 'profile' and 'profileModel' fields for Mongoose to populate.
        const user = await User.findById(decoded.userId)
            .select('-password'); 

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found for this token. Token may be invalid.'
            });
        }

        req.user = user; // Attach the full user object (which now includes embedded profile data) to the request
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        res.status(401).json({
            success: false,
            message: 'Token is not valid.'
        });
    }
};

// ✅ Teacher-only middleware
const teacherOnly = async (req, res, next) => {
    await authMiddleware(req, res, async () => {
        if (req.user.role !== 'teacher') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Teachers only.'
            });
        }
        next();
    });
};

// ✅ Student-only middleware (optional)
const studentOnly = async (req, res, next) => {
    await authMiddleware(req, res, async () => {
        if (req.user.role !== 'student') {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Students only.'
            });
        }
        next();
    });
};

export { authMiddleware, teacherOnly, studentOnly };
