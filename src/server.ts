const config = require('config');
import mongoose from 'mongoose';
import express from "express";

const server = express();
import workerRoute from './routes/worker.route';
import departmentRoute from './routes/department.route';
import jobRoute from './routes/job.route';

const connectToDatabase = async() => {
    try {
        await mongoose.connect(config.get("DB_URL"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (exception) {
        console.error("Can't connect to the database!");
    }
}

connectToDatabase();
server.use(express.json());
server.use(express.urlencoded({extended: false}));
/*
server.use('/api/workers', (req, res, next) => setTimeout(() => next(), 3000));
server.use('/api/departments', (req, res, next) => setTimeout(() => next(), 1000));
server.use('/api/jobs', (req, res, next) => setTimeout(() => next(), 2000));
 */

server.use("/api/workers", workerRoute);
server.use("/api/departments", departmentRoute);
server.use("/api/jobs", jobRoute);

server.listen(config.get("SERVER_PORT"),
    () => console.log("Server listening on port " + config.get("SERVER_PORT")));


