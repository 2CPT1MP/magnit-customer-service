const departmentRoute = require('express').Router();
const departmentModel = require('../models/department.model');

departmentRoute.get('/', async(req, res) => {
    const allDepartments = await departmentModel.find({});
    res.status(200);
    res.contentType("application/json");
    res.json(allDepartments);
});

departmentRoute.get('/:id', async(req, res) => {
    const targetId = req.params.id;
    res.contentType("application/json");

    try {
        const targetDepartment = await departmentModel.findOne({_id: targetId});

        if (targetDepartment !== null) {
            res.status(200);
            res.json(targetDepartment);
        }
        else {
            res.status(404);
            res.json({
                message: "Department with provided ID was not found"
            });
        }
    } catch (e) {
        res.status(400);
        res.json({
            message: "Invalid department ID was provided"
        });
    }
});

module.exports = departmentRoute;

