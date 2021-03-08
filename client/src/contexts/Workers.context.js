import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const WorkerContext = createContext();
const FilteredWorkersContext = createContext();
export const WorkerFilterContext = createContext();

export const useWorkers= () => {
    return useContext(WorkerContext);
}

export const useFilteredWorkers= () => {
    return useContext(FilteredWorkersContext);
}

export const useWorkersFilter = () => {
    return useContext(WorkerFilterContext);
}

export const WorkerProvider = ( {children} ) => {
    const {loading, request, error} = useHttp();
    const [workers, setWorkers] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);

    useEffect(() => {
        const fetchWorkers = async() => {
            try {
                const data = await request('/api/workers');
                setWorkers(data);
                setFilteredWorkers(data);
            } catch (e) {
                throw Error("Can't fetch workers!");
            }
        }
        fetchWorkers();
    }, []);

    const filterWorkers = (filter) => {
       const filtered = workers.filter((worker) => {
           let fieldsMatched = 0;
           for (let field in filter) {
               if (field === 'name') {
                   const fullName = `${worker.lastName} ${worker.firstName} ${worker.middleName}`.toLowerCase();
                   if (fullName.indexOf(filter['name'].toLowerCase()) !== -1)
                       fieldsMatched++;
               } else if (field === 'department' || field === 'job'){
                   if (worker.hasOwnProperty(field) && worker[field]['name'] === filter[field])
                       fieldsMatched++;
               }
           }
           return Object.keys(filter).length === fieldsMatched;
       });
       setFilteredWorkers(filtered);
    }

    return (
        <WorkerContext.Provider value={workers}>
            <WorkerFilterContext.Provider value={filterWorkers}>
                <FilteredWorkersContext.Provider value={[filteredWorkers, loading, error]}>
                    {children}
                </FilteredWorkersContext.Provider>
            </WorkerFilterContext.Provider>
        </WorkerContext.Provider>
    );
}