import { useState } from "react"

const EditClient = (props) => {
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

    const [selectedClient, setSelectedClient] = useState(0);
    const handleClientChange = (event) => {
        const selectedId = event.target.value
        setSelectedClient(selectedId);

        if(selectedId === "0") {
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
        } else {
            const clientData = props.clients.find(client => client.id === parseInt(selectedId));

            setFormData({
                CompanyCode: clientData.companyCode,
                GstNumber: clientData.gstNumber,
                Name: clientData.name,
                Address: clientData.address,
                City: clientData.city,
                Zip: clientData.zip,
                Phone: clientData.phone,
                Email: clientData.email,
            }); 
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await props.editClient(formData, selectedClient);
        setSelectedClient("");
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
    }

    return (
        <div className="w-full mt-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center ">
                    Edit Client Details
                </h2>
                    <div className="text-center border-b pb-5">
                        <label>Client</label>
                        <select 
                            name="clients" 
                            id="clients" 
                            onChange={handleClientChange}
                            value={selectedClient}
                            className="border rounded-lg text-blue-400 ml-3"
                        >
                            <option value="0">Select a client</option>
                            {props.clients.length > 0 ? (
                                props.clients.map((client, index) => (
                                    <option key={index} value={client.id}>
                                        {client.name}
                                    </option>
                                )
                            )) : (<option>NO CLIENTS</option>)}
                        </select>
                    </div>
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
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditClient