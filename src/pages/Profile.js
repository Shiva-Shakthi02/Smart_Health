import React, { useEffect, useState } from "react";
import "../App.css";

function Profile(){

const [editMode,setEditMode] = useState(false);

const defaultProfilePic =
"https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

const [profilePic,setProfilePic] = useState(defaultProfilePic);

const [user,setUser] = useState({
username:"",
email:"",
mobile:"",
dob:"",
gender:"",
height:"",
weight:"",
bloodGroup:"",
emergencyContact:"",
medicalCondition:"",
profilePic:""
});

useEffect(()=>{
fetchProfile();
},[]);

const fetchProfile = async()=>{

try{

const loggedInUser = JSON.parse(localStorage.getItem("user"));
console.log("Logged in user from localStorage:", loggedInUser);

if(!loggedInUser || !loggedInUser._id){
alert("User not logged in properly");
return;
}

const res = await fetch(`http://localhost:5000/api/profile/${loggedInUser._id}`);
const data = await res.json();

console.log("Fetched profile data:", data);

if(res.ok && data){
setUser({
username:data.username || "",
email:data.email || "",
mobile:data.mobile || "",
dob:data.dob || "",
gender:data.gender || "",
height:data.height || "",
weight:data.weight || "",
bloodGroup:data.bloodGroup || "",
emergencyContact:data.emergencyContact || "",
medicalCondition:data.medicalCondition || "",
profilePic:data.profilePic || defaultProfilePic
});

setProfilePic(data.profilePic || defaultProfilePic);
}

}catch(error){
console.log("Error fetching profile:",error);
}

};

const handleChange=(e)=>{
setUser({
...user,
[e.target.name]:e.target.value
});
};

const handleSave = async()=>{

try{

const loggedInUser = JSON.parse(localStorage.getItem("user"));

if(!loggedInUser || !loggedInUser._id){
alert("User not logged in properly");
return;
}

const updatedUser = {
...user,
profilePic:profilePic
};

const res = await fetch(`http://localhost:5000/api/profile/${loggedInUser._id}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(updatedUser)
});

const result = await res.json();
console.log("Updated profile response:", result);

if(res.ok){
setEditMode(false);
alert("Profile Updated Successfully");
fetchProfile();
}else{
alert(result.message || "Error updating profile");
}

}catch(error){
console.log("Error updating profile:",error);
alert("Error updating profile");
}

};

const handleImageUpload=(e)=>{
const file = e.target.files[0];
if(file){
setProfilePic(URL.createObjectURL(file));
}
};

return(

<div className="profile-page">

<h1>User Profile</h1>

<div className="profile-container">

<div className="profile-picture">

<img src={profilePic} alt="profile"/>

{editMode && (
<input
type="file"
onChange={handleImageUpload}
/>
)}

</div>

<div className="profile-form">

<input
type="text"
name="username"
value={user.username}
disabled={!editMode}
onChange={handleChange}
/>

<input
type="email"
name="email"
value={user.email}
disabled={!editMode}
onChange={handleChange}
/>

<input
type="text"
name="mobile"
value={user.mobile}
disabled={!editMode}
onChange={handleChange}
/>

<input
type="date"
name="dob"
value={user.dob}
disabled={!editMode}
onChange={handleChange}
/>

<select
name="gender"
value={user.gender}
disabled={!editMode}
onChange={handleChange}
>
<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>

<input
type="text"
name="height"
value={user.height}
placeholder="Height (cm)"
disabled={!editMode}
onChange={handleChange}
/>

<input
type="text"
name="weight"
value={user.weight}
placeholder="Weight (kg)"
disabled={!editMode}
onChange={handleChange}
/>

<input
type="text"
name="bloodGroup"
value={user.bloodGroup}
placeholder="Blood Group"
disabled={!editMode}
onChange={handleChange}
/>

<input
type="text"
name="emergencyContact"
value={user.emergencyContact}
placeholder="Emergency Contact"
disabled={!editMode}
onChange={handleChange}
/>

<textarea
name="medicalCondition"
value={user.medicalCondition}
placeholder="Medical Conditions"
disabled={!editMode}
onChange={handleChange}
/>

{editMode ? (
<button onClick={handleSave}>Save Changes</button>
) : (
<button onClick={()=>setEditMode(true)}>Edit Profile</button>
)}

</div>

</div>

</div>

);

}

export default Profile;