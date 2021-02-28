const { Schema, model, Types } = require("mongoose");

const jobSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    department:
        {
            type: Types.ObjectId,
            ref: "Department"
        },
    workers: [
        {
            type: Types.ObjectId,
            ref: "Worker"
        }
    ]
});

module.exports = model("Job", jobSchema);