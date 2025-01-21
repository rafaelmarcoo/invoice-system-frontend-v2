import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import EditCompanyPage from "./EditCompany/EditCompanyPage";
import ClientsPage from "./Clients/ClientsPage";
import InvoicesPage from "./Invoices/InvoicesPage";
import GSTPage from "./GST/GSTPage";

function App() {
 return (
    <div className="pt-[113px] overflow-hidden">
      <Router>
      <Navbar />
      <Routes>
        <Route 
          path="/"
          element={<EditCompanyPage />}
        />
        <Route 
          path="/client"
          element={<ClientsPage />}
        />
        <Route 
          path="/invoice"
          element={<InvoicesPage />}
        />
        <Route 
          path="/gst"
          element={<GSTPage />}
        />
      </Routes>
      </Router>
    </div>
 )
}

export default App
