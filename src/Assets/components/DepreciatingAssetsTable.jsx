import axios from "axios";
import { useState, useEffect } from "react";

const DepreciatingAssetsTable = (props) => {
    const [depreciation, setDepreciation] = useState([]);

    const retrieveDepreciations = async () => {
        try {
            const results = await Promise.all(
                props.assets.map(async (asset) => {
                    const response = await axios.get(`http://localhost:5041/api/asset/${asset.id}`);
                    return { 
                        id: asset.id, 
                        name: asset.name, 
                        date: asset.datePurchased, 
                        method: asset.depreciationType, 
                        data: response.data };
                })
            );
            setDepreciation(results);
        } catch(error) {
            alert("Error: " + error.message);
        }
    };

    useEffect(() => {
        if(props.assets.length > 0) {
            retrieveDepreciations();
        };
    }, [props.assets]);

    return (
        <div className="w-full mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-300 font-medium text-center">
                    Depreciating Assets
                </h2>
                {depreciation.length > 0 ? (
                    depreciation.map((asset, index) => (
                        <div key={index} className="mt-10 overflow-x-auto">
                            <table className="table-auto border-collapse border border-gray-300 mx-auto 2-full lg:w-2/3 shadow-md">
                                <thead className="bg-blue-400 text-black">
                                    <tr className="font-bold text-center text-xl bg-violet-300">
                                        <td colSpan="5">{asset.name} | {asset.date} | {asset.method}</td>
                                    </tr>
                                    <tr>
                                        <th className="p-2 border border-gray-200">Useful Life (in years)</th>
                                        <th className="p-2 border border-gray-200">Original Cost</th>
                                        <th className="p-2 border border-gray-200">Depreciation Rate</th>
                                        <th className="p-2 border border-gray-200">Depreciation Claimed</th>
                                        <th className="p-2 border border-gray-200">Adjusted Tax Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {asset.data.map((data, index) => (
                                        <tr 
                                            key={index}
                                            className={`${
                                                index % 2 === 0
                                                    ? "bg-gray-600 text-white"
                                                    : "bg-gray-300 text-black"
                                            }`}
                                        >
                                            <td className="p-2 border border-gray-200 text-center">Year {data.year}</td>
                                            <td className="p-2 border border-gray-200 text-center">${parseFloat(data.originalValue).toFixed(2)}</td>
                                            <td className="p-2 border border-gray-200 text-center">{data.depreciationRate}</td>
                                            <td className="p-2 border border-gray-200 text-center">${parseFloat(data.depreciationClaimed).toFixed(2)}</td>
                                            <td className="p-2 border border-gray-200 text-center">${parseFloat(data.adjustedTaxValue).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                ) : (
                    <div>
                        <h2 className="mt-10 text-center">
                            No Assets
                        </h2>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DepreciatingAssetsTable