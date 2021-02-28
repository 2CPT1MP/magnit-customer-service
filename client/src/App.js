import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import WorkersContainer from "./components/WorkersContainer.component";
import {WorkerProvider} from "./contexts/Workers.context";

function App() {

  return (
    <WorkerProvider>
        <div className={"container"}>
            <WorkersContainer />
        </div>
    </WorkerProvider>
  );
}

export default App;
