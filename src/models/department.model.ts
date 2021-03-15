import {Schema, Types, model } from 'mongoose';

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

export default model("Department", departmentSchema);