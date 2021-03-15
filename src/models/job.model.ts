import {Schema, Types, model} from 'mongoose';

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
    shift: {
        type: Number,
        required: true
    },
    overpay: {
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

export default model("Job", jobSchema);