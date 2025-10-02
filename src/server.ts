import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import replenishmentRouter from './routes/replenishmentRoutes.js';
import warehouseRouter from './routes/warehouseRoutes.js';
import { initializeConsumers } from './consumer/index.js';

dotenv.config();

const PORT = process.env.PORT || 3003;

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response)=>{
    res.json(
        {
            "message": "Backen API is running..."
        }
    ).status(200);
});

async function runWithDB() {
    // all the things inside this function needs database to be connected before they run.
    await connectDB();
    app.use("/api/warehouse", warehouseRouter);
    app.use("/api/replenishment", replenishmentRouter);
    // Initialize Kafka consumers after routes are set up
    await initializeConsumers();
}

runWithDB();

app.listen(PORT, ()=>console.log(`Server is running at http://localhost:${PORT}`));

