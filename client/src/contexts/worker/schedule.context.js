import { createContext, useContext, useState, useEffect } from 'react';
import {useWorker} from "./worker.context";

const SelectScheduleDayContext = createContext({});
const CurrentScheduleContext = createContext({});
const ScheduleContext = createContext({});

export const useSelectScheduleDay = () => {
    return useContext(SelectScheduleDayContext);
}

export const useCurrentScheduleDay = () => {
    return useContext(CurrentScheduleContext);
}

export const useSchedule = () => {
    return useContext(ScheduleContext);
}

export const ScheduleProvider = ( {children} ) => {
    const [worker, setWorker] = useWorker();
    const [schedule, setSchedule] = useState([]);
    const [currentScheduleDay, setCurrentScheduleDay] = useState({});

    const selectScheduleDay = (day) => {
        const targetSchedule = schedule.days.filter((rec) => rec.day === day);
        setCurrentScheduleDay(targetSchedule[0]);
    }
    useEffect(() => setSchedule(worker.schedule), []);


    return (
        <ScheduleContext.Provider value={[schedule, setSchedule]}>
            <CurrentScheduleContext.Provider value={currentScheduleDay}>
                <SelectScheduleDayContext.Provider value={selectScheduleDay}>
                    {children}
                </SelectScheduleDayContext.Provider>
            </CurrentScheduleContext.Provider>
        </ScheduleContext.Provider>
    );
}