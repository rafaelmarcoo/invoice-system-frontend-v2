import { useState, useEffect } from "react";
import axios from "axios";
import InvoiceForm from "./components/InvoiceForm";
import SentInvoices from "./components/SentInvoices";
import PaidInvoices from "./components/PaidInvoices";
import OverdueInvoices from "./components/OverdueInvoices";

const InvoicesPage = () => {
    const [active, setActive] = useState("sent");
    const toggleComponent = (text) => {
        setActive(text);
    };

    const [invoices, setInvoices] = useState([]);
    const retrieveInvoices = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/invoice");
            setInvoices(response.data);
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    useEffect(() => {
        retrieveInvoices();
    }, []);

    const markAsPaid = async (editId) => {
        try {
            const response = await axios.put(`http://localhost:5041/api/invoice/${editId}`);

            retrieveInvoices();

            if(response.status === 200) {
                alert("Invoice marked as paid!");
                retrieveInvoices();
            } else {
                alert("Failed to update invoice status!");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    const handleViewFile = async (fileName) => {
        try {
            const url = `http://localhost:5041/api/invoice/view/${fileName}`;
            window.open(url, '_blank');
        } catch(error) {
            alert("Error: " + error);
        }
    }

    const getClientInfo = async (companyCode) => {
        try {
            const response = await axios.get(`http://localhost:5041/api/client/${companyCode}`);
            return response.data;
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    const getCompanyInfo = async () => {
        try {
            const response = await axios.get(`http://localhost:5041/api/company/1`);
            return response.data;
        } catch(error) {
            alert("Error: " + error.message);
        }
    }
    
    const sendEmail = async (emailRequest, file) => {
        const formData = new FormData();
        formData.append("To", emailRequest.To);
        formData.append("Subject", emailRequest.Subject);
        formData.append("Body", emailRequest.Body);
        formData.append("File", file.get('pdf'));
        formData.append("FileName", file.get('pdf').name);

        try {
            const response = await axios.post(`http://localhost:5041/api/email/send-email`, formData);

            if(response.status === 200) {
                alert("Email sent with invoice!");
            } else {
                alert("Failed to send email with invoice!");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    return (
        <div>
            <InvoiceForm 
                retrieveInvoices={retrieveInvoices} 
                getClientInfo={getClientInfo} 
                getCompanyInfo={getCompanyInfo} 
                handleViewFile={handleViewFile}
                sendEmail={sendEmail}
            />
            <div className="mt-10 flex flex-shrink-0 justify-center space-x-10">
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("sent")}
                >
                    Sent Invoices
                </button>
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("paid")}
                >
                    Paid Invoices
                </button>
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("overdue")}
                >
                    Overdue Invoices
                </button>
            </div>
            {active === "sent" && <SentInvoices 
                                            invoices={invoices} 
                                            markAsPaid={markAsPaid} 
                                            handleViewFile={handleViewFile}
                                        />}
            {active === "paid" && <PaidInvoices 
                                            invoices={invoices} 
                                            handleViewFile={handleViewFile}
                                        />}
            {active === "overdue" && <OverdueInvoices 
                                            invoices={invoices} 
                                            markAsPaid={markAsPaid} 
                                            handleViewFile={handleViewFile}
                                        />}
        </div>
    )
}

export default InvoicesPage