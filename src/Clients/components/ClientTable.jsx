const ClientTable = (props) => {
    const handleDelete = async (deleteId) => {
        await props.deleteClient(deleteId);
    }

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                    Client List
                </h2>
                {props.clients.length > 0 ? (
                    <div className="mt-10 overflow-x-auto">
                        <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                            <thead className="bg-blue-400 text-black">
                                <tr>
                                    <th className="p-2 border border-gray-200">Name</th>
                                    <th className="p-2 border border-gray-200">Code</th>
                                    <th className="p-2 border border-gray-200">GST Number</th>
                                    <th className="p-2 border border-gray-200">Email</th>
                                    <th className="p-2 border border-gray-200">Phone</th>
                                    <th className="p-2 border border-gray-200">Address</th>
                                    <th className="p-2 border border-gray-200">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.clients.map((client, index) => (
                                    <tr 
                                        key={index}
                                        className={`${
                                            index % 2 === 0
                                                ? "bg-gray-600 text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        <td className="p-2 border border-gray-200 text-center">{client.name}</td>
                                        <td className="p-2 border border-gray-200 text-center">{client.companyCode}</td>
                                        <td className="p-2 border border-gray-200 text-center">{client.gstNumber}</td>
                                        <td className="p-2 border border-gray-200 text-center">{client.email}</td>
                                        <td className="p-2 border border-gray-200 text-center">{client.phone}</td>
                                        <td className="p-2 border border-gray-200 text-center">{client.address}</td>
                                        <td className="p-2 border border-gray-200 text-center">
                                            <button 
                                                onClick={() => handleDelete(client.id)}
                                                className="border bg-red-300 text-neutral-800 rounded-lg p-1 hover:scale-105 hover:bg-red-600 duration-200 transition-all"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <h2 className="mt-10 text-center">No Clients</h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClientTable