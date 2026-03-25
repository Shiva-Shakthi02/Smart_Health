import React, { useEffect, useState } from "react";
import "../App.css";

function HealthAlerts(){

const [healthData,setHealthData] = useState({
heartRate:0,
temperature:0,
sleep:0,
steps:0,
water:0
});

useEffect(()=>{
fetchHealthData();
},[]);

const fetchHealthData = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));
const userId = user._id;

const [heartRes,tempRes,sleepRes,stepsRes,waterRes] = await Promise.all([
fetch(`http://localhost:5000/api/heartrate/${userId}`),
fetch(`http://localhost:5000/api/temperature/${userId}`),
fetch(`http://localhost:5000/api/sleep/${userId}`),
fetch(`http://localhost:5000/api/steps/${userId}`),
fetch(`http://localhost:5000/api/water/${userId}`)
]);

const heartData = await heartRes.json();
const tempData = await tempRes.json();
const sleepData = await sleepRes.json();
const stepsData = await stepsRes.json();
const waterData = await waterRes.json();

let totalWater = 0;

waterData.forEach(item=>{
totalWater += item.amount;
});

setHealthData({
heartRate: heartData.length ? heartData[heartData.length-1].heartRate : 0,
temperature: tempData.length ? tempData[tempData.length-1].temperature : 0,
sleep: sleepData.length ? sleepData[sleepData.length-1].sleepHours : 0,
steps: stepsData.length ? stepsData[stepsData.length-1].steps : 0,
water: totalWater
});

}catch(error){

console.log("Error fetching health data",error);

}

};

/* Risk Calculation */

let risk=0;

if(healthData.heartRate>100) risk+=25;
if(healthData.temperature>38) risk+=25;
if(healthData.sleep<5) risk+=20;
if(healthData.steps<3000) risk+=15;
if(healthData.water<2) risk+=15;

let status="Normal";

if(risk>60){
status="Critical";
}else if(risk>30){
status="Warning";
}

return(

<div className="alerts-page">

<h1>🚨 Health Alerts</h1>

<div className="alerts-grid">

{/* Critical Status */}

<div className="alert-card">

<h2>⚠ Critical Status</h2>

<p>Status: <b>{status}</b></p>

<p>Risk Percentage: <b>{risk}%</b></p>

</div>


{/* Detected Alerts */}

<div className="alert-card">

<h2>🚨 Detected Alerts</h2>

<ul>

{healthData.heartRate>100 && (
<li>⚠ High Heart Rate Detected</li>
)}

{healthData.temperature>38 && (
<li>⚠ High Body Temperature</li>
)}

{healthData.sleep<5 && (
<li>⚠ Low Sleep Duration</li>
)}

{healthData.steps<3000 && (
<li>⚠ Low Physical Activity</li>
)}

{healthData.water<2 && (
<li>⚠ Low Water Intake</li>
)}

</ul>

</div>


{/* Recommended Precautions */}

<div className="alert-card">

<h2>💡 Recommended Precautions</h2>

<ul>

{healthData.heartRate>100 && (
<li>🧘 Rest and avoid heavy activity</li>
)}

{healthData.temperature>38 && (
<li>💊 Take fever medication</li>
)}

{healthData.sleep<5 && (
<li>😴 Try to sleep 7–8 hours</li>
)}

{healthData.water<2 && (
<li>💧 Drink more water</li>
)}

{healthData.steps<3000 && (
<li>🚶 Do light exercise</li>
)}

</ul>

</div>


{/* Emergency Contact */}

<div className="alert-card">

<h2>📞 Emergency Contact</h2>

<p>If status becomes <b>Critical</b>, alert will be sent to:</p>

<ul>

<li>📞 Primary Contact: +91 9876543210</li>
<li>🚑 Emergency Contact: +91 9999999999</li>

</ul>

<button className="alert-btn">
Send Alert Message
</button>

</div>

</div>

</div>

);

}

export default HealthAlerts;