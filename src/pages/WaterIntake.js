import React, { useEffect, useState, useCallback } from "react";
import "../App.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function WaterIntake(){

const [waterTaken,setWaterTaken] = useState(0);
const recommended = 3; // liters goal

const getWater = useCallback(async () => {

try{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("User not logged in");
return;
}

const res = await fetch(`http://localhost:5000/api/water/${user._id}`);
const data = await res.json();

let total = 0;

data.forEach(item=>{
total += item.amount;
});

setWaterTaken(total);

}catch(error){

console.log("Error fetching water data",error);

}

},[]);

useEffect(()=>{
getWater();
},[getWater]);

const hydrationPercent = Math.min((waterTaken / recommended) * 100,100);

let hydrationMessage = "Good Hydration Level 👍";

if(hydrationPercent < 50){
hydrationMessage = "⚠ Drink more water";
}
else if(hydrationPercent < 80){
hydrationMessage = "Moderate hydration";
}

return(

<div className="water-page">

<h1>💧 Water Intake</h1>

<div className="water-cards">

<div className="water-card">

<h3>Total Water Intake</h3>

<p className="water-value">
{waterTaken.toFixed(2)} L
</p>

<p>Recommended Goal : {recommended} L</p>

</div>

<div className="water-card">

<h3>Hydration Level</h3>

<div className="water-circle">

<CircularProgressbar
value={hydrationPercent}
text={`${Math.round(hydrationPercent)}%`}
/>

</div>

</div>

<div className="water-card">

<h3>Hydration Alert</h3>

<p>{hydrationMessage}</p>

<ul>
<li>Drink water regularly</li>
<li>Stay hydrated throughout the day</li>
<li>Increase intake after exercise</li>
</ul>

</div>

</div>

</div>

);

}

export default WaterIntake;