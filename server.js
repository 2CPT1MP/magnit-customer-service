const config = require('config');
const mongoose = require('mongoose');

const express = require("express");
const server = express();

const workerRouter = require('./routes/worker.route')
const departmentRouter = require('./routes/department.route');
const jobRouter = require('./routes/job.route');

const connectToDatabase = async() => {
    try {
        const DB_URL = config.get("DB_URL");
        await mongoose.connect(DB_URL, {
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

server.use("/api/workers", workerRouter);
server.use("/api/departments", departmentRouter);
server.use("/api/jobs", jobRouter);

const SERVER_PORT = config.get("SERVER_PORT");
server.listen(SERVER_PORT, () => {
    console.log("Server listening on port " + SERVER_PORT);
});
