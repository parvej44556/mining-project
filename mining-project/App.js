import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminDashboard from "./components/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import "./assets/styles/App.css"; // CSS ফাইল ইমপোর্ট

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
