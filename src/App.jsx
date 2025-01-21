import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditCompanyPage from "./EditCompany/EditCompanyPage";

function App() {
 return (
    <div className="mt-20">
      <Router>

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
