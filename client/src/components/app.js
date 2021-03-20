import { WorkerProvider } from "../contexts/workers.context";
import { DepartmentProvider } from "../contexts/departments.context";
import { JobProvider } from "../contexts/jobs.context";
import { workerRoutes } from '../routes';
import { BrowserRouter as Router } from "react-router-dom";
import {useAuth} from "../hooks/auth.hook";
import AuthContext from "../contexts/auth.context";
import {useState} from "react";

const App = () => {
  const {login, logout, userId, token, loading} = useAuth();
  const isAuthenticated = !!token;
  const routes = workerRoutes(isAuthenticated);

  if (loading)
      return <>Загрузка</>

  return (
    <AuthContext.Provider value={{
        token, login, logout, userId, isAuthenticated
    }}>
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
    </AuthContext.Provider>
  );
}

export default App;
