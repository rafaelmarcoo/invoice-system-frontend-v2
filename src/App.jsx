import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import EditCompanyPage from "./EditCompany/EditCompanyPage";
import ClientsPage from "./Clients/ClientsPage";

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
      </Routes>
      </Router>
    </div>
 )
}

export default App
