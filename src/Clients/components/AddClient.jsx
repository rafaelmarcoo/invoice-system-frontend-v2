import { useState } from "react"

const AddClient = (props) => {
    const [formData, setFormData] = useState({
        CompanyCode: "",
        GstNumber: "",
        Name: "",
        Address: "",
        City: "",
        Zip: "",
        Phone: "",
        Email: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await props.addClient(formData);
        setFormData({
            CompanyCode: "",
            GstNumber: "",
            Name: "",
            Address: "",
            City: "",
            Zip: "",
            Phone: "",
            Email: "",
        });
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5 mt-10">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                        Add a Client
                    </h2>
                    <form 
                        className="flex flex-col space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <label>Name</label>
                        <input 
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="Company Name..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Address</label>
                        <input 
                            type="text" 
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            placeholder="Company Address..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>City</label>
                        <input 
                            type="text" 
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            placeholder="Company City..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>ZIP</label>
                        <input 
                            type="text" 
                            name="Zip"
                            value={formData.Zip}
                            onChange={handleChange} 
                            placeholder="Company Zip" 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Phone</label>
                        <input 
                            type="tel" 
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            placeholder="Phone..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Email</label>
                        <input 
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange} 
                            placeholder="Email..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company Code</label>
                        <input 
                            type="text" 
                            name="CompanyCode"
                            value={formData.CompanyCode}
                            onChange={handleChange}
                            placeholder="Company Code..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>GST Number</label>
                        <input 
                            type="text" 
                            name="GstNumber"
                            value={formData.GstNumber}
                            onChange={handleChange}
                            placeholder="GST Number..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />
                        <button  
                            type="submit"
                            className="p-3 mx-auto rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 text-gray-100 hover:scale-105 transition-transform"
                        >
                            Add Client
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddClient