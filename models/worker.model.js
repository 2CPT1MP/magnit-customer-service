const { Schema, model, Types } = require("mongoose");

const workerSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true,
            unique: false
        },
        last: {
            type: String,
            required: true,
            unique: false
        }
    },
    department: {
        type: Types.ObjectId,
        ref: "Department",
        required: true,
        unique: false
    },
    job: {
        type: Types.ObjectId,
        ref: "Job",
        required: true,
        unique: false
    },
    phone: {
        type: String,
        unique: true,
        required: false
    },
    address: {
        type: String,
        unique: false,
        required: true
    },

    schedule: [
        {
            hours: {
                type: Number,
                required: true,
                unique: false
            }
        }
    ]
});

module.exports = model("Worker", workerSchema);