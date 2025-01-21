const PaidInvoices = (props) => {
  const groupedInv = props.invoices
        .filter(invoice => invoice.status === "Paid")
        .reduce((acc, invoice) => {
            if(!acc[invoice.name]) {
                acc[invoice.name] = {invoices: [], totAmt: 0, GST: 0};
            }
            acc[invoice.name].invoices.push(invoice);
            acc[invoice.name].totAmt += invoice.amount;
            acc[invoice.name].GST += invoice.gst;
            return acc;
        }, {});

  return (
    <div className="w-full mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
          Paid Invoices
        </h2>
        {Object.keys(groupedInv).length > 0 ? (
          Object.keys(groupedInv).map((companyCode, index) => (
            <div className="mt-10 overflow-x-auto">
              <table key={index} className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                <thead className="bg-blue-400 text-black">
                  <tr>
                    <th className="p-2 border border-gray-200">Client Code</th>
                    <th className="p-2 border border-gray-200">Invoice Number</th>
                    <th className="p-2 border border-gray-200">Date Sent</th>
                    <th className="p-2 border border-gray-200">Date Due</th>
                    <th className="p-2 border border-gray-200">Payment Date</th>
                    <th className="p-2 border border-gray-200">Total Amount</th>
                    <th className="p-2 border border-gray-200">GST</th>
                    <th className="p-2 border border-gray-200">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedInv[companyCode].invoices.map((invoice, index) => (
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
                      <td className="p-2 border border-gray-200 text-center">{invoice.datePaid}</td>
                      <td className="p-2 border border-gray-200 text-center">${parseFloat(invoice.amount).toFixed(2)}</td>
                      <td className="p-2 border border-gray-200 text-center">${parseFloat(invoice.gst).toFixed(2)}</td>
                      <td className="p-2 border border-gray-200 text-center flex flex-col space-y-2">
                      <button 
                        onClick={() => props.handleViewFile(invoice.filePath)}
                        className="border rounded-lg p-1 hover:scale-105 hover:bg-green-300 duration-200 transition-all"
                      >
                        View Invoice</button>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-400 text-black font-bold"> 
                    <td className="text-center" colSpan="5">Total</td> 
                    <td className="p-2 border border-gray-200 text-center">${parseFloat(groupedInv[companyCode].totAmt).toFixed(2)}</td> 
                    <td className="p-2 border border-gray-200 text-center">${parseFloat(groupedInv[companyCode].GST).toFixed(2)}</td> 
                  </tr>
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <div>
              <h2 className="mt-10">No Paid Invoices</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default PaidInvoices