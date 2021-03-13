import { combineReducers } from "redux";
import workerReducer from './workers.reducer'

export default combineReducers({
    workers: workerReducer
});