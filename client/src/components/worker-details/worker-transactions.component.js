import {useWorker} from "../../contexts/current-worker/current-worker.context";

const WorkerTransactionsComponent = () => {
    const [worker] = useWorker();


    if (!worker || !worker.transactions || worker.transactions.length === 0)
        return (
            <div className={"mb-5"}>
                <h2><i className="bi bi-card-text"/> Выплаты</h2>
                <p>Представляет собой записи о всех совершенных выплатах сотруднику</p>
                <div className={"alert alert-info"}>
                    <h3><i className="bi bi-info-circle"/> Не найдено</h3>
                    <p className={"mb-0"}>Информация о выплатах по данному сотруднику не найдена.
                    Данная информация формируется путем совершения выплат в секции "Информация об отработанных часах"</p>
                </div>
            </div>
        );

    return (
        <div className={"mb-5"}>
            <h2><i className="bi bi-card-text"/> Выплаты</h2>
            <p>Представляет собой записи о всех совершенных выплатах сотруднику</p>
            <table className={"table"}>
                <thead>
                    <th>Временной штамп</th>
                    <th>Размер выплаты</th>
                </thead>
                <tbody>
                    {worker.transactions.reverse().map(transaction => (
                        <tr>
                            <td>{transaction.timestamp}</td>
                            <td>{transaction.payout} ₽</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default WorkerTransactionsComponent;