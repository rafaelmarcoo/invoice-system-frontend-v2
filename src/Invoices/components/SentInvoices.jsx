const SentInvoices = (props) => {
  const sentInv = props.invoices.filter(invoice => invoice.status === "Sent");

    const calculateTotAmt = () => {
        var totAmt = 0;
        sentInv.map((invoice) => {
            invoice.amount !== 0 ? totAmt += invoice.amount : totAmt += 0;
        });
        return parseFloat(totAmt).toFixed(2);
    };

    const calculateTotGST = () => {
        var GST = 0;
        sentInv.map((invoice) => {
            invoice.gst !== 0 ? GST += invoice.gst : GST += 0;
        });
        return parseFloat(GST).toFixed(2);
    };

  return (
    <div className="w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
            Sent Invoices
        </h2>
        {sentInv.length > 0 ? (
          <div className="mt-10 overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
              <thead className="bg-blue-400 text-black">
                <tr>
                  <th className="p-2 border border-gray-200">Client Code</th>
                  <th className="p-2 border border-gray-200">Invoice Number</th>
                  <th className="p-2 border border-gray-200">Date Sent</th>
                  <th className="p-2 border border-gray-200">Date Due</th>
                  <th className="p-2 border border-gray-200">Total Amount</th>
                  <th className="p-2 border border-gray-200">GST</th>
                  <th className="p-2 border border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sentInv.map((invoice, index) => (
                  <tr
                    key={index}
                    className={`${
                        index % 2 === 0
                            ? "bg-gray-600 text-white"
                            : "bg-gray-300 text-black"
                    }`}
                  >
                    <td className="p-2 border border-gray-200 text-center">{invoice.name}</td>
                    <td className="p-2 border border-gray-200 text-center">{invoice.id}</td>
                    <td className="p-2 border border-gray-200 text-center">{invoice.dateSent}</td>
                    <td className="p-2 border border-gray-200 text-center">{invoice.dateDue}</td>
                    <td className="p-2 border border-gray-200 text-center">${parseFloat(invoice.amount).toFixed(2)}</td>
                    <td className="p-2 border border-gray-200 text-center">${parseFloat(invoice.gst).toFixed(2)}</td>
                    <td className="p-2 border border-gray-200 text-center flex flex-col space-y-2">
                        <button 
                          onClick={() => props.markAsPaid(invoice.id)}
                          className="border text-neutral-800 bg-violet-300 rounded-lg p-1 hover:scale-105 hover:bg-violet-600 duration-200 transition-all"
                        >
                            Mark as Paid
                        </button>
                        <button 
                          onClick={() => props.handleViewFile(invoice.filePath)}
                          className="border text-neutral-800 bg-green-300 rounded-lg p-1 hover:scale-105 hover:bg-green-600 duration-200 transition-all"
                        >
                            View Invoice
                        </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-blue-400 text-black font-bold">
                  <td className="text-center" colSpan="4">Total</td>
                  <td className="p-2 border border-gray-200 text-center">${calculateTotAmt()}</td>
                  <td className="p-2 border border-gray-200 text-center">${calculateTotGST()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div>
              <h2 className="mt-10 text-center">No Sent Invoices</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default SentInvoices