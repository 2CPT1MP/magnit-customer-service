import { workerRoutes } from '../routes';
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const routes = workerRoutes();

  return (
        <BrowserRouter>
            <div className={"container"}>
                {routes}
            </div>
        </BrowserRouter>
  );
}

export default App;
