import {Request, Response, NextFunction, Router} from "express";
import WorkerModel from '../models/worker.model'
import authMiddleware, {AuthorizedRequest} from '../middleware/auth.middleware';

const workerRoute = Router();

workerRoute.get('/', async(req: Request, res: Response) => {
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

workerRoute.post('/', async (req: Request, res: Response) => {
    await WorkerModel.create(req.body);
    res.json({
        message: `Worker created`
    });
});


workerRoute.put('/:id/schedule', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {$set:{schedule: req.body}});
    res.json({
        message: `Schedule for worker ${workerId} was SUCCESSFULLY UPDATED`
    });
});

workerRoute.put('/:id/schedule/:day', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    const schDay = req.params.day;
    const hrs = parseFloat(req.body.hours);

    await WorkerModel.updateOne({_id: workerId, 'schedule.days.day' : schDay}, {$set:{'schedule.days.$.hours': hrs}});
    res.json({
        message: `Schedule for worker ${workerId} was SUCCESSFULLY UPDATED`
    });
});

workerRoute.post('/:id/transactions', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {$push:{transactions: req.body}});
    res.json({
        message: `Transaction log for worker ${workerId} was SUCCESSFULLY UPDATED`
    });
});

workerRoute.put('/:id', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {...req.body});
    res.json({
        message: `Worker ${workerId} was SUCCESSFULLY UPDATED`
    });
});

workerRoute.delete('/:id/schedule', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    await WorkerModel.updateOne({_id: workerId}, {$unset:{schedule: true}});
    res.json({
        message: `Schedule for worker ${workerId} was SUCCESSFULLY REMOVED`
    });
});

workerRoute.get('/:id', async(req: Request, res: Response) => {
    const workerId = req.params.id;
    res.contentType("application/json");

    try {
        const targetWorker = await WorkerModel.findOne({_id: workerId});
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

export default workerRoute;
