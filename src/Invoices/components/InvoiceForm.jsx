import { useState, useEffect } from "react"
import axios from "axios"
import { GeneratePDF } from "./GeneratePDF";
import { pdf } from '@react-pdf/renderer';

const InvoiceForm = (props) => {
    const [clients, setClients] = useState([]);
    const retrieveClients = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/client");
            setClients(response.data);
        } catch(error) {
            alert("Error: " + error.message);
        }
    };

    useEffect(() => {
        retrieveClients();
    }, []);

    const [formData, setFormData] = useState({
        Name: "",
        Frequency: "",
        DateDue: "",
        Items: [],
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addItem = () => {
        const lastItem = formData.Items[formData.Items.length - 1];
        if(lastItem && (!lastItem.Description || !lastItem.Quantity || !lastItem.Price)) {
            alert("Please fill out previous item fields before adding a new one!");
            return;
        };

        const newItem = {
            Description: "",
            Quantity: 0,
            Price: 0,
        };

        setFormData({
            ...formData,
            Items: [...formData.Items, newItem],
        });
    };

    const removeItem = (removeDscp) => {
        setFormData({
            ...formData,
            Items: formData.Items.filter((item) => item.Description !== removeDscp)
        });
    };

    const handleItemChange = (description, field, value) => {
        setFormData({
            ...formData,
            Items: formData.Items.map((item) => 
                item.Description === description ? {...item, [field]: value } : item
            ),
        });
    };

    const calculateTotAmt = () => {
        const totAmt = formData.Items.reduce((total, item) => {
            return total + (parseFloat(item.Quantity) * parseFloat(item.Price) || 0);
        }, 0);
        return parseFloat(totAmt.toFixed(2));
    }

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const prepareData = () => {
        const currentDate = getCurrentDate();
        const amt = calculateTotAmt();
        const totAmt = amt * 1.15;
        const gst = totAmt - amt;

        parseFloat(parseFloat(amt).toFixed(2));
        parseFloat(parseFloat(gst).toFixed(2));

        const updatedItems = formData.Items.map((item) => ({
            ...item,
            Price: parseFloat(parseFloat(item.Price).toFixed(2)),
            Quantity: parseFloat(parseFloat(item.Quantity).toFixed(2)),
        }));

        const updatedFormData = {
            ...formData,
            Items: updatedItems,
            DateSent: currentDate,
            DatePaid: "---",
            Amount: totAmt,
            Gst: gst,
            Status: "Sent",
            FilePath: "---"
        };

        return updatedFormData;
    };

    const preparePdf = async (invoiceDetails) => {
        const clientInfo = await props.getClientInfo(formData.Name);
        const companyInfo = await props.getCompanyInfo();
        const invoiceInfo = invoiceDetails;
        
        
        const emailRequest = {
            To: "testemail437427@gmail.com",
            Subject: `Invoice ${invoiceInfo.name}-${invoiceInfo.id}`,
            Body: "<h4>Attached file is your invoice. Kindly process the payment by the due date.</h4><br><h4>Kind Regards,</h4><h4>HexWeb Ltd.</h4>",
        }

        const blob = await pdf(
            <GeneratePDF 
                company={companyInfo}
                client={clientInfo}
                invoice={invoiceInfo}
            />
        ).toBlob();

        const pdfData = new FormData();
        pdfData.append('pdf', blob, `${invoiceInfo.name}-${invoiceInfo.id}.pdf`);

        try {
            const response = await axios.post(`http://localhost:5041/api/invoice/save-pdf/${invoiceInfo.id}`, pdfData);

            if(response.status === 200) {
                alert("Invoice generated and saved into directory!");

                await props.sendEmail(emailRequest, pdfData);
            } else {
                alert("Failed to generate invoice into directory!");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const finalData = prepareData();

        try {
            const response = await axios.post("http://localhost:5041/api/invoice", finalData);

            if(response.status === 200) {
                alert("Invoice made!");

                await preparePdf(response.data);

                setFormData({
                    Name: "",
                    Frequency: "",
                    DateDue: "",
                    Items: [],
                });

                await props.retrieveInvoices();
            } else {
                alert("Failed to make invoice!");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center ">
                        Make a New Invoice
                    </h2>
                    <form
                        className="flex flex-col space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="mx-auto">
                            <label>Client</label>
                            <select 
                                name="Name" 
                                onChange={handleChange}
                                value={formData.Name}
                                className="border rounded-lg text-blue-400 ml-3 p-1"
                            >
                                <option>Select a client</option>
                                {clients.length > 0 ? (
                                    clients.map((client, index) => (
                                        <option key={index} value={client.companyCode}>
                                            {client.name}
                                        </option>
                                    )
                                )) : (<option>NO CLIENTS</option>)}
                            </select>
                        </div>
                        <div className="mx-auto">
                            <label>Frequency</label>
                            <select
                                name="Frequency"
                                onChange={handleChange}
                                value={formData.Frequency}
                                className="border rounded-lg text-blue-400 ml-3 p-1"
                            >    
                                <option>Select time</option>
                                <option value="one-time">One-Time</option>
                                <option value="weekly">Weekly</option>
                                <option value="fortnightly">Fortnightly</option>
                                <option value="monthly">Monthly</option>
                            </select> 
                        </div>
                        <div className="mx-auto">
                            <label>Due Date</label>
                            <input 
                                type="date"
                                name="DateDue"
                                onChange={handleChange}
                                value={formData.DateDue}
                                className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all ml-3"
                                required
                            />
                        </div>
                        <label className="text-center text-2xl border-t pt-3">Items</label>
                        {formData.Items.map((item, index) => (
                            <div className="w-full">
                                <div className="max-w-2xl mx-auto">
                                    <div key={index} className="border p-2 rounded-lg flex flex-col space-y-3">
                                    <label>Description</label>
                                    <input
                                        name="Description" 
                                        type="text"
                                        value={item.Description}
                                        onChange={(e) => handleItemChange(item.Description, "Description", e.target.value)}
                                        className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                                        required
                                    />

                                    <label>Quantity</label>
                                    <input
                                        name="Quantity" 
                                        type="number"
                                        value={item.Quantity}
                                        onChange={(e) => handleItemChange(item.Description, "Quantity", e.target.value)}
                                        className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                                        required
                                    />

                                    <label>Price</label>
                                    <input 
                                        name="Price"
                                        type="number"
                                        value={item.Price}
                                        onChange={(e) => handleItemChange(item.Description, "Price", e.target.value)}
                                        className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                                        required
                                    />

                                    <button 
                                        onClick={() => removeItem(item.Description)}
                                        className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all mt-2"
                                    >
                                        Remove Item
                                    </button>
                                </div>
                                </div>
                            </div>
                            
                        ))}
                        <div className="flex flex-shrink-0 justify-center space-x-10">
                            <button 
                                onClick={addItem}
                                className="border rounded-lg p-1 hover:scale-105 hover:bg-violet-300 duration-200 transition-all"
                            >
                                Add Item
                            </button>
                            <button
                                className="border rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                            >
                                Add Invoice
                            </button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default InvoiceForm