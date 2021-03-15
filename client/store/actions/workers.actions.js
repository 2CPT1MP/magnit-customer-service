import {
    FETCH_WORKERS,
    FETCH_WORKER_DETAILS,
    EDIT_WORKER_DETAILS
} from "./types";


export const fetchWorkers = () => async (dispatch) => {
    try {
        const workers = await request('/api/workers');
        dispatch({
            type: FETCH_WORKERS,
            payload: {
                workers
            }
        });
    } catch (e) {
        throw Error("Can't fetch workers!\n" + e.message);
    }
}

export const fetchWorkerDetails = (workerId) => async (dispatch) => {
    try {
        const workerDetails = await request(`/api/workers/${workerId}`);
        dispatch({
            type: FETCH_WORKER_DETAILS,
            payload: {
                workerDetails
            }
        });
    } catch (e) {
        throw Error("Can't fetch worker details!\n" + e.message);
    }
}

export const editWorkerDetails = (workerId, updatedInfo) => async (dispatch) => {
    try {
        console.log("EDIT WORKER", workerId, updatedInfo);
        await request(`/api/workers/${workerId}`, 'PUT', updatedInfo);
        dispatch({
            type: EDIT_WORKER_DETAILS,
            payload: {
                workerId,
                updatedInfo
            }
        });
    } catch (e) {
        throw Error("Can't edit worker details!\n" + e.message);
    }
}


const request = async (url, method="GET", body=null, headers={}) => {
    try {
        if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }
        const res = await fetch(url, {method, body, headers});
        const data = await res.json();

        if (!res.ok)
            throw new Error(data.message || "Something went wrong");
        return data;
    } catch (e) {
        throw e;
    }
}