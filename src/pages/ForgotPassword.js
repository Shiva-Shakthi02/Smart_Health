import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function ForgotPassword(){

const [data,setData] = useState({
question:"",
answer:"",
newPassword:"",
confirmPassword:""
})

const handleChange=(e)=>{
setData({
...data,
[e.target.name]:e.target.value
})
}

const handleSubmit=(e)=>{
e.preventDefault()

if(data.newPassword !== data.confirmPassword){
alert("Passwords do not match")
return
}

alert("Password Reset Successful (Frontend Only)")
}

return(

<div className="forgot-page">

<div className="forgot-container">

<h2>Reset Password</h2>

<form onSubmit={handleSubmit}>

<select
name="question"
onChange={handleChange}
required
>

<option value="">Select Your Secret Question</option>
<option value="pet">What is your first pet name?</option>
<option value="school">What is your school name?</option>
<option value="city">Which city were you born in?</option>
<option value="food">What is your favorite food?</option>

</select>

<input
type="text"
name="answer"
placeholder="Enter Answer"
onChange={handleChange}
required
/>

<input
type="password"
name="newPassword"
placeholder="New Password"
onChange={handleChange}
required
/>

<input
type="password"
name="confirmPassword"
placeholder="Confirm New Password"
onChange={handleChange}
required
/>

<button type="submit">Reset Password</button>

</form>

<p>
Remember password? <Link to="/login">Login</Link>
</p>

</div>

</div>

)

}

export default ForgotPassword