import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Reports from "./pages/Reports";
import AddData from "./pages/AddData";
import HealthAlerts from "./pages/HealthAlerts";
import MoodDetection from "./pages/MoodDetection";
import HeartRate from "./pages/HeartRate";
import BodyTemperature from "./pages/BodyTemperature";
import SleepMonitoring from "./pages/SleepMonitoring";
import Calories from "./pages/Calories";
import WaterIntake from "./pages/WaterIntake";
import ProtectedRoute from "./components/ProtectedRoute";
import Steps from "./pages/Steps";

import "./App.css";

function App() {
  return (
    <Router>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/adddata" element={<AddData />} />
        <Route path="/alerts" element={<HealthAlerts />} />
        <Route path="/mood" element={<MoodDetection />} />
        <Route path="/heart" element={<HeartRate />} />
        <Route path="/temperature" element={<BodyTemperature />} />
        <Route path="/sleep" element={<SleepMonitoring />} />
        <Route path="/calories" element={<Calories/>}/>
        <Route path="/water" element={<WaterIntake/>}/>
        <Route path="/steps" element={<Steps/>}/>
      </Routes>

    </Router>
  );
}

export default App;

