import { createContext, useContext, useState, useEffect } from 'react';
import { useHttp } from "../hooks/http.hook";

const WorkerContext = createContext([]);
const FilteredWorkersContext = createContext([]);
export const WorkerFilterContext = createContext(null);


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
    const {loading, request} = useHttp();
    const [workers, setWorkers] = useState([]);
    const [filteredWorkers, setFilteredWorkers] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await request('/api/workers');
                setWorkers(data);
                setFilteredWorkers(data);
            } catch (e) {
                throw Error("Can't fetch workers!");
            }
        }
        fetchData();
    }, []);

    const filterWorkers = (filter) => {
        setFilteredWorkers(workers.filter((worker) => {
            let eq = 0;
            for (let field in filter) {
                if (filter.hasOwnProperty(field) && worker.hasOwnProperty(field)) {
                    if (field === 'name') {
                        const fullName = `${worker.name.last} ${worker.name.first} ${worker.name.middle}`;
                        if (fullName.indexOf(filter[field]) !== -1)
                            eq++;
                    } else {
                        const workerField = `${worker[field]['name']}`;
                        const filterField = `${filter[field]}`;
                        console.log(workerField === filterField);
                        if (workerField === filterField)
                            eq++;
                    }
                }
            }
            return eq === Object.keys(filter).length;
        }));
    }

    return (
        <WorkerContext.Provider value={workers}>
            <WorkerFilterContext.Provider value={filterWorkers}>
                <FilteredWorkersContext.Provider value={filteredWorkers}>
                    <div hidden={!loading}>
                        {}
                    </div>
                    <div hidden={loading}>
                        {children}
                    </div>
                </FilteredWorkersContext.Provider>
            </WorkerFilterContext.Provider>
        </WorkerContext.Provider>
    );
}