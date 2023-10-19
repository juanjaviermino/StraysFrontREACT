import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import { About } from "./About";
import { Users } from "./Users";

function MainPage () {
    return (
        <Router>
            <Navbar/>
            <div className='container-fluid'>
                <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Users />} />
                </Routes>
            </div>
        </Router>
    );
}

export default MainPage;