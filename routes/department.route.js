const departmentRoute = require('express').Router();
const DepartmentModel = require('../models/department.model');

departmentRoute.get('/', async(req, res) => {
    const allDepartments = await DepartmentModel.find({});
    res.status(200)
       .contentType("application/json")
       .json(allDepartments);
});

departmentRoute.get('/:id', async(req, res) => {
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

module.exports = departmentRoute;

