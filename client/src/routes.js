import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { WorkerRecordsPage } from "./pages/records.page";
import { WorkerDetailsPage } from "./pages/details.page";

export const workerRoutes = () => {

    return (
        <Switch>
            <Route path={"/workers"} exact>
                <WorkerRecordsPage />
            </Route>
            <Route path={"/workers/:id"}>
                <WorkerDetailsPage />
            </Route>
            <Redirect to={"/workers"} />
        </Switch>
    );
}