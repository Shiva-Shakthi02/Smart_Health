import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Register() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
username: "",
email: "",
dob: "",
mobile: "",
password: "",
confirmPassword: "",
secretQuestion: "",
secretAnswer: ""
});

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

if (formData.password !== formData.confirmPassword) {
alert("Passwords do not match");
return;
}

try {

const response = await fetch("http://localhost:5000/api/auth/register", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(formData),
});

const data = await response.json();

if (response.ok) {

console.log("Register response:", data);

/* Get user id from response */
const userId =
data.user?._id ||
data.newUser?._id ||
data.savedUser?._id ||
data._id;

/* Create profile automatically */
if (userId) {
await fetch("http://localhost:5000/api/profile/create", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
userId: userId,
username: formData.username,
email: formData.email,
mobile: formData.mobile,
dob: formData.dob
})
});
}

alert("Registration Successful");
navigate("/login");

} else {
alert(data.message || "Registration failed");
}

} catch (error) {
console.error(error);
alert("Server error");
}

};

return (

<div className="register-page">

<div className="register-container">

<h2>Create Account</h2>

<form onSubmit={handleSubmit}>

<input
type="text"
name="username"
placeholder="Username"
value={formData.username}
onChange={handleChange}
required
/>

<input
type="email"
name="email"
placeholder="Email ID"
value={formData.email}
onChange={handleChange}
required
/>

<input
type="date"
name="dob"
value={formData.dob}
onChange={handleChange}
required
/>

<input
type="tel"
name="mobile"
placeholder="Mobile Number"
value={formData.mobile}
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
/>

<input
type="password"
name="confirmPassword"
placeholder="Confirm Password"
value={formData.confirmPassword}
onChange={handleChange}
required
/>

<select
name="secretQuestion"
value={formData.secretQuestion}
onChange={handleChange}
required
>
<option value="">Select Secret Question</option>
<option value="pet">What is your first pet name?</option>
<option value="school">What is your school name?</option>
<option value="city">Which city were you born in?</option>
<option value="food">What is your favorite food?</option>
</select>

<input
type="text"
name="secretAnswer"
placeholder="Answer"
value={formData.secretAnswer}
onChange={handleChange}
required
/>

<button type="submit">Register</button>

</form>

<p>
Already have an account? <Link to="/login">Login</Link>
</p>

</div>

</div>

);

}

export default Register;