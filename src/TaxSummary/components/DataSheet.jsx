const DataSheet = (props) => {
    const gstEligExp = props.expenses.filter(expense => expense.gstRate !== 0);
    var totalGSTPaid = 0;
    gstEligExp.map((expense) => {
        totalGSTPaid += (expense.amount * expense.gstRate); 
    });

    return (
        <div className="w-full mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-500 font-bold text-center">
                    Net Profit: 
                    <span className="bg-gradient-to-r from-green-300 to-green-600 bg-clip-text text-transparent"> ${props.finalAmts.TotalSales - props.finalAmts.TotalExpenses}</span>
                </h2>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-gray-500 font-bold text-center">
                    Net GST Owed: 
                    <span className="bg-gradient-to-r from-red-300 to-red-600 bg-clip-text text-transparent"> ${parseFloat(props.finalAmts.TotalGst - totalGSTPaid).toFixed(2)}</span>
                </h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center lg:space-x-12 space-y-4 lg:space-y-0 mt-12">
                <div className="lg:w-1/2 p-5">
                    <table className="table-auto border-collapse border border-gray-300 mx-auto w-full shadow-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <tr>
                                <th className="p-2 text-lg font-semibold text-center" colSpan="2">Income Statement</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            <tr className="bg-green-300">
                                <td className="p-2 font-medium">Net Sales excl. GST</td>
                                <td className="p-2 text-right">${parseFloat(props.finalAmts.TotalSales).toFixed(2)}</td>
                            </tr>
                            <tr className="bg-red-200">
                                <td className="p-2 font-medium" colSpan="2">Minus: Expenses</td>
                            </tr>
                            {props.expenses.map((expense, index) => (
                                <tr className="bg-gray-50 hover:bg-gray-100" key={index}>
                                    <td className="p-2">{expense.title}</td>
                                    <td className="p-2 text-right">${parseFloat(expense.amount).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="bg-green-400 font-bold">
                                <td className="p-2">Net Profit</td>
                                <td className="p-2 text-right">${props.finalAmts.TotalSales - props.finalAmts.TotalExpenses}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="lg:w-1/2 p-5">
                    <table className="table-auto border-collapse border border-gray-300 mx-auto w-full shadow-lg overflow-hidden">
                        <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <tr>
                                <th className="p-2 text-lg font-semibold text-center" colSpan="2">GST Calculation</th>
                            </tr>
                        </thead>
                        <tbody className="text-black">
                            <tr className="bg-yellow-200">
                                <td className="p-2 font-medium">GST Collected From Sales</td>
                                <td className="p-2 text-right">${parseFloat(props.finalAmts.TotalGst).toFixed(2)}</td>
                            </tr>
                            <tr className="bg-red-200">
                                <td className="p-2 font-medium" colSpan="2">Minus: GST Paid (Eligible GST Expenses)</td>
                            </tr>
                            {gstEligExp.map((expense) => (
                                <tr className="bg-gray-50 hover:bg-gray-100" key={expense.id}>
                                    <td className="p-2">{expense.title}, {expense.gstRate} GST</td>
                                    <td className="p-2 text-right">${parseFloat(expense.amount * expense.gstRate).toFixed(2)}</td>
                                </tr>
                            ))}
                            <tr className="bg-yellow-400 font-bold">
                                <td className="p-2">Net GST Owed</td>
                                <td className="p-2 text-right">${parseFloat(props.finalAmts.TotalGst - totalGSTPaid).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
}

export default DataSheet