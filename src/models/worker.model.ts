import {Schema, Types, model} from "mongoose";

const workerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true
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
    },
    transactions: [
        {
            timestamp: {
                type: String
            },
            payout: {
                type: Number
            }
        }
    ]
});

export default model("Worker", workerSchema);