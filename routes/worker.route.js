const workerRoute = require('express').Router();
const WorkerModel = require('../models/worker.model');

workerRoute.get('/', async(req, res) => {
    const allWorkers = await WorkerModel.find({}, {
        schedule: false,
        phone: false,
        address: false
    })
       .populate('department', 'name')
       .populate('job', 'name');

    res.status(200)
       .contentType("application/json")
       .json(allWorkers);
});


workerRoute.put('/:id/schedule', async(req, res) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {$set:{schedule: req.body}});
    res.json({
        message: `Schedule for worker ${workerId} was SUCCESSFULLY UPDATED`
    });
});

workerRoute.delete('/:id/schedule', async(req, res) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {$unset:{schedule: {}}});
    res.json({
        message: `Schedule for worker ${workerId} was SUCCESSFULLY REMOVED`
    });
});

workerRoute.get('/:id', async(req, res) => {
    const workerId = req.params.id;
    res.contentType("application/json");

    try {
        const targetWorker = await WorkerModel.findOne({_id: workerId});
        console.log(targetWorker);
        if (targetWorker !== null)
            res.status(200)
               .json(targetWorker);
        else
            res.status(404)
               .json({
                   message: `Worker with id ${workerId} was NOT FOUND`
               });
    } catch (e) {
        res.status(400)
           .json({
               message: `Worker id ${workerId} is INVALID`
           });
    }
});

module.exports = workerRoute;

