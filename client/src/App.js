import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './app.css'

import WorkersContainer from "./components/workers.component";
import { WorkerProvider } from "./contexts/workers.context";
import SearchComponent from './components/search.component'
import { DepartmentProvider } from "./contexts/departments.context";
import { JobProvider } from "./contexts/jobs.context";

const App = () => {
  return (
    <WorkerProvider>
        <DepartmentProvider>
            <JobProvider>
                <div className={"container"}>
                    <SearchComponent />
                    <WorkersContainer />
                </div>
            </JobProvider>
        </DepartmentProvider>
    </WorkerProvider>
  );
}

export default App;
