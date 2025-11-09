// src/utils/jwt.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const generateToken = (user) => { // receive userId and role
    if (!user || !user._id){
        throw new Error("Invalid user object passed to generateToken()");
    }

    const payload = {
        userId: user._id.toString(), // BUG FIX: Changed 'id' to 'userId' to match middleware
        email: user.email,
        role : user.role
    };

    return jwt.sign(payload, JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN})
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        const error = new Error("Invalid or expired token");
        error.statusCode = 401;
        throw error;
    }
};

export { generateToken, verifyToken };