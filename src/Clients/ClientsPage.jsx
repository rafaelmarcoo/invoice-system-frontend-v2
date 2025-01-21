import { useState, useEffect } from "react";
import axios from "axios";
import ClientTable from "./components/ClientTable";

const ClientsPage = () => {
    const [active, setActive] = useState("client-form");
    const toggle = (text) => {
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
        </div>
    )
}

export default ClientsPage