// src/models/Teacher.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  teacherId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, trim: true },
  designation: { type: String, trim: true },
  phone: {
    type: String,
    trim: true,
    match: [/^(\+8801[3-9]\d{8})?$/, "Invalid Bangladeshi number"],
    default: null,
  },
  email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
  joinDate: { type: Date, default: Date.now },
});

export default mongoose.model("Teacher", teacherSchema);
