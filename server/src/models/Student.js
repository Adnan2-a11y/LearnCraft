// src/models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  studentId: { type: String, required: true, unique: true, trim: true },
  department: { type: String, trim: true },
  batch: { type: String, trim: true },
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
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Student", studentSchema);
