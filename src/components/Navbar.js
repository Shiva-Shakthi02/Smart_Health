import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Navbar() {

const navigate = useNavigate();

// Demo Risk Value (later from backend)
const risk = 70;

useEffect(() => {

if(risk > 60){
alert("🚨 Critical Health Risk Detected! Please check Health Alerts.");
}
else if(risk > 30){
alert("⚠ Health Risk Warning! Please monitor your health.");
}

}, [risk]);

return (

<nav className="navbar">

{/* Logo */}
<div className="logo" onClick={() => navigate("/dashboard")}>
🩺 HealthAI
</div>

{/* Navigation Links */}
<div className="nav-links">

<Link to="/">Home</Link>
<Link to="/login">Login</Link>
<Link to="/register">Register</Link>
<Link to="/dashboard">Dashboard</Link>

</div>

{/* Notification Bell */}
{risk > 30 && (
<div className="nav-bell">
🔔
</div>
)}

</nav>

);

}

export default Navbar;

