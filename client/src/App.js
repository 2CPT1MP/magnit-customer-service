import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import WorkersContainer from "./components/workers.component";
import {WorkerProvider} from "./contexts/workers.context";
import SearchComponent from './components/search.component'

function App() {

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
