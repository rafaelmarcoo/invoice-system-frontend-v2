import { useRef, useState } from "react"

const GSTExpenseForm = () => {
    const [formData, setFormData] = useState({
        Title: "",
        Description: "",
        Date: "",
        Amount: "",
        File: null,
        Category: "fullypaid",
        GstRate: "",
    });

    const fileInputRef = useRef(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFileChange = (event) => {
        setFormData({
            ...formData,
            File: event.target.files[0],
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setFormData({
            ...formData,
            Amount: parseFloat(parseFloat(formData.Amount).toFixed(2)),
        });

        await props.addExpense(formData);
        setFormData({
            Title: "",
            Description: "",
            Date: "",
            Amount: "",
            File: null,
            Category: "fullypaid",
            GstRate: "",
        });

        if(fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                        Add a New GST Expense
                    </h2>
                    <form
                        className="flex flex-col space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <label>Expense Title (Required)</label>
                        <input 
                            type="text" 
                            name="Title"
                            value={formData.Title}
                            onChange={handleChange}
                            placeholder="Title..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>Brief Description (Optional)</label>
                        <input 
                            type="text"
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange} 
                            placeholder="Provide a brief description of the expense..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                        />
                        <div>
                            <label>Category (Required)</label>
                            <select
                                name="Category"
                                onChange={handleChange}
                                value={formData.Category}
                                className="border rounded-lg text-blue-400 ml-3 p-1"
                            >
                                <option value="fullypaid">Fully Paid Expense</option>
                                <option value="partiallypaid">Partially Paid Expense</option>
                            </select>
                        </div>
                        <label>Supporting Documents (Optional)</label>
                        <input 
                            type="file" 
                            name="File"
                            onChange={handleFileChange}
                            ref={fileInputRef}
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                        />
                        <label>Date of Expense (Required)</label>
                        <input 
                            type="date"
                            name="Date"
                            value={formData.Date}
                            onChange={handleChange} 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>Cost of Expense (Required)</label>
                        <input 
                            type="number" 
                            name="Amount"
                            value={formData.Amount}
                            onChange={handleChange}
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>GST Rate (0.15 for 15%, 0 for no GST) (Required)</label>
                        <input 
                            type="number"
                            name="GstRate"
                            value={formData.GstRate}
                            onChange={handleChange}
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />
                        <button 
                            type="submit"
                            className="p-3 mx-auto rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 text-gray-100 hover:scale-105 transition-transform"
                        >
                            Submit Expense
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default GSTExpenseForm