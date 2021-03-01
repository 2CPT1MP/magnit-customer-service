import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './app.css'

import WorkersContainer from "./components/workers.component";
import { WorkerProvider } from "./contexts/workers.context";
import SearchComponent from './components/search.component'

const App = () => {
  return (
    <WorkerProvider>
        <div className={"container"}>
            <SearchComponent />
            <WorkersContainer />
        </div>
    </WorkerProvider>
  );
}

export default App;
