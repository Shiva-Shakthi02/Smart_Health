import React, { useState, useEffect } from "react";
import "../App.css";

function MoodDetection(){

const [text,setText] = useState("");
const [mood,setMood] = useState("");
const [stress,setStress] = useState(0);

useEffect(()=>{
fetchLastMood();
},[]);

const fetchLastMood = async()=>{

try{

const user = JSON.parse(localStorage.getItem("user"));

const res = await fetch(`http://localhost:5000/api/mood/${user._id}`);

const data = await res.json();

if(data.length>0){
setMood(data[data.length-1].mood);
}

}catch(error){
console.log(error);
}

};

const startListening = () => {

const SpeechRecognition =
window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.lang="en-US";

recognition.start();

recognition.onresult=(event)=>{

const transcript = event.results[0][0].transcript;

setText(transcript);

detectMood(transcript);

};

};

const detectMood = async(sentence)=>{

let moodResult="Neutral";
let stressLevel=20;

sentence = sentence.toLowerCase();

if(sentence.includes("happy") || sentence.includes("good") || sentence.includes("great")){
moodResult="Happy";
stressLevel=10;
}

else if(sentence.includes("sad") || sentence.includes("bad")){
moodResult="Sad";
stressLevel=60;
}

else if(sentence.includes("tired") || sentence.includes("stress") || sentence.includes("pressure")){
moodResult="Stressed";
stressLevel=80;
}

setMood(moodResult);
setStress(stressLevel);

try{

const user = JSON.parse(localStorage.getItem("user"));

await fetch("http://localhost:5000/api/mood/add",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

userId:user._id,
mood:moodResult,
date:new Date().toISOString().split("T")[0]

})

});

}catch(error){

console.log(error);

}

};

return(

<div className="mood-page">

<h1>Mood Detection</h1>

<div className="mood-grid">

{/* Question */}

<div className="question-box">

<h2>How are you feeling today?</h2>

<p>Please answer using your voice.</p>

<button onClick={startListening} className="voice-btn">

🎤 Start Speaking

</button>

</div>


{/* Voice Text */}

<div className="voice-text">

<h3>Your Response:</h3>

<p>{text}</p>

</div>


{/* Mood Result */}

<div className="mood-result">

<h2>Mood Result</h2>

<p>

Detected Mood: <b>{mood}</b>

</p>

<p>

Stress Level: <b>{stress}%</b>

</p>

</div>


{/* Recommendation */}

<div className="recommendation-box">

<h2>Recommendation</h2>

{mood==="Happy" && (
<p>😊 Keep maintaining your positive mood and stay active.</p>
)}

{mood==="Sad" && (
<p>🌿 Try relaxation, music, or talking to friends.</p>
)}

{mood==="Stressed" && (
<p>🧘 Practice meditation, deep breathing, and take rest.</p>
)}

{mood==="Neutral" && (
<p>🙂 Maintain a balanced lifestyle and stay hydrated.</p>
)}

</div>

</div>

</div>

);

}

export default MoodDetection;