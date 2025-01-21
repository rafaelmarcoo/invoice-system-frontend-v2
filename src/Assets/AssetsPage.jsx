import { useState, useEffect } from "react";
import axios from "axios";
import AssetForm from "./components/AssetForm";
import DepreciatingAssetsTable from "./components/DepreciatingAssetsTable";

const AssetsPage = () => {
    const [assets, setAssets] = useState([]);
    const retrieveAssets = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/asset");
            setAssets(response.data);
        } catch(error) {
            alert("Error: " + error.message);
        };
    };

    useEffect(() => {
        retrieveAssets();
    }, []);

    const addAsset = async (formData) => {
        try {
            const response = await axios.post("http://localhost:5041/api/asset", formData)

            if(response.status === 200) {
                alert("Asset added!");
                retrieveAssets();
            } else {
                alert("Failed to add expense");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    };

    return (
        <div>
            <AssetForm addAsset={addAsset} />
            <DepreciatingAssetsTable assets={assets} />
        </div>
    )
    }

export default AssetsPage