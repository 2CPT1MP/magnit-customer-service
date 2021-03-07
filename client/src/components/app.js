import { WorkerProvider } from "../contexts/workers.context";
import { DepartmentProvider } from "../contexts/departments.context";
import { JobProvider } from "../contexts/jobs.context";
import { workerRoutes } from '../routes';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const routes = workerRoutes();

  return (
    <WorkerProvider>
        <DepartmentProvider>
            <JobProvider>
                <Router>
                    <div className={"container"}>
                        {routes}
                    </div>
                </Router>
            </JobProvider>
        </DepartmentProvider>
    </WorkerProvider>
  );
}

export default App;
