import {Request, Response, Router} from "express";
import DepartmentModel from '../models/department.model';

const departmentRoute = Router();

departmentRoute.get('/', async(req: Request, res: Response) => {
    const allDepartments = await DepartmentModel.find({});
    res.status(200)
       .contentType("application/json")
       .json(allDepartments);
});

departmentRoute.get('/:id', async(req: Request, res: Response) => {
    const departmentId = req.params.id;
    res.contentType("application/json");

    try {
        const targetDepartment = await DepartmentModel.findOne({_id: departmentId});
        if (targetDepartment !== null)
            res.status(200)
               .json(targetDepartment);
        else
            res.status(404)
               .json({
                   message: `A department with id ${departmentId} NOT FOUND`
               });
    } catch (e) {
        res.status(400)
           .json({
               message: `department id ${departmentId} IS INVALID`
           });
    }
});

export default departmentRoute;
