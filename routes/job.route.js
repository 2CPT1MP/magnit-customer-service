const jobRoute = require('express').Router();
const JobModel = require('../models/job.model');

jobRoute.get('/', async(req, res) => {
    const allJobs = await JobModel.find({});
    res.status(200)
       .contentType("application/json")
       .json(allJobs);
});

jobRoute.get('/:id', async(req, res) => {
    const jobId = req.params.id;
    res.contentType("application/json");

    try {
        const targetJob = await JobModel.findOne({_id: jobId});

        if (targetJob !== null)
            res.status(200)
               .json(targetJob);
        else
            res.status(404)
               .json({
                   message: `Job with id ${jobId} was NOT FOUND`
               });
    } catch (e) {
        res.status(400)
           .json({
               message: `Job id ${jobId} IS INVALID`
           });
    }
});

module.exports = jobRoute;

