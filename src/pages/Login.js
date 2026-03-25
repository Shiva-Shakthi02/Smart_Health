import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {

const navigate = useNavigate();

const [loginData, setLoginData] = useState({
email: "",
password: ""
});

const handleChange = (e) => {
setLoginData({
...loginData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {

const response = await fetch("http://localhost:5000/api/auth/login", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(loginData)
});

const data = await response.json();

if (response.ok) {

alert("Login Successful");

// store login state
localStorage.setItem("user", JSON.stringify(data.user));

// redirect to dashboard
navigate("/dashboard");

} else {

alert("Invalid Email or Password");

}

} catch (error) {

alert("Server Error");

}

};

return (

<div className="login-page">

<div className="login-container">

<h2>Login</h2>

<form onSubmit={handleSubmit}>

<input
type="email"
name="email"
placeholder="Enter Email"
onChange={handleChange}
required
/>

<input
type="password"
name="password"
placeholder="Enter Password"
onChange={handleChange}
required
/>

<button type="submit">Login</button>

</form>

<div className="login-links">

<Link to="/forgot">Forgot Password?</Link>

<p>
New User? <Link to="/register">Register</Link>
</p>

</div>

</div>

</div>

)

}

export default Login;