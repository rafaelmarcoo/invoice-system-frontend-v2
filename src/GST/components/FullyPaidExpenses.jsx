const FullyPaidExpenses = (props) => {
    const fullExpenses = props.expenses.filter(expense => expense.category === "fullypaid");

    return (
        <div className="w-full mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                    Fully Paid Expenses
                </h2>
                {fullExpenses.length > 0 ? (
                    <div className="mt-10 overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                            <thead className="bg-blue-400 text-black">
                                <tr>
                                    <th className="p-2 border border-gray-200">Title</th>
                                    <th className="p-2 border border-gray-200">Description</th>
                                    <th className="p-2 border border-gray-200">Date</th>
                                    <th className="p-2 border border-gray-200">Cost</th>
                                    <th className="p-2 border border-gray-200">GST Rate</th>
                                    <th className="p-2 border border-gray-200">Files</th>
                                    <th className="p-2 border border-gray-200">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fullExpenses.map((expense, index) => (
                                    <tr
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-gray-600 text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        <td className="p-2 border border-gray-200 text-center">{expense.title}</td>
                                        <td className="p-2 border border-gray-200 text-center">{expense.description}</td>
                                        <td className="p-2 border border-gray-200 text-center">{expense.date}</td>
                                        <td className="p-2 border border-gray-200 text-center">${parseFloat(expense.amount).toFixed(2)}</td>
                                        <td className="p-2 border border-gray-200 text-center">{expense.gstRate}</td>
                                        <td className="p-2 border border-gray-200 text-center">{expense.filePath}</td>
                                        <td className="p-2 border border-gray-200 text-center">
                                            {expense.filePath === "NO FILES UPLOADED" ? <p>N/A</p> : (
                                                <button 
                                                    onClick={() => props.handleViewFile(expense.filePath)}
                                                    className="border text-neutral-800 bg-green-300 rounded-lg p-1 hover:scale-105 hover:bg-green-600 duration-200 transition-all"
                                                >
                                                    View
                                                </button>
                                            )}
                                        </td>      
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2 className="mt-10 text-center">No Fully Paid Expenses</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FullyPaidExpenses