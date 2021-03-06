const { Schema, model, Types } = require("mongoose");

const jobSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    department:
        {
            type: Types.ObjectId,
            ref: "Department"
        },
    salary: {
        type: Number,
        required: true
    },
    workers: [
        {
            type: Types.ObjectId,
            ref: "Worker"
        }
    ]
});

module.exports = model("Job", jobSchema);