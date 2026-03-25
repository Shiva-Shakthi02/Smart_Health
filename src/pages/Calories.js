import React, { useEffect, useState } from "react";
import "../App.css";

function Calories(){

const [caloriesBurned,setCaloriesBurned] = useState(0);
const goalCalories = 500;

useEffect(()=>{
getCalories();
},[]);

const getCalories = async () => {

try{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("User not logged in");
return;
}

const res = await fetch(`http://localhost:5000/api/calories/${user._id}`);
const data = await res.json();

if(data.length > 0){
setCaloriesBurned(data[data.length - 1].caloriesBurned);
}

}catch(error){

console.log("Error fetching calories",error);

}

};

let activityLevel = "Moderate Activity";

if(caloriesBurned < 200){
activityLevel = "Low Activity";
}
else if(caloriesBurned > 400){
activityLevel = "High Activity";
}

return(

<div className="calorie-page">

<h1>🔥 Daily Calories Burned</h1>

<div className="calorie-cards">

<div className="calorie-card">

<h3>Calories Burned</h3>

<p className="calorie-value">{caloriesBurned} kcal</p>

<p>Goal : {goalCalories} kcal</p>

</div>

<div className="calorie-card">

<h3>Activity Level</h3>

<p className="calorie-value">{activityLevel}</p>

<p>Keep moving daily</p>

</div>

<div className="calorie-card">

<h3>Health Insights</h3>

<ul>
<li>Walking 6000+ steps burns calories</li>
<li>Exercise improves metabolism</li>
<li>Maintain daily activity</li>
<li>Stay active for heart health</li>
</ul>

</div>

</div>

</div>

);

}

export default Calories;