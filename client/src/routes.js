import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { WorkerRecordsPage } from "./pages/worker-records.page";
import { WorkerDetailsPage } from "./pages/worker-details.page";
import {CreateWorkerPage} from "./pages/create-worker.page";
import LoginPage from "./pages/login.page";
import {WorkerProvider} from "./contexts/workers.context";
import {DepartmentProvider} from "./contexts/departments.context";
import {JobProvider} from "./contexts/jobs.context";

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
        <WorkerProvider>
            <DepartmentProvider>
                <JobProvider>
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
                </JobProvider>
            </DepartmentProvider>
        </WorkerProvider>
    );
}