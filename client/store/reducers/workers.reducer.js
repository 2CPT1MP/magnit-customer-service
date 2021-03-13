import {FETCH_WORKERS, ADD_WORKER, FETCH_WORKER_DETAILS, EDIT_WORKER_DETAILS} from "../actions/types";

const initialState = {
    workers: [],
    worker: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_WORKERS:
            return {
                ...state,
                workers: action.payload.workers
            }
        case FETCH_WORKER_DETAILS:
            return {
                ...state,
                workerDetails: action.payload.workerDetails
            }
        case EDIT_WORKER_DETAILS:
            return {
                ...state,
                workerDetails: action.payload.updatedInfo,
                workers: [...state.workers.filter(w => w._id !== action.payload._id), action.payload.updatedInfo]
            }
        default:
            return state;
    }
}