import { useState, useEffect } from "react";
import axios from "axios";
import GSTExpenseForm from "./components/GSTExpenseForm";
import FullyPaidExpenses from "./components/FullyPaidExpenses";
import PartiallyPaidExpenses from "./components/PartiallyPaidExpenses";

const GSTPage = () => {
    const [active, setActive] = useState("full");
    const toggleComponent = (text) => {
        setActive(text);
    };

    const [expenses, setExpenses] = useState([]);
    const retrieveExpenses = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/expense");
            setExpenses(response.data);
        } catch(error) {
            alert("Error: " + error.message);
        };
    };

    useEffect(() => {
        retrieveExpenses();
    }, []);

    const addExpense = async (formData) => {
        const formDataToSend = new FormData();

        formDataToSend.append("File", formData.File);
        formDataToSend.append("Title", formData.Title);
        formDataToSend.append("Description", formData.Description);
        formDataToSend.append("Date", formData.Date);
        formDataToSend.append("Amount", formData.Amount);
        formDataToSend.append("Category", formData.Category);
        formDataToSend.append("GstRate", formData.GstRate);

        try {
            const response = await axios.post("http://localhost:5041/api/expense", formDataToSend);

            if(response.status === 200) {
                alert("Expense added!");
                retrieveExpenses();
            } else {
                alert("Failed to add expense");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    const handleViewFile = async (fileName) => {
        try {
            const url = `http://localhost:5041/api/expense/view/${fileName}`;
            window.open(url, '_blank');
        } catch(error) {
            alert("Error: " + error);
        }
    }

    return (
        <div>
            <GSTExpenseForm addExpense={addExpense} />
            <div className="mt-10 flex flex-shrink-0 justify-center space-x-10">
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("full")}
                >
                    Fully Paid Expenses
                </button>
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("partial")}
                >
                    Partially Paid Expenses
                </button>
            </div>
            {active === "full" && <FullyPaidExpenses
                                            expenses={expenses} 
                                            handleViewFile={handleViewFile}
                                        />}
            {active === "partial" && <PartiallyPaidExpenses expenses={expenses}/>}
        </div>
    )
}

export default GSTPage