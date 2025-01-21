import { useState } from "react"

const AssetForm = (props) => {
    const [formData, setFormData] = useState({
        Name: "",
        Description: "",
        DatePurchased: "",
        DepreciationType: "straight-line",
        DepreciationRate: "",
        OriginalValue: "",
        UsefulLife: "",
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

        const floatOV = parseFloat(formData.OriginalValue).toFixed(2);
        const floatDR = parseFloat(formData.DepreciationRate).toFixed(2);
        setFormData({
            ...formData,
            OriginalValue: parseFloat(floatOV),
            DepreciationRate: parseFloat(floatDR),
        });

        await props.addAsset(formData);
        setFormData({
            Name: "",
            Description: "",
            DatePurchased: "",
            DepreciationType: "",
            DepreciationRate: "",
            OriginalValue: "",
            UsefulLife: "",
        });
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="space-y-6 border border-gray-800 rounded-lg p-5">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                        Add a New Asset
                    </h2>
                    <form
                        className="flex flex-col space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <label>Asset Name</label>
                        <input 
                            type="text" 
                            name="Name"
                            value={formData.Name}
                            onChange={handleChange}
                            placeholder="Asset Name..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>Description</label>
                        <input 
                            type="text" 
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            placeholder="Description.." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>Original Value</label>
                        <input 
                            type="number" 
                            name="OriginalValue"
                            value={formData.OriginalValue}
                            onChange={handleChange}
                            placeholder="Original value of the asset..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <label>Purchase Date</label>
                        <input 
                            type="date" 
                            name="DatePurchased"
                            value={formData.DatePurchased}
                            onChange={handleChange}
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <div>
                            <label>Depreciation Type</label>
                            <select
                                name="DepreciationType"
                                onChange={handleChange}
                                value={formData.DepreciationType}
                                className="border rounded-lg text-blue-400 ml-3 p-1"
                            >
                                <option value="straight-line">Straight-Line Method</option>
                                <option value="diminishing">Diminishing Value</option>
                            </select>
                        </div>
                        <label>Depreciation Rate</label>
                        <input 
                            type="number"
                            name="DepreciationRate"
                            value={formData.DepreciationRate}
                            onChange={handleChange}
                            placeholder="Rate of depreciation ..."
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required
                        />
                        <label>Estimated Useful Life (in years)</label>
                        <input 
                            type="number" 
                            name="UsefulLife"
                            value={formData.UsefulLife}
                            onChange={handleChange}
                            placeholder="Useful life of the asset in years..." 
                            className="p-1 border border-neutral-500 rounded-lg text-blue-400 focus:border-4 focus:outline-none focus:outline-offset-4 transition-all"
                            required 
                        />
                        <button 
                            type="submit"
                            className="p-3 mx-auto rounded-lg bg-gradient-to-r from-blue-200 to-blue-500 text-gray-100 hover:scale-105 transition-transform"
                        >
                            Add Asset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AssetForm