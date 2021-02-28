const { Schema, model, Types } = require("mongoose");

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    jobs: [
        {
            type: Types.ObjectId,
            ref: "Job"
        }
    ],

    workers: [
        {
            type: Types.ObjectId,
            ref: "Worker"
        }
    ]
});

module.exports = model("Department", departmentSchema);