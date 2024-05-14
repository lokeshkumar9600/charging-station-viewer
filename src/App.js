import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup"; // Import your Signup component
import Login from "./Login"; // Import your Login component
import User from "./User"; // Import your User component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* Sign-in route */}
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
        <Route path="/user" element={<User/>} /> {/* User route */}
      </Routes>
    </Router>
  );
}

export default App;
