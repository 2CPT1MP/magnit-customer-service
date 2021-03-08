import { createContext, useContext, useState, useEffect } from 'react';
import {useWorker} from "./current-worker.context";
import {useHttp} from "../../hooks/http.hook";

const SelectScheduleDayContext = createContext({});
const CurrentScheduleContext = createContext({});
const ScheduleContext = createContext({});
const EditDayHoursContext = createContext({});
const LockedContext = new createContext();

export const useSelectScheduleDay = () => {
    return useContext(SelectScheduleDayContext);
}

export const useEditDayHours = () => {
    return useContext(EditDayHoursContext);
}

export const useCurrentScheduleDay = () => {
    return useContext(CurrentScheduleContext);
}

export const useSchedule = () => {
    return useContext(ScheduleContext);
}

export const useLocked = () => {
    return useContext(LockedContext);
}


export const ScheduleProvider = ( {children} ) => {
    const [worker, setWorker] = useWorker();
    const [schedule, setSchedule] = useState([]);
    const [currentScheduleDay, setCurrentScheduleDay] = useState({});
    const [locked, setLocked] = useState(false);
    const {request} = useHttp();

    const selectScheduleDay = (day) => {
        const targetSchedule = schedule.days.find((rec) => rec.day === day);
        setCurrentScheduleDay(targetSchedule);
    }

    const editCurrentDayHrs = async(hours) => {
        await request(`/api/workers/${worker._id}/schedule/${currentScheduleDay.day}`, 'PUT', {hours});
        setCurrentScheduleDay({...currentScheduleDay, hours});
        const newSch = schedule.days.map((day) => {
            if ( day.day === currentScheduleDay.day)
                return {...day, hours: hours};
            return day;
        });
        setSchedule({...schedule, days: newSch});
    }

    useEffect(() => setSchedule(worker.schedule), []);

    return (
        <ScheduleContext.Provider value={[schedule, setSchedule]}>
            <CurrentScheduleContext.Provider value={currentScheduleDay}>
                <SelectScheduleDayContext.Provider value={selectScheduleDay}>
                    <EditDayHoursContext.Provider value={editCurrentDayHrs}>
                        <LockedContext.Provider value={[locked, setLocked]}>
                            {children}
                        </LockedContext.Provider>
                    </EditDayHoursContext.Provider>
                </SelectScheduleDayContext.Provider>
            </CurrentScheduleContext.Provider>
        </ScheduleContext.Provider>
    );
}