import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { WorkerRecordsPage } from "./pages/worker-records.page";
import { WorkerDetailsPage } from "./pages/worker-details.page";
import {CreateWorkerPage} from "./pages/create-worker.page";
import LoginPage from "./pages/login.page";

export const workerRoutes = (isAuthenticated) => {

    if (!isAuthenticated)
        return (
            <Switch>
                <Route path={"/login"} exact>
                    <LoginPage />
                </Route>
                <Redirect to={"/login"} />
            </Switch>
        );

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