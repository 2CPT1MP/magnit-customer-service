import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { WorkerRecordsPage } from "./pages/worker-records.page";
import { WorkerDetailsPage } from "./pages/worker-details.page";
import {CreateWorkerPage} from "./pages/create-worker.page";

export const workerRoutes = () => {
    return (
        <Switch>
            <Route path={"/workers"} exact>
                <WorkerRecordsPage />
            </Route>
            <Route path={"/workers/create"} exact>
                <CreateWorkerPage />
            </Route>
            <Route path={"/workers/:id"}>
                <WorkerDetailsPage />
            </Route>
            <Redirect to={"/workers"} />
        </Switch>
    );
}