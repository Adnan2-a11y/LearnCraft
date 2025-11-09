import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  credit: { type: Number, required: true },
  department: { type: String, required: true, trim: true },
  semester: { type: String, required: true, trim: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default: null
  }
}, { timestamps: true });

export default mongoose.model("Course", courseSchema);
