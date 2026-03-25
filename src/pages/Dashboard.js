import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Line } from "react-chartjs-2";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
} from "chart.js";

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

function Dashboard(){

const navigate = useNavigate();

const logout = () => {
localStorage.removeItem("user");
window.location.href = "/login";
};

/* ---------------- STATES ---------------- */

const [caloriesBurned,setCaloriesBurned] = useState(0);
const [waterTaken,setWaterTaken] = useState(0);
const [steps,setSteps] = useState(0);

const [tempHistory,setTempHistory] = useState([]);
const [sleepHistory,setSleepHistory] = useState([]);
const [bpHistory,setBpHistory] = useState([]);
const [sugarHistory,setSugarHistory] = useState([]);
const [riskHistory,setRiskHistory] = useState([]);

const [riskStatus,setRiskStatus] = useState("Normal");
const [riskMessage,setRiskMessage] = useState(
"Your health looks stable and no major risk has been detected."
);

/* ---------------- FETCH FUNCTIONS ---------------- */

const fetchCalories = async()=>{
try{
const user = JSON.parse(localStorage.getItem("user"));
const res = await fetch(`http://localhost:5000/api/calories/${user._id}`);
const data = await res.json();

if(data.length > 0){
setCaloriesBurned(data[data.length - 1].caloriesBurned);
}
}catch(error){
console.log("Error fetching calories:", error);
}
};

const fetchWater = async()=>{
try{
const user = JSON.parse(localStorage.getItem("user"));
const res = await fetch(`http://localhost:5000/api/water/${user._id}`);
const data = await res.json();

let total = 0;
data.forEach(item=>{
total += Number(item.amount || 0);
});

setWaterTaken(total);
}catch(error){
console.log("Error fetching water:", error);
}
};

const fetchSteps = async()=>{
try{
const user = JSON.parse(localStorage.getItem("user"));
const res = await fetch(`http://localhost:5000/api/steps/${user._id}`);
const data = await res.json();

if(data.length > 0){
setSteps(data[data.length - 1].steps);
}
}catch(error){
console.log("Error fetching steps:", error);
}
};

const fetchGraphs = async()=>{
try{
const user = JSON.parse(localStorage.getItem("user"));

const [
tempRes,
sleepRes,
bpRes,
sugarRes,
heartRes
] = await Promise.all([
fetch(`http://localhost:5000/api/temperature/${user._id}`),
fetch(`http://localhost:5000/api/sleep/${user._id}`),
fetch(`http://localhost:5000/api/bloodpressure/${user._id}`),
fetch(`http://localhost:5000/api/bloodsugar/${user._id}`),
fetch(`http://localhost:5000/api/heartrate/${user._id}`)
]);

const tempData = await tempRes.json();
const sleepData = await sleepRes.json();
const bpData = await bpRes.json();
const sugarData = await sugarRes.json();
const heartData = await heartRes.json();

setTempHistory(tempData);
setSleepHistory(sleepData);
setBpHistory(bpData);
setSugarHistory(sugarData);

generateRisk(tempData, sleepData, heartData);

}catch(error){
console.log("Error fetching graph data:", error);
}
};

/* ---------------- HEALTH RISK ---------------- */

const generateRisk = (tempData, sleepData, heartData)=>{

const dates = [...new Set([
...tempData.map(item=>item.date),
...sleepData.map(item=>item.date),
...heartData.map(item=>item.date)
])].sort();

const risks = dates.map(date=>{
let risk = 0;

const temp = tempData.find(item=>item.date === date);
const sleep = sleepData.find(item=>item.date === date);
const heart = heartData.find(item=>item.date === date);

if(temp && Number(temp.temperature) > 38) risk += 25;
if(sleep && Number(sleep.sleepHours) < 5) risk += 20;
if(heart && Number(heart.heartRate) > 100) risk += 25;

return { date, risk };
});

setRiskHistory(risks);

if(risks.length > 0){
const latestRisk = risks[risks.length - 1].risk;

if(latestRisk > 60){
setRiskStatus("Critical");
setRiskMessage("Immediate medical attention is recommended because multiple health parameters are in a risky range.");
}
else if(latestRisk > 30){
setRiskStatus("Warning");
setRiskMessage("Some health parameters are not in the ideal range. Improve sleep, hydration, and daily habits.");
}
else{
setRiskStatus("Normal");
setRiskMessage("Your current health trend looks stable. Continue maintaining good habits.");
}
}
};

/* ---------------- USE EFFECT ---------------- */

useEffect(()=>{
fetchCalories();
fetchWater();
fetchSteps();
fetchGraphs();
// eslint-disable-next-line
},[]);

/* ---------------- CALCULATIONS ---------------- */

const stepGoal = 10000;
const stepPercentage = Math.min((steps / stepGoal) * 100, 100);

/* ---------------- CHART OPTIONS ---------------- */

const chartOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
display: true
}
},
scales: {
y: {
beginAtZero: true
}
}
};

/* ---------------- GRAPH DATA ---------------- */

const bpData = {
labels: bpHistory.map(item=>item.date),
datasets:[
{
label:"Systolic (mmHg)",
data: bpHistory.map(item=>Number(item.systolic || 0)),
borderColor:"red",
backgroundColor:"rgba(255,0,0,0.2)",
tension:0.4
},
{
label:"Diastolic (mmHg)",
data: bpHistory.map(item=>Number(item.diastolic || 0)),
borderColor:"blue",
backgroundColor:"rgba(0,0,255,0.2)",
tension:0.4
}
]
};

const tempData = {
labels: tempHistory.map(item=>item.date),
datasets:[
{
label:"Temperature (°C)",
data: tempHistory.map(item=>Number(item.temperature || 0)),
borderColor:"orange",
backgroundColor:"rgba(255,165,0,0.2)",
tension:0.4
}
]
};

const sleepData = {
labels: sleepHistory.map(item=>item.date),
datasets:[
{
label:"Sleep Hours",
data: sleepHistory.map(item=>Number(item.sleepHours || 0)),
borderColor:"purple",
backgroundColor:"rgba(128,0,128,0.2)",
tension:0.4
}
]
};

const riskData = {
labels: riskHistory.map(item=>item.date),
datasets:[
{
label:"Health Risk %",
data: riskHistory.map(item=>Number(item.risk || 0)),
borderColor:"red",
backgroundColor:"rgba(255,0,0,0.2)",
tension:0.4
}
]
};

const sugarData = {
labels: sugarHistory.map(item=>item.date),
datasets:[
{
label:"Blood Sugar (mg/dL)",
data: sugarHistory.map(item=>Number(item.bloodSugar || 0)),
borderColor:"green",
backgroundColor:"rgba(0,255,0,0.2)",
tension:0.4
}
]
};

/* ---------------- UI ---------------- */

return(

<div className="dashboard-layout">

{/* Sidebar */}

<div className="sidebar">

<h1 className="logo">HealthApp Dashboard</h1>

<ul>
<li><h2><Link to="/heart">Heart Rate Monitoring</Link></h2></li>
<li><h2><Link to="/temperature">Body Temperature</Link></h2></li>
<li><h2><Link to="/sleep">Sleep Monitoring</Link></h2></li>
<li><h2><Link to="/mood">Mood Detection</Link></h2></li>
<li><h2><Link to="/alerts">Health Alerts</Link></h2></li>
<li><h2><Link to="/adddata">Add Data</Link></h2></li>
<li><h2><Link to="/reports">Reports</Link></h2></li>
<li><h2><Link to="/profile">Profile</Link></h2></li>
<li><h2><Link to="/changepassword">Change Password</Link></h2></li>
<li><h2><Link to="/steps">Steps</Link></h2></li>
<li><h2><Link to="/calories">Calories</Link></h2></li>
<li><h2><Link to="/water">Water Intake</Link></h2></li>
</ul>

<div className="logout">
<button onClick={logout}>Logout</button>
</div>

</div>

{/* Main Dashboard */}

<div className="dashboard-main">

<h1>Welcome User 👋</h1>

{/* Feature Cards */}

<div className="dashboard-container">

<div className="card" onClick={()=>navigate("/heart")}>
<h3>❤️ Heart Rate Monitoring</h3>
</div>

<div className="card" onClick={()=>navigate("/temperature")}>
<h3>🌡 Body Temperature</h3>
</div>

<div className="card" onClick={()=>navigate("/sleep")}>
<h3>😴 Sleep Monitoring</h3>
</div>

<div className="card" onClick={()=>navigate("/mood")}>
<h3>😊 Mood Detection</h3>
</div>

<div className="card" onClick={()=>navigate("/alerts")}>
<h3>🚨 Health Alerts</h3>
</div>

<div className="card" onClick={()=>navigate("/reports")}>
<h3>📊 Reports</h3>
</div>

<div className="card" onClick={()=>navigate("/adddata")}>
<h3>➕ Add Health Data</h3>
</div>

<div className="card" onClick={()=>navigate("/profile")}>
<h3>👤 Profile</h3>
</div>

<div className="card" onClick={()=>navigate("/water")}>
<h3>💧 Water Intake</h3>
<p>{waterTaken.toFixed(2)} L Today</p>
</div>


</div>

<h2 className="activity-title">Daily Activity Summary</h2>

{/* Activity Section */}

<div className="activity-container">

<div className="steps-container" onClick={()=>navigate("/steps")} style={{cursor:"pointer"}}>

<h3>👣 Daily Steps</h3>

<div className="steps-circle">

<CircularProgressbar
value={stepPercentage}
text={`${steps}`}
/>

<p>Goal : {stepGoal}</p>

</div>

</div>

<div className="card calories-card" onClick={()=>navigate("/calories")}>

<h3>🔥 Calories Burned</h3>

<p>{caloriesBurned} kcal today</p>

<p>Click to see detailed activity report</p>

</div>

</div>

{/* Graph Section */}

<div className="dashboard-graphs">

<div className="graph-card">
<h2>🩸 Blood Pressure Monitoring</h2>
<div className="chart-box">
<Line data={bpData} options={chartOptions}/>
</div>
</div>

<div className="graph-card">
<h2>🌡 Body Temperature Trend</h2>
<div className="chart-box">
<Line data={tempData} options={chartOptions}/>
</div>
</div>

<div className="graph-card">
<h2>😴 Sleep Monitoring Trend</h2>
<div className="chart-box">
<Line data={sleepData} options={chartOptions}/>
</div>
</div>

<div className="graph-card">
<h2>⚠ Health Risk Trend</h2>
<div className="chart-box">
<Line data={riskData} options={chartOptions}/>
</div>
</div>

<div className="graph-card">
<h2>🩸 Blood Sugar Level</h2>
<div className="chart-box">
<Line data={sugarData} options={chartOptions}/>
</div>
</div>

</div>

{/* Health Warning */}

<div className="health-warning">

<h2>Health Risk Analysis</h2>

<p>
Current Health Status: <b>{riskStatus}</b>
</p>

<p>
{riskMessage}
</p>

</div>

</div>

</div>

);

}

export default Dashboard;