
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Course from './src/models/Course.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '.env');
dotenv.config({ path: envPath });

const checkCourses = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const count = await Course.countDocuments();
        // Use console.error to avoid buffering/truncation issues sometimes seen with stdout in some tools
        console.error(`[[[COUNT:${count}]]]`);
        if (count > 0) {
            const c = await Course.findOne();
            console.error(`[[[SAMPLE:${c.courseCode}]]]`);
        }
        await mongoose.disconnect();
    } catch (error) {
        console.error('[[[ERROR]]]', error);
    }
};
checkCourses();
