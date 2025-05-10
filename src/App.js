import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DesignPage from "./pages/DesignPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/design" element={<DesignPage />} />
            </Routes>
        </Router>
    );
}

export default App;
