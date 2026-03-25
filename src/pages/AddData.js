import React, { useState } from "react";
import "../App.css";

function AddData(){

const [data,setData] = useState({
date:"",
heartRate:"",
temperature:"",
sleep:"",
steps:"",
water:"",
calorie:"",
mood:"",
bloodSugar:"",
systolic:"",
diastolic:""
});

const handleChange=(e)=>{
setData({
...data,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();
console.log("Data being sent:", data);

try{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("User not logged in");
return;
}

// HEART RATE
await fetch("http://localhost:5000/api/heartrate/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
heartRate:Number(data.heartRate),
date:data.date
})
});

// BODY TEMPERATURE
await fetch("http://localhost:5000/api/temperature/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
temperature:Number(data.temperature),
date:data.date
})
});

// SLEEP
await fetch("http://localhost:5000/api/sleep/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
sleepHours:Number(data.sleep),
date:data.date
})
});

// STEPS
await fetch("http://localhost:5000/api/steps/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
steps:Number(data.steps),
date:data.date
})
});

// WATER (in liters)
await fetch("http://localhost:5000/api/water/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
amount:Number(data.water),
date:data.date
})
});

// CALORIES
await fetch("http://localhost:5000/api/calories/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
caloriesBurned:Number(data.calorie),
date:data.date
})
});

// MOOD
await fetch("http://localhost:5000/api/mood/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
mood:data.mood,
date:data.date
})
});

// BLOOD SUGAR
await fetch("http://localhost:5000/api/bloodsugar/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
bloodSugar:Number(data.bloodSugar),
date:data.date
})
});

// BLOOD PRESSURE
await fetch("http://localhost:5000/api/bloodpressure/add",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
userId:user._id,
systolic:Number(data.systolic),
diastolic:Number(data.diastolic),
date:data.date
})
});

alert("Health Data Saved Successfully");

setData({
date:"",
heartRate:"",
temperature:"",
sleep:"",
steps:"",
water:"",
calorie:"",
mood:"",
bloodSugar:"",
systolic:"",
diastolic:""
});

}catch(error){

console.log(error);
alert("Server error");

}

};

return(

<div className="adddata-page">

<h1>Add Health Data</h1>

<form className="adddata-form" onSubmit={handleSubmit}>

<label>Date</label>
<input
type="date"
name="date"
value={data.date}
onChange={handleChange}
required
/>

<label>Heart Rate (bpm)</label>
<input
type="number"
name="heartRate"
placeholder="Enter Heart Rate"
value={data.heartRate}
onChange={handleChange}
required
/>

<label>Body Temperature (°C)</label>
<input
type="number"
step="0.1"
name="temperature"
placeholder="Enter Temperature"
value={data.temperature}
onChange={handleChange}
required
/>

<label>Sleep Hours</label>
<input
type="number"
step="0.1"
name="sleep"
placeholder="Enter Sleep Hours"
value={data.sleep}
onChange={handleChange}
required
/>

<label>Steps Walked</label>
<input
type="number"
name="steps"
placeholder="Enter Steps Count"
value={data.steps}
onChange={handleChange}
required
/>

<label>Water Intake (Liters)</label>
<input
type="number"
step="0.1"
name="water"
placeholder="Enter Water Intake in Liters"
value={data.water}
onChange={handleChange}
required
/>

<label>Calories Burned</label>
<input
type="number"
name="calorie"
placeholder="Enter Calories Burned"
value={data.calorie}
onChange={handleChange}
required
/>

<label>Blood Sugar Level (mg/dL)</label>
<input
type="number"
name="bloodSugar"
placeholder="Enter Blood Sugar Level"
value={data.bloodSugar}
onChange={handleChange}
required
/>

<label>Systolic BP (mmHg)</label>
<input
type="number"
name="systolic"
placeholder="Enter Systolic BP"
value={data.systolic}
onChange={handleChange}
required
/>

<label>Diastolic BP (mmHg)</label>
<input
type="number"
name="diastolic"
placeholder="Enter Diastolic BP"
value={data.diastolic}
onChange={handleChange}
required
/>

<label>Mood</label>
<select
name="mood"
value={data.mood}
onChange={handleChange}
required
>
<option value="">Select Mood</option>
<option value="Happy">Happy</option>
<option value="Neutral">Neutral</option>
<option value="Sad">Sad</option>
<option value="Stressed">Stressed</option>
</select>

<button type="submit">
Save Data
</button>

</form>

</div>

);

}

export default AddData;