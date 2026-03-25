import React, { useEffect, useState } from "react";
import "../App.css";
import { Line } from "react-chartjs-2";
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

function HeartRate(){

const [heartRates,setHeartRates] = useState([]);
const [currentHeartRate,setCurrentHeartRate] = useState(0);

useEffect(()=>{
fetchHeartRates();
},[]);

const fetchHeartRates = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

const res = await fetch(`http://localhost:5000/api/heartrate/${user._id}`);

const data = await res.json();

setHeartRates(data);

if(data.length>0){
setCurrentHeartRate(data[data.length-1].heartRate);
}

}catch(error){

console.log(error);

}

};

let status="Normal";

if(currentHeartRate>100){
status="High";
}
else if(currentHeartRate<60 && currentHeartRate!==0){
status="Low";
}

/* Chart Data */

const chartData = {

labels: heartRates.map(item=>item.date),

datasets:[
{
label:"Heart Rate (BPM)",
data: heartRates.map(item=>item.heartRate),
borderColor:"red",
backgroundColor:"rgba(255,0,0,0.2)",
tension:0.4,
fill:true
}
]

};

return(

<div className="health-page">

<h1>❤️ Heart Rate Monitoring</h1>

<div className="top-cards">

{/* Current Heart Rate */}

<div className="health-card small-card">

<h2>❤️ Current Heart Rate</h2>

<p className="big-number">{currentHeartRate} BPM</p>

<p>Status: {status}</p>

</div>


{/* Health Insights */}

<div className="health-card small-card">

<h2>🧠 Health Insights</h2>

<p>
Normal range: 60 – 100 BPM
</p>

<p>
Stay active 🏃‍♂️ and reduce stress 😌
</p>

</div>


{/* Extra Feature */}

<div className="health-card small-card">

<h2>🩸 Blood Pressure</h2>

<p className="big-number">120 / 80</p>

<p>Status: Normal</p>

</div>

</div>


{/* Heart Rate Graph */}

<div className="health-card graph-card">

<h2>📈 Heart Rate History</h2>

<Line data={chartData} height={80}/>

</div>

</div>

);

}

export default HeartRate;