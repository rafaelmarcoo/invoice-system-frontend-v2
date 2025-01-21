import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCompanyPage from "./EditCompany/EditCompanyPage";
import Navbar from "./Navbar";

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
      </Routes>
      </Router>
    </div>
 )
}

export default App
