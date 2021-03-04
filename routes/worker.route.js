const workerRoute = require('express').Router();
const workerModel = require('../models/worker.model');

workerRoute.get('/', async(req, res) => {
    const allWorkers = await workerModel.find({}, {schedule: false, phone: false, address: false})
        .populate('department', 'name')
        .populate('job', 'name');

    res.status(200);
    res.contentType("application/json");
    res.json(allWorkers);
});


workerRoute.put('/:id/schedule', async(req, res) => {
    await workerModel.updateOne({_id: req.params.id}, {$set:{schedule: req.body}});
    res.json({
        message: "okay"
    });
});

workerRoute.delete('/:id/schedule', async(req, res) => {
    await workerModel.updateOne({_id: req.params.id}, {$unset:{schedule: {}}});
    res.json({
        message: "okay"
    });
});

workerRoute.get('/:id', async(req, res) => {
    const targetId = req.params.id;
    res.contentType("application/json");

    try {
        const targetWorker = await workerModel.findOne({_id: targetId});

        if (targetWorker !== null) {
            res.status(200);
            res.json(targetWorker);
        }
        else {
            res.status(404);
            res.json({
                message: "Worker with provided ID was not found"
            });
        }
    } catch (e) {
        res.status(400);
        res.json({
            message: "Invalid worker ID was provided"
        });
    }
});

module.exports = workerRoute;

