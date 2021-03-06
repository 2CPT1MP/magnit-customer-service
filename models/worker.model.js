const { Schema, model, Types } = require("mongoose");

const workerSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        last: {
            type: String,
            required: true,
        },
        middle: {
            type: String,
            required: true
        }
    },
    department: {
        type: Types.ObjectId,
        ref: "Department",
        required: true
    },
    job: {
        type: Types.ObjectId,
        ref: "Job",
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    schedule: {
        month: {
            type: Number,
            required: false,
        },
        year: {
            type: Number,
            required: false,
        },
        days: [
            {
                day: {
                    type: Number,
                    required: false,
                },
                hours: {
                    type: Number,
                    required: false,
                }
            }
        ]
    }
});

module.exports = model("Worker", workerSchema);