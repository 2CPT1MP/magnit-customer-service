const jobRoute = require('express').Router();
const jobModel = require('../models/job.model');

jobRoute.get('/', async(req, res) => {
    const allJobs = await jobModel.find({});
    res.status(200);
    res.contentType("application/json");
    res.json(allJobs);
});

jobRoute.get('/:id', async(req, res) => {
    const targetId = req.params.id;
    res.contentType("application/json");

    try {
        const targetJob = await jobModel.findOne({_id: targetId});

        if (targetJob !== null) {
            res.status(200);
            res.json(targetJob);
        }
        else {
            res.status(404);
            res.json({
                message: "Job with provided ID was not found"
            });
        }
    } catch (e) {
        res.status(400);
        res.json({
            message: "Invalid job ID was provided"
        });
    }
});

module.exports = jobRoute;

