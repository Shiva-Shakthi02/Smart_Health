import React, { useEffect, useState } from "react";
import "../App.css";


function BodyTemperature(){

const [currentTemp,setCurrentTemp] = useState(0);

useEffect(()=>{
fetchTemperature();
},[]);

const fetchTemperature = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

const res = await fetch(`http://localhost:5000/api/temperature/${user._id}`);

const data = await res.json();

if(data.length>0){
setCurrentTemp(data[data.length-1].temperature);
}

}catch(error){
console.log(error);
}

};

let status = "Normal";

if(currentTemp > 37.5){
status = "Fever";
}
else if(currentTemp < 35 && currentTemp !== 0){
status = "Low";
}

return(

<div className="health-page">

<h1>🌡 Body Temperature Monitoring</h1>

<div className="top-cards">

<div className="health-card small-card">
<h2>🌡 Current Temperature</h2>
<p className="big-number">{currentTemp} °C</p>
<p>Status: {status}</p>

</div>

<div className="health-card small-card">
<h2>🧠 Health Insight</h2>
<p>Normal body temperature is between 36.5°C – 37.5°C.</p>
<p>Drink fluids 💧 and rest well 😴.</p>
</div>

<div className="health-card small-card">
<h2>⚠ Temperature Status</h2>
<p>
{status === "Normal"
? "Everything looks good 👍"
: "Monitor health carefully ⚠"}
</p>
</div>

</div>

</div>

);

}

export default BodyTemperature;