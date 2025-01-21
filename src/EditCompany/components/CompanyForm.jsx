import axios from "axios";
import { useEffect, useState } from "react";

const CompanyForm = () => {
    const [formData, setFormData] = useState({
        Name: "",
        GstNumber: "",
        Address: "",
        City: "",
        Zip: "",
        Phone: "",
        Email: ""
    });

    const retrieveCompanyInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/company/1");
            setFormData({
                Name: response.data.name,
                GstNumber: response.data.gstNumber,
                Address: response.data.address,
                City: response.data.city,
                Zip: response.data.zip,
                Phone: response.data.phone,
                Email: response.data.email
            });
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    useEffect(() => {
        retrieveCompanyInfo();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put("http://localhost:5041/api/company", formData);

            if(response.status === 200) {
                alert("Company details updated!");
            } else {
                alert("Failed to update details!");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center ">Edit Your Company Details</h2>
                    <form
                        className="flex flex-col space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <label>Company Name</label>
                        <input 
                            type="text"
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange} 
                            placeholder="Company Name..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>GST Number</label>
                        <input 
                            type="text" 
                            name="GstNumber"
                            value={formData.GstNumber}
                            onChange={handleChange}
                            placeholder="Email..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company Address</label>
                        <input 
                            type="text" 
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            placeholder="Company Address..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company City</label>
                        <input 
                            type="text" 
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            placeholder="Company City" 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company ZIP</label>
                        <input 
                            type="text" 
                            name="Zip" 
                            value={formData.Zip}
                            onChange={handleChange}
                            placeholder="Company Zip" 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company Phone</label>
                        <input 
                            type="tel" 
                            name="Phone"
                            value={formData.Phone}
                            onChange={handleChange}
                            placeholder="Phone..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <label>Company Email</label>
                        <input 
                            type="email" 
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                            placeholder="Email..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />

                        <br/><br/>
                        <button 
                            type="submit"
                            className="p-3 mx-auto rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 text-gray-100 hover:scale-105 transition-transform"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanyForm