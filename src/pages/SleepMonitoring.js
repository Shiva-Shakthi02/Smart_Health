import React, { useEffect, useState } from "react";
import "../App.css";

function Sleep(){

const [sleepHours,setSleepHours] = useState(0);

useEffect(()=>{
fetchSleep();
},[]);

const fetchSleep = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("User not logged in");
return;
}

const res = await fetch(`http://localhost:5000/api/sleep/${user._id}`);

const data = await res.json();
console.log("Sleep API data:",data);

if(data.length>0){
const latestSleep = Number(data[data.length - 1].sleepHours || 0);
setSleepHours(latestSleep);
}else{
    setSleepHours(0);
}

}catch(error){
console.log("Error fetching sleep data",error);
setSleepHours(0);
}

};

let quality = "Good";

if(sleepHours < 6 && sleepHours !== 0){
quality = "Poor";
}
else if(sleepHours >= 8){
quality = "Excellent";
}

return(

<div className="health-page">

<h1>😴 Sleep Monitoring</h1>

<div className="top-cards">

<div className="health-card small-card">
<h2>🛌 Sleep Hours</h2>
<p className="big-number">{sleepHours} hrs</p>
<p>Last Night Sleep</p>
</div>

<div className="health-card small-card">
<h2>🌙 Sleep Quality</h2>
<p className="big-number">{quality}</p>
<p>Based on sleep duration</p>
</div>

<div className="health-card small-card">
<h2>💡 Sleep Recommendation</h2>
<p>Adults should sleep 7–9 hours daily.</p>
<p>Maintain consistent sleep schedule 😴</p>
</div>

</div>

</div>

);

}

export default Sleep;