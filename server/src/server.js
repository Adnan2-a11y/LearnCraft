import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';

dotenv.config();
const PORT = process.env.PORT || 5000;

(async() => {
    try {
        await connectDB();
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error during server startup:", error);
        process.exit(1);
    }
})();