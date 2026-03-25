import React, { useEffect, useState } from "react";
import "../App.css";

function Steps(){

const [steps,setSteps] = useState(0);

useEffect(()=>{
fetchSteps();
},[]);

const fetchSteps = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

const res = await fetch(`http://localhost:5000/api/steps/${user._id}`);
const data = await res.json();

if(data.length > 0){
setSteps(data[data.length - 1].steps);
}

}catch(error){
console.log(error);
}

};

const goal = 10000;
const percentage = Math.min((steps / goal) * 100, 100);

let status = "Low Activity";

if(steps >= 10000){
status = "Excellent";
}
else if(steps >= 6000){
status = "Good";
}
else if(steps >= 3000){
status = "Average";
}

return(

<div className="health-page">

<h1>👣 Steps Tracking</h1>

<div className="top-cards">

<div className="health-card small-card">
<h2>👣 Steps Walked</h2>
<p className="big-number">{steps}</p>
<p>Today's Activity</p>
</div>

<div className="health-card small-card">
<h2>🎯 Goal Progress</h2>
<p className="big-number">{percentage.toFixed(0)}%</p>
<p>Goal: {goal} steps</p>
</div>

<div className="health-card small-card">
<h2>💡 Activity Status</h2>
<p className="big-number">{status}</p>
<p>Keep moving for better health 🚶</p>
</div>

</div>

</div>

);

}

export default Steps;