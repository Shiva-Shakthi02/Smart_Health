import React, { useState } from "react";
import "../App.css";

function ChangePassword(){

const [password,setPassword] = useState({
currentPassword:"",
newPassword:"",
confirmPassword:""
});

const handlePasswordChange=(e)=>{
setPassword({
...password,
[e.target.name]:e.target.value
});
};

const handlePasswordSave=()=>{
if(password.newPassword !== password.confirmPassword){
alert("Passwords do not match");
return;
}

alert("Password Changed Successfully");
};

return (

<div className="password-section">

<h2>Change Password</h2>

<input
type="password"
name="currentPassword"
placeholder="Current Password"
onChange={handlePasswordChange}
/>

<input
type="password"
name="newPassword"
placeholder="New Password"
onChange={handlePasswordChange}
/>

<input
type="password"
name="confirmPassword"
placeholder="Confirm New Password"
onChange={handlePasswordChange}
/>

<button onClick={handlePasswordSave}>
Update Password
</button>

</div>

);

}
export default ChangePassword;