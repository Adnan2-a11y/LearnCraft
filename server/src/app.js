import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cooKieParser from 'cookie-parser';
import eventRoutes from './routes/event.js';


import courseRoutes from './routes/courses.js';
import authRoute from './routes/auth.js';
//import dashboardRoutes from "./routes/api/dashboard.js";
import { globalLimiter } from './middleware/rateLimit.js'; 

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cooKieParser());

//app.use('/api', indexRoutes);
app.use(globalLimiter); // Apply global rate limiter
console.log("✅ Auth route file loaded successfully!");

//Define routes
app.use('/api/auth', authRoute);
app.use('/api/course', courseRoutes);
app.use("/api/events", eventRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// 6. Centralized error handler
app.use((err, req, res, next) => {
    console.error(err); // log full error on server
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ success: false, message });
});

export default app;