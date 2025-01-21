const DataSheet = (props) => {
    const gstEligExp = props.expenses.filter(expense => expense.gstRate !== 0);
    var totalGSTPaid = 0;
    gstEligExp.map((expense) => {
        totalGSTPaid += (expense.amount * expense.gstRate); 
    });

    return (
        <div className="w-full mt-10 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                    Net Profit: ${props.finalAmts.TotalSales - props.finalAmts.TotalExpenses}
                </h2>
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                    Net GST Owed: ${parseFloat(props.finalAmts.TotalGst - totalGSTPaid).toFixed(2)}
                </h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center space-x-8 space-y-8 mt-10">
                <div className="">
                    <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                        <thead className="bg-blue-400 text-black">
                            <tr>
                                <th className="p-2 border border-gray-200" colSpan="2">Income Statement</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-green-500">
                                <td>Net Sales excl. GST</td>
                                <td>${parseFloat(props.finalAmts.TotalSales).toFixed(2)}</td>
                            </tr>
                            <tr className="bg-red-500">
                                <td colSpan="2">Minus: Expenses</td>
                            </tr>
                            {props.expenses.map((expense, index) => (
                                <tr className="bg-slate-500" key={index}>
                                    <td>{expense.title}</td>
                                    <td>${parseFloat(expense.amount).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="bg-green-700">
                                <td>Net Profit</td>
                                <td>${props.finalAmts.TotalSales - props.finalAmts.TotalExpenses}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                        <thead className="bg-blue-400 text-black">
                            <tr>
                                <th colSpan="2">GST Calculation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>GST Collected From Sales</td>
                                <td>${parseFloat(props.finalAmts.TotalGst).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">Minus: GST Paid (Eligible GST Expenses)</td>
                            </tr>
                            {gstEligExp.map((expense) => (
                                <tr key={expense.id}>
                                    <td>{expense.title}, {expense.gstRate} GST</td>
                                    <td>${parseFloat(expense.amount * expense.gstRate).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr>
                                <td>Net GST Owed</td>
                                <td>${parseFloat(props.finalAmts.TotalGst - totalGSTPaid).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DataSheet