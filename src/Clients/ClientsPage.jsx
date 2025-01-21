import { useState, useEffect } from "react";
import axios from "axios";
import ClientTable from "./components/ClientTable";
import AddClient from "./components/AddClient";
import EditClient from "./components/EditClient";

const ClientsPage = () => {
    const [active, setActive] = useState("add");
    const toggleComponent = (text) => {
        setActive(text);
    }

    const [clients, setClients] = useState([]);
    const retrieveClients = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/client");
            setClients(response.data);
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    useEffect(() => {
        retrieveClients();
    }, []);

    const addClient = async (newClient) => {
        try {
            const response = await axios.post("http://localhost:5041/api/client", newClient)

            if(response.status === 200) {
                alert("Client added!");
                retrieveClients();
            } else {
                alert("Failed to add client!");
            }
        } catch(error) {
            alert("Error: " + error.message)
        }
    }

    const editClient = async (clientData, editId) => {
        try {
            const response = await axios.put(`http://localhost:5041/api/client/${editId}`, clientData)

            if(response.status === 200) {
                alert("Client details updated!");
                retrieveClients();
            } else {
                alert("Failed to update client details!");
            }
        } catch(error) {
            alert("Error: " + error.message);
        }
    }

    const deleteClient = async (clientId) => {
        const isConfirmed = window.confirm("Delete client?");

        if(isConfirmed) {
            try {
                const response = await axios.delete(`http://localhost:5041/api/client/${clientId}`);
    
                if(response.status === 200) {
                    alert("Client deleted!");
                    retrieveClients();
                } else {
                    alert("Failed to delete client!");
                }
            } catch(error) {
                alert("Error: " + error.Message);
            }
        }
    }

    return (
        <div>
            <ClientTable
                clients={clients}
                deleteClient={deleteClient}
            />
            <div className="mt-10 flex flex-shrink-0 justify-center space-x-10">
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("add")}
                >
                    Add Client
                </button>
                <button 
                    className="border bg-gray-600 rounded-lg p-1 hover:scale-105 hover:bg-blue-300 duration-200 transition-all"
                    onClick={() => toggleComponent("edit")}
                >
                    Edit Client
                </button>
            </div>
            {active === "add" && <AddClient 
                                    addClient={addClient}
                                />}
            {active === "edit" && <EditClient 
                                    clients={clients}
                                    editClient={editClient}
                                />}
        </div>
    )
}

export default ClientsPage